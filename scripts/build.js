import { build } from "esbuild";

async function bundle() {
  await build({
    bundle: true,
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.cjs",
    format: "cjs",
    platform: "node",
    target: "node16",
    external: ["minimist", "prompts"],
  });
}

bundle().catch((err) => {
  console.error(err);
  process.exit(1);
});
