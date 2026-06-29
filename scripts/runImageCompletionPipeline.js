import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { auditAllPartImages, writeAllPartImageCoverageArtifacts } from "./auditAllPartImages.js";
import { buildImageCompletionQueue, writeImageCompletionQueueArtifacts } from "./generateImageCompletionQueue.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");

function run(command, args = []) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: "inherit",
    shell: false,
  });

  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(" ")}`);
  }
}

function main() {
  const before = auditAllPartImages();

  console.log("=== Image completion pipeline ===");
  console.log(`Before: ${before.found}/${before.total} (${before.presetPartFound}/${before.presetPartTotal} preset)`);
  console.log("");

  writeImageCompletionQueueArtifacts();

  run("node", ["scripts/fetchCompletionQueue.js"]);

  run("npm", ["run", "images:report"]);
  run("npm", ["run", "images:report-easy-categories"]);
  run("npm", ["run", "images:report-five-inch"]);
  run("npm", ["run", "images:report-motors"]);
  run("npm", ["run", "images:report-receiver-vtx"]);
  run("npm", ["run", "images:report-frames"]);
  run("npm", ["run", "images:report-electronics"]);

  const afterAudit = auditAllPartImages();
  writeAllPartImageCoverageArtifacts(afterAudit);
  writeImageCompletionQueueArtifacts();

  run("npm", ["run", "build"]);

  console.log("");
  console.log(`After: ${afterAudit.found}/${afterAudit.total} (${afterAudit.presetPartFound}/${afterAudit.presetPartTotal} preset)`);
  console.log(`Net change: +${afterAudit.found - before.found}`);
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
