import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildImageCompletionQueue } from "./generateImageCompletionQueue.js";
import {
  fetchImageBuffer,
  prepareJpegBuffer,
} from "./imageFetchCore.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const publicRoot = join(projectRoot, "public");

async function downloadPart(entry) {
  const relativePath = entry.imagePath.replace(/^\//, "");
  const absolutePath = join(publicRoot, relativePath);

  if (!entry.preferredImageUrl) {
    return { partId: entry.partId, status: "skipped", detail: "No preferredImageUrl" };
  }

  const { buffer, format } = await fetchImageBuffer(entry.preferredImageUrl);
  const { jpegBuffer } = await prepareJpegBuffer(buffer, format);

  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, jpegBuffer);

  return {
    partId: entry.partId,
    status: "downloaded",
    detail: `${entry.imagePath} <= ${entry.preferredImageUrl}`,
  };
}

async function main() {
  const queueReport = buildImageCompletionQueue();
  const fetchable = queueReport.summary.fetchableNow;

  console.log(`Fetchable now: ${fetchable.length} part(s)`);

  const results = [];

  for (const entry of fetchable) {
    try {
      const result = await downloadPart(entry);
      results.push(result);
      console.log(`  ${result.status}: ${result.partId}`);
    } catch (error) {
      results.push({
        partId: entry.partId,
        status: "failed",
        detail: error.message,
      });
      console.log(`  failed: ${entry.partId} — ${error.message}`);
    }
  }

  const downloaded = results.filter((entry) => entry.status === "downloaded");
  console.log("");
  console.log(`Downloaded: ${downloaded.length}`);
  console.log(`Failed: ${results.length - downloaded.length}`);
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
