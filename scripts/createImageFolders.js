import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const publicPartsRoot = join(projectRoot, "public", "parts");

export const presetImageFolders = [
  "batteries",
  "cameras",
  "escs",
  "flight-controllers",
  "frames",
  "motors",
  "props",
  "receivers",
  "vtx",
];

export function createPresetImageFolders({ partsRoot = publicPartsRoot } = {}) {
  mkdirSync(partsRoot, { recursive: true });

  const createdPaths = presetImageFolders.map((folderName) => {
    const folderPath = join(partsRoot, folderName);
    mkdirSync(folderPath, { recursive: true });
    writeFileSync(join(folderPath, ".gitkeep"), "", { flag: "a" });
    return folderPath;
  });

  return {
    partsRoot,
    createdPaths,
  };
}

function main() {
  const { partsRoot, createdPaths } = createPresetImageFolders();

  console.log("MaidenReady preset image folders ready.");
  console.log(`Root: ${partsRoot}`);
  console.log("");

  createdPaths.forEach((folderPath) => {
    console.log(`  ${folderPath}`);
  });

  console.log("");
  console.log("Next: add JPGs at paths from PRESET_PART_IMAGE_TODO, then run npm run audit:images");
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  main();
}
