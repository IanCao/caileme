import { spawnSync } from "node:child_process";
import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = process.cwd();
const appDir = resolve(rootDir, "app");
const appDistDir = resolve(appDir, "dist");
const rootDistDir = resolve(rootDir, "dist");
const npmCacheDir = resolve(rootDir, ".npm-cache");
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run(
  npmCmd,
  [
    "ci",
    "--progress=false",
    "--cache",
    npmCacheDir,
    "--registry",
    "https://registry.npmjs.org/",
  ],
  appDir
);
run(npmCmd, ["run", "build"], appDir);

if (!existsSync(appDistDir)) {
  console.error("Expected build output was not found:", appDistDir);
  process.exit(1);
}

if (existsSync(rootDistDir)) {
  rmSync(rootDistDir, { recursive: true, force: true });
}

cpSync(appDistDir, rootDistDir, { recursive: true });

console.log("Build completed. Static output copied to dist/.");
