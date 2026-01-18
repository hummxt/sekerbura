import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

const UTILS_TEMPLATE = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

export async function ensureUtilsFile(cwd: string): Promise<boolean> {
  const utilsPath = path.join(cwd, "src", "lib", "utils.ts");

  if (fs.existsSync(utilsPath)) {
    console.log(chalk.gray("lib/utils.ts already exists"));
    return false;
  }

  try {
    await fs.ensureDir(path.dirname(utilsPath));
    await fs.writeFile(utilsPath, UTILS_TEMPLATE);
    console.log(chalk.green("✓ Created lib/utils.ts"));
    return true;
  } catch (error) {
    console.error(
      chalk.red("Failed to create lib/utils.ts:"),
      error instanceof Error ? error.message : error
    );
    throw error;
  }
}
