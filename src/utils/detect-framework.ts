import fs from "fs-extra";
import path from "path";

export type Framework = "next.js" | "vite" | "unknown";
export type NextRouter = "app" | "pages" | "unknown";

export function detectNextRouter(cwd: string): NextRouter {
  if (fs.existsSync(path.join(cwd, "app"))) {
    return "app";
  }
  if (fs.existsSync(path.join(cwd, "pages"))) {
    return "pages";
  }
  return "unknown";
}

export function detectFramework(cwd: string): Framework {
  const pkgJsonPath = path.join(cwd, "package.json");

  if (!fs.existsSync(pkgJsonPath)) {
    return "unknown";
  }

  try {
    const pkgJson = fs.readJsonSync(pkgJsonPath);
    const deps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };

    if (deps.next) {
      return "next.js";
    }
    if (deps.vite) {
      return "vite";
    }
  } catch {
  }

  return "unknown";
}

export function getComponentsDir(cwd: string): string {
  const framework = detectFramework(cwd);

  if (framework === "next.js") {
    return path.join(cwd, "src", "components", "sekerbura");
  }

  if (framework === "vite") {
    return path.join(cwd, "src", "components", "sekerbura");
  }

  return path.join(cwd, "src", "components", "sekerbura");
}

export function getComponentImportPath(componentName: string): string {
  return `@/components/sekerbura/${componentName}`;
}
