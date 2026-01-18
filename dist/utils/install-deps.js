"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPackageManager = detectPackageManager;
exports.getInstallCommand = getInstallCommand;
exports.installDependencies = installDependencies;
exports.isDependencyInstalled = isDependencyInstalled;
const child_process_1 = require("child_process");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
function detectPackageManager(cwd) {
    if (fs_extra_1.default.existsSync(path_1.default.join(cwd, "pnpm-lock.yaml"))) {
        return "pnpm";
    }
    if (fs_extra_1.default.existsSync(path_1.default.join(cwd, "yarn.lock"))) {
        return "yarn";
    }
    return "npm";
}
function getInstallCommand(pm) {
    switch (pm) {
        case "yarn":
            return "yarn add";
        case "pnpm":
            return "pnpm add";
        default:
            return "npm install";
    }
}
async function installDependencies(cwd, deps, dev = false) {
    try {
        const pm = detectPackageManager(cwd);
        const installCmd = getInstallCommand(pm);
        const devFlag = dev ? (pm === "npm" ? "--save-dev" : "-D") : "";
        const command = `${installCmd} ${deps.join(" ")} ${devFlag}`.trim();
        console.log(chalk_1.default.gray(`Installing with ${chalk_1.default.cyan(pm)}: ${chalk_1.default.dim(command)}`));
        (0, child_process_1.execSync)(command, {
            cwd,
            stdio: "inherit",
        });
    }
    catch (error) {
        console.error(chalk_1.default.red("Failed to install dependencies:"), error instanceof Error ? error.message : error);
        throw error;
    }
}
function isDependencyInstalled(cwd, depName) {
    try {
        const pkgJsonPath = path_1.default.join(cwd, "package.json");
        if (!fs_extra_1.default.existsSync(pkgJsonPath)) {
            return false;
        }
        const pkgJson = fs_extra_1.default.readJsonSync(pkgJsonPath);
        return !!(pkgJson.dependencies?.[depName] ||
            pkgJson.devDependencies?.[depName]);
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=install-deps.js.map