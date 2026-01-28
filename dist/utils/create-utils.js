"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureUtilsFile = ensureUtilsFile;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const UTILS_TEMPLATE = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
async function ensureUtilsFile(cwd) {
    const utilsPath = path_1.default.join(cwd, "src", "lib", "utils.ts");
    if (fs_extra_1.default.existsSync(utilsPath)) {
        console.log(chalk_1.default.gray("lib/utils.ts already exists"));
        return false;
    }
    try {
        await fs_extra_1.default.ensureDir(path_1.default.dirname(utilsPath));
        await fs_extra_1.default.writeFile(utilsPath, UTILS_TEMPLATE);
        console.log(chalk_1.default.green("✓ Created lib/utils.ts"));
        return true;
    }
    catch (error) {
        console.error(chalk_1.default.red("Failed to create lib/utils.ts:"), error instanceof Error ? error.message : error);
        throw error;
    }
}
//# sourceMappingURL=create-utils.js.map