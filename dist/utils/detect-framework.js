"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectNextRouter = detectNextRouter;
exports.detectFramework = detectFramework;
exports.getComponentsDir = getComponentsDir;
exports.getComponentImportPath = getComponentImportPath;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
function detectNextRouter(cwd) {
    if (fs_extra_1.default.existsSync(path_1.default.join(cwd, "app"))) {
        return "app";
    }
    if (fs_extra_1.default.existsSync(path_1.default.join(cwd, "pages"))) {
        return "pages";
    }
    return "unknown";
}
function detectFramework(cwd) {
    const pkgJsonPath = path_1.default.join(cwd, "package.json");
    if (!fs_extra_1.default.existsSync(pkgJsonPath)) {
        return "unknown";
    }
    try {
        const pkgJson = fs_extra_1.default.readJsonSync(pkgJsonPath);
        const deps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
        if (deps.next) {
            return "next.js";
        }
        if (deps.vite) {
            return "vite";
        }
    }
    catch {
    }
    return "unknown";
}
function getComponentsDir(cwd) {
    const framework = detectFramework(cwd);
    if (framework === "next.js") {
        return path_1.default.join(cwd, "src", "components", "sekerbura");
    }
    if (framework === "vite") {
        return path_1.default.join(cwd, "src", "components", "sekerbura");
    }
    return path_1.default.join(cwd, "src", "components", "sekerbura");
}
function getComponentImportPath(componentName) {
    return `@/components/sekerbura/${componentName}`;
}
//# sourceMappingURL=detect-framework.js.map