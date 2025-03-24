// 서버 실행 번들러 설정
const esbuild = require("esbuild");

const config = {
  entryPoints: ["./src/index.ts"],
  bundle: true,
  platform: "node",
  outfile: "./dist/server.js",
  target: "node14",
  sourcemap: true,
};

const run = async () => {
  if (process.argv.includes("--watch")) {
    const ctx = await esbuild.context(config);
    await ctx.watch();
  } else {
    await esbuild.build(config);
  }
};

run();