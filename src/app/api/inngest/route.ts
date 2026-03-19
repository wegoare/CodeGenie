import { serve } from "inngest/next";

import { inngest } from "@/src/inngest/client";
import { processMessage } from "@/src/features/conversations/inngest/process-message";
import { importGithubRepo } from "@/src/features/projects/inngest/import-github-repo";
import { exportToGithub } from "@/src/features/projects/inngest/export-to-github";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processMessage,
    importGithubRepo,
    exportToGithub,
  ],
});