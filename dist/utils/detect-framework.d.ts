export type Framework = "next.js" | "vite" | "unknown";
export type NextRouter = "app" | "pages" | "unknown";
export declare function detectNextRouter(cwd: string): NextRouter;
export declare function detectFramework(cwd: string): Framework;
export declare function getComponentsDir(cwd: string): string;
export declare function getComponentImportPath(componentName: string): string;
//# sourceMappingURL=detect-framework.d.ts.map