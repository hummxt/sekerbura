#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
const templates_1 = require("./templates");
const install_deps_1 = require("./utils/install-deps");
const detect_framework_1 = require("./utils/detect-framework");
const create_utils_1 = require("./utils/create-utils");
const program = new commander_1.Command();
program
    .name("sekerbura")
    .description("sekerbura - Custom component CLI library")
    .version("1.0.0");
program
    .command("add <component>")
    .alias("a")
    .description("Add a component to your project")
    .action(async (component) => {
    const componentName = templates_1.COMPONENTS_LIST.find((c) => c.toLowerCase() === component.toLowerCase());
    if (!componentName) {
        console.log(chalk_1.default.red(`✗ Component "${component}" not found.\n`));
        console.log(chalk_1.default.gray(`Available components: ${templates_1.COMPONENTS_LIST.join(", ")}`));
        process.exit(1);
    }
    const cwd = process.cwd();
    try {
        console.log(chalk_1.default.cyan(`\n📦 Setting up sekerbura component: ${chalk_1.default.bold(componentName)}\n`));
        await (0, create_utils_1.ensureUtilsFile)(cwd);
        const requiredDeps = [
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
        ];
        const missingDeps = requiredDeps.filter((dep) => !(0, install_deps_1.isDependencyInstalled)(cwd, dep));
        if (missingDeps.length > 0) {
            console.log(chalk_1.default.yellow(`\n⚙️  Installing required dependencies...\n`));
            await (0, install_deps_1.installDependencies)(cwd, missingDeps);
            console.log(chalk_1.default.gray(`✓ All required dependencies already installed`));
        }
        const componentDeps = templates_1.DEPENDENCIES[componentName] || [];
        if (componentDeps.length > 0) {
            const missingComponentDeps = componentDeps.filter((dep) => !(0, install_deps_1.isDependencyInstalled)(cwd, dep));
            if (missingComponentDeps.length > 0) {
                console.log(chalk_1.default.yellow(`\n⚙️  Installing ${componentName} dependencies: ${missingComponentDeps.join(", ")}...\n`));
                await (0, install_deps_1.installDependencies)(cwd, missingComponentDeps);
            }
        }
        const componentDir = (0, detect_framework_1.getComponentsDir)(cwd);
        const componentPath = path_1.default.join(componentDir, `${componentName}.tsx`);
        await fs_extra_1.default.ensureDir(componentDir);
        await fs_extra_1.default.writeFile(componentPath, templates_1.TEMPLATES[componentName]);
        console.log(chalk_1.default.green(`\n✓ Component created at: ${chalk_1.default.bold(componentPath)}\n`));
        const importPath = (0, detect_framework_1.getComponentImportPath)(componentName);
        console.log(chalk_1.default.gray(`Import in your code:\n`));
        console.log(chalk_1.default.cyan(`  import { ${capitalize(componentName)} } from "${importPath}"`));
        console.log();
    }
    catch (error) {
        console.error(chalk_1.default.red("\n✗ Error adding component:"), error instanceof Error ? error.message : error);
        process.exit(1);
    }
});
program
    .command("list")
    .alias("ls")
    .description("List all available components")
    .action(() => {
    console.log(chalk_1.default.cyan("\nAvailable sekerbura Components:\n"));
    templates_1.COMPONENTS_LIST.forEach((comp) => {
        console.log(chalk_1.default.gray(`  • ${chalk_1.default.white(comp)}`));
    });
    console.log();
});
program
    .command("init")
    .description("Initialize sekerbura in your project")
    .action(async () => {
    const cwd = process.cwd();
    try {
        console.log(chalk_1.default.cyan("\n🚀 Initializing sekerbura...\n"));
        await (0, create_utils_1.ensureUtilsFile)(cwd);
        const requiredDeps = [
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
        ];
        const missingDeps = requiredDeps.filter((dep) => !(0, install_deps_1.isDependencyInstalled)(cwd, dep));
        if (missingDeps.length > 0) {
            console.log(chalk_1.default.yellow(`\n⚙️  Installing core dependencies...\n`));
            await (0, install_deps_1.installDependencies)(cwd, missingDeps);
        }
        console.log(chalk_1.default.green(`\n✓ sekerbura initialized! Run ${chalk_1.default.cyan("npx sekerbura add <component>")} to add components.\n`));
    }
    catch (error) {
        console.error(chalk_1.default.red("\n✗ Error initializing sekerbura:"), error instanceof Error ? error.message : error);
        process.exit(1);
    }
});
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
program.parse(process.argv);
//# sourceMappingURL=cli.js.map