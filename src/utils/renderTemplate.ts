import fs from "node:fs";
import path from "node:path";
import { merge } from "lodash-es";

function renderFile(src: string, dest: string) {
  const filename = path.basename(src);

  if (filename.startsWith("_")) {
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, "."));
  }

  if (filename === "package.json") {
    const target = JSON.parse(fs.readFileSync(dest, "utf-8"));
    const source = JSON.parse(fs.readFileSync(src, "utf-8"));
    const mergedPkg = merge({}, target, source);

    const sortKeys = ["devDependencies", "dependencies"];
    sortKeys.forEach((k) => {
      if (mergedPkg[k]) {
        mergedPkg[k] = Object.keys(mergedPkg[k])
          .sort()
          .reduce(
            (a: { [key: string]: string }, c) => ((a[c] = mergedPkg[k][c]), a),
            {}
          );
      }
    });

    fs.writeFileSync(dest, JSON.stringify(mergedPkg, null, 2) + "\n");
  } else {
    fs.copyFileSync(src, dest);
  }
}

function renderDirectory(src: string, dest: string) {
  const dirname = path.basename(src);

  if (dirname.startsWith("_")) {
    dest = path.resolve(path.dirname(dest), dirname.replace(/^_/, "."));
  }

  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach((p) =>
    renderTemplate(path.resolve(src, p), path.resolve(dest, p))
  );
}

function renderTemplate(src: string, dest: string) {
  if (fs.statSync(src).isDirectory()) {
    renderDirectory(src, dest);
  } else {
    renderFile(src, dest);
  }
}

export { renderTemplate };
