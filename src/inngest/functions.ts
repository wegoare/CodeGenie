import { google } from "@ai-sdk/google";
import { inngest } from "./client";
import { generateText } from "ai";
import { firecrawl } from "../lib/firecrawl";

const URL_REGEX = /https?:\/\/[^\s]+/g;

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },

  async ({ event, step }) => {
    console.log("🚀 Function triggered");

    const prompt = event.data?.prompt;

    if (!prompt) {
      console.error("❌ Prompt missing from event:", event);

      return {
        success: false,
        error: "Prompt not provided",
      };
    }

    console.log("📥 Received prompt:", prompt);

    // ✅ STEP 1: Extract URLs
    const urls = (await step.run("extract-urls", async () => {
      console.log("🔎 Extracting URLs from prompt");

      const extracted = prompt.match(URL_REGEX) ?? [];

      console.log("🔗 URLs found:", extracted);

      return extracted;
    })) as string[];

    console.log("✅ URL extraction complete");

    let scrapedContent = "";

    // ✅ STEP 2: Scrape URLs
    if (urls.length > 0) {
      console.log("🌐 URLs detected, starting scraping");

      scrapedContent = await step.run("scrape-urls", async () => {
        console.log("🕷️ Scraping step started");

        const results = await Promise.all(
          urls.map(async (url) => {
            try {
              console.log("➡️ Scraping URL:", url);

              const result = await firecrawl.scrape(url, {
                formats: ["markdown"],
              });

              console.log("✅ Scraping completed for:", url);

              return result.markdown ?? null;
            } catch (err) {
              console.error("❌ Error scraping:", url, err);
              return null;
            }
          })
        );

        const combined = results.filter(Boolean).join("\n\n");

        console.log("📄 Combined scraped content length:", combined.length);

        // 🔥 Limit size to avoid token overflow
        const MAX_CHARS = 8000;
        return combined.slice(0, MAX_CHARS);
      });
    } else {
      console.log("⚠️ No URLs found, skipping scraping");
    }

    console.log(
      "📚 Scraped content preview:",
      scrapedContent?.slice(0, 200)
    );

    // ✅ STEP 3: Build final prompt
    const finalPrompt = scrapedContent
      ? `You are given the following context:\n\n${scrapedContent}\n\nAnswer this question:\n${prompt}`
      : prompt;

    console.log("🧠 Final prompt prepared");

    // ✅ STEP 4: Generate AI response
    const result = await step.run("generate-text", async () => {
      try {
        console.log("🤖 Sending prompt to Gemini");

        const response = await generateText({
          model: google("gemini-2.5-flash"),
          prompt: finalPrompt,
          experimental_telemetry: {
            isEnabled: true,
            recordInputs: true,
            recordOutputs: true,
          },
        });

        console.log("✅ AI response received");

        return response.text;
      } catch (error) {
        console.error("❌ AI generation failed:", error);
        return "Failed to generate response";
      }
    });

    console.log("🎉 Function finished successfully");

    // ✅ IMPORTANT: return result
    return {
      success: true,
      data: result,
    };
  }
);


// ✅ OPTIONAL: demoError (only if you want testing)
export const demoError = inngest.createFunction(
  { id: "demo-error" },
  { event: "demo/error" },
  async () => {
    console.log("💥 demoError triggered");
    throw new Error("This is a demo error");
  }
);