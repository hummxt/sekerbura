import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export type PackageManager = "npm" | "yarn" | "pnpm";

export function detectPackageManager(cwd: string): PackageManager {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) {
    return "yarn";
  }
  return "npm";
}

export function getInstallCommand(pm: PackageManager): string {
  switch (pm) {
    case "yarn":
      return "yarn add";
    case "pnpm":
      return "pnpm add";
    default:
      return "npm install";
  }
}

export async function installDependencies(
  cwd: string,
  deps: string[],
  dev: boolean = false
): Promise<void> {
  try {
    const pm = detectPackageManager(cwd);
    const installCmd = getInstallCommand(pm);
    const devFlag = dev ? (pm === "npm" ? "--save-dev" : "-D") : "";

    const command = `${installCmd} ${deps.join(" ")} ${devFlag}`.trim();

    console.log(
      chalk.gray(`Installing with ${chalk.cyan(pm)}: ${chalk.dim(command)}`)
    );

    execSync(command, {
      cwd,
      stdio: "inherit",
    });
  } catch (error) {
    console.error(
      chalk.red("Failed to install dependencies:"),
      error instanceof Error ? error.message : error
    );
    throw error;
  }
}

export function isDependencyInstalled(
  cwd: string,
  depName: string
): boolean {
  try {
    const pkgJsonPath = path.join(cwd, "package.json");
    if (!fs.existsSync(pkgJsonPath)) {
      return false;
    }

    const pkgJson = fs.readJsonSync(pkgJsonPath);
    return !!(
      pkgJson.dependencies?.[depName] ||
      pkgJson.devDependencies?.[depName]
    );
  } catch {
    return false;
  }
}
