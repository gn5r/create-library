#!/usr/bin/env node

import { resolve, join } from "node:path";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

import minimist from "minimist";
import {
  initPrompts,
  emptyDir,
  renderTemplate,
  installDependencies,
  initialGit,
} from "./utils";

import type { Context } from "./utils/prompts";

import { bold, green, red } from "kolorist";

async function run() {
  const argv = minimist(process.argv.slice(2));
  const defaultProjectName = argv._[0] ? argv._[0] : "lib";

  const context: Context = {
    cwd: process.cwd(),
    targetDir: argv._[0],
    projectName: defaultProjectName,
  };

  const {
    cwd,
    targetDir,
    projectName,
    packageName = projectName ?? defaultProjectName,
    isOverwrite,
    author,
    version,
    runGitInit,
    usePackageManager,
  } = await initPrompts(context);

  const root = join(cwd, targetDir);

  if (existsSync(root) && isOverwrite) {
    emptyDir(root);
  } else if (!existsSync(root)) {
    mkdirSync(root);
  }

  writeFileSync(
    resolve(root, "package.json"),
    JSON.stringify(
      {
        name: packageName,
        version: version,
        author: author,
      },
      null,
      2
    )
  );

  const templatePath = resolve(__dirname, "../template");
  renderTemplate(resolve(templatePath, "base"), root);

  if (runGitInit) {
    initialGit(root);
  }

  if (usePackageManager) {
    console.log(`Installing dependencies with ${usePackageManager}...\n`);
    installDependencies(root, usePackageManager);
  }

  console.log(
    `\n${bold(green(`${projectName} has been generated at ${root}\n`))}`
  );
}

run()
  .then(() => {
    console.log("GitHub: https://github.com/gn5r/create-library");
  })
  .catch((err) => {
    console.error(`\n${red("✖")} ${err}\n`);
    process.exit(1);
  });
