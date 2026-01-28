#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { TEMPLATES, COMPONENTS_LIST, DEPENDENCIES, type ComponentName } from "./templates";
import {
  installDependencies,
  isDependencyInstalled,
  detectPackageManager,
} from "./utils/install-deps";
import { getComponentsDir, getComponentImportPath } from "./utils/detect-framework";
import { ensureUtilsFile } from "./utils/create-utils";

const program = new Command();

program
  .name("sekerbura")
  .description("sekerbura - Custom component CLI library")
  .version("1.0.0");

program
  .command("add <component>")
  .alias("a")
  .description("Add a component to your project")
  .action(async (component: string) => {
    const componentName = COMPONENTS_LIST.find(
      (c) => c.toLowerCase() === component.toLowerCase()
    );

    if (!componentName) {
      console.log(
        chalk.red(`✗ Component "${component}" not found.\n`)
      );
      console.log(chalk.gray(`Available components: ${COMPONENTS_LIST.join(", ")}`));
      process.exit(1);
    }

    const cwd = process.cwd();

    try {
      console.log(chalk.cyan(`\n📦 Setting up sekerbura component: ${chalk.bold(componentName)}\n`));
      await ensureUtilsFile(cwd);

      const requiredDeps = [
        "clsx",
        "tailwind-merge",
        "class-variance-authority",
      ];

      const missingDeps = requiredDeps.filter(
        (dep) => !isDependencyInstalled(cwd, dep)
      );

      if (missingDeps.length > 0) {
        console.log(chalk.yellow(`\n⚙️  Installing required dependencies...\n`));
        await installDependencies(cwd, missingDeps);
        console.log(chalk.gray(`✓ All required dependencies already installed`));
      }

      const componentDeps = DEPENDENCIES[componentName] || [];
      if (componentDeps.length > 0) {
        const missingComponentDeps = componentDeps.filter(
          (dep) => !isDependencyInstalled(cwd, dep)
        );

        if (missingComponentDeps.length > 0) {
          console.log(chalk.yellow(`\n⚙️  Installing ${componentName} dependencies: ${missingComponentDeps.join(", ")}...\n`));
          await installDependencies(cwd, missingComponentDeps);
        }
      }

      const componentDir = getComponentsDir(cwd);
      const componentPath = path.join(componentDir, `${componentName}.tsx`);

      await fs.ensureDir(componentDir);
      await fs.writeFile(componentPath, TEMPLATES[componentName]);

      console.log(
        chalk.green(`\n✓ Component created at: ${chalk.bold(componentPath)}\n`)
      );

      const importPath = getComponentImportPath(componentName);
      console.log(chalk.gray(`Import in your code:\n`));
      console.log(chalk.cyan(`  import { ${capitalize(componentName)} } from "${importPath}"`));
      console.log();

    } catch (error) {
      console.error(
        chalk.red("\n✗ Error adding component:"),
        error instanceof Error ? error.message : error
      );
      process.exit(1);
    }
  });

program
  .command("list")
  .alias("ls")
  .description("List all available components")
  .action(() => {
    console.log(chalk.cyan("\nAvailable sekerbura Components:\n"));
    COMPONENTS_LIST.forEach((comp) => {
      console.log(chalk.gray(`  • ${chalk.white(comp)}`));
    });
    console.log();
  });

program
  .command("init")
  .description("Initialize sekerbura in your project")
  .action(async () => {
    const cwd = process.cwd();

    try {
      console.log(chalk.cyan("\n🚀 Initializing sekerbura...\n"));

      await ensureUtilsFile(cwd);

      const requiredDeps = [
        "clsx",
        "tailwind-merge",
        "class-variance-authority",
      ];

      const missingDeps = requiredDeps.filter(
        (dep) => !isDependencyInstalled(cwd, dep)
      );

      if (missingDeps.length > 0) {
        console.log(chalk.yellow(`\n⚙️  Installing core dependencies...\n`));
        await installDependencies(cwd, missingDeps);
      }

      console.log(
        chalk.green(
          `\n✓ sekerbura initialized! Run ${chalk.cyan("npx sekerbura add <component>")} to add components.\n`
        )
      );

    } catch (error) {
      console.error(
        chalk.red("\n✗ Error initializing sekerbura:"),
        error instanceof Error ? error.message : error
      );
      process.exit(1);
    }
  });

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

program.parse(process.argv);