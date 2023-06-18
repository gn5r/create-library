import { spawnSync } from "child_process";

function installDependencies(
  projectRoot: string,
  packageManage: "npm" | "yarn"
) {
  const cmd = packageManage === "npm" ? "npm install" : "yarn";
  const spawn = spawnSync(cmd, {
    cwd: projectRoot,
    stdio: ["inherit", "inherit", "pipe"],
    shell: true,
  });

  if (spawn.error) {
    throw spawn.error;
  }
}

export { installDependencies };
