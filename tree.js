const fs = require("fs");
const path = require("path");

const IGNORE = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
]);

function walk(dir, prefix = "") {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => !IGNORE.has(e.name));

  entries.forEach((entry, index) => {
    const last = index === entries.length - 1;
    console.log(prefix + (last ? "└── " : "├── ") + entry.name);

    if (entry.isDirectory()) {
      walk(path.join(dir, entry.name), prefix + (last ? "    " : "│   "));
    }
  });
}

console.log(path.basename(process.cwd()));
walk(process.cwd());
