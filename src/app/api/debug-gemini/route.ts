// src/app/api/debug-gemini/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  // 1. Check if key exists
  if (!apiKey) {
    return NextResponse.json({ error: "GOOGLE_GENERATIVE_AI_API_KEY is not set" }, { status: 500 });
  }

  // 2. Test direct Gemini API call - list available models
  try {
    const modelsRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    const modelsData = await modelsRes.json();

    if (!modelsRes.ok) {
      return NextResponse.json({ 
        error: "Failed to list models", 
        details: modelsData 
      }, { status: 500 });
    }

    // Filter to only gemini-2.5 models
    const gemini25Models = modelsData.models
      ?.filter((m: { name: string }) => m.name.includes("gemini-2.5"))
      ?.map((m: { name: string; displayName: string; supportedGenerationMethods: string[] }) => ({
        name: m.name,
        displayName: m.displayName,
        supportedMethods: m.supportedGenerationMethods,
      }));

    // 3. Test a simple generateContent call with gemini-2.5-flash
    const testRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: "Say hello" }] }],
        }),
      }
    );
    const testData = await testRes.json();

    return NextResponse.json({
      keyPrefix: apiKey.slice(0, 8) + "...",
      gemini25Models,
      directApiTest: {
        status: testRes.status,
        ok: testRes.ok,
        response: testData,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}