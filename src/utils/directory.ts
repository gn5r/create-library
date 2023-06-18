import { existsSync, readdirSync, lstatSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

function emptyDir(dir: string) {
  if (!existsSync(dir)) return;

  for (const filename of readdirSync(dir)) {
    if (filename === ".git") continue;
    const path = resolve(dir, filename);

    if (lstatSync(path).isDirectory()) {
      emptyDir(path);
    } else {
      unlinkSync(path);
    }
  }
}

export { emptyDir };
