import fs from "fs";
import path from "path";

console.log("=== Aggressive next-intl Standalone Fix ===");

const root = process.cwd();

// Copy request.ts to locations where standalone might look
const source = path.join(root, "i18n", "request.ts");
const targets = [
  path.join(root, ".next", "standalone", "i18n", "request.ts"),
  path.join(
    root,
    ".next",
    "standalone",
    ".next",
    "server",
    "i18n",
    "request.ts",
  ),
  path.join(root, ".next", "server", "i18n", "request.ts"),
];

targets.forEach((target) => {
  const dir = path.dirname(target);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, target);
    console.log("Copied to:", target);
  }
});

console.log("=== Fix completed ===");
