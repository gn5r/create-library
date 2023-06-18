import { spawnSync } from "child_process";

function initialGit(projectRoot: string) {
  const cmd = "git init";
  const spawn = spawnSync(cmd, {
    cwd: projectRoot,
    stdio: ["inherit", "inherit", "pipe"],
    shell: true,
  });

  if (spawn.error) throw spawn.error;
}

export { initialGit };
