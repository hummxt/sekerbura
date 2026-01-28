export type PackageManager = "npm" | "yarn" | "pnpm";
export declare function detectPackageManager(cwd: string): PackageManager;
export declare function getInstallCommand(pm: PackageManager): string;
export declare function installDependencies(cwd: string, deps: string[], dev?: boolean): Promise<void>;
export declare function isDependencyInstalled(cwd: string, depName: string): boolean;
//# sourceMappingURL=install-deps.d.ts.map