import { defineConfig } from "tsup";

export default defineConfig(() => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    entry: ["src/mcp/server.ts"],
    format: ["esm"],
    target: "node18",
    outDir: "dist",
    clean: true,
    minify: isProduction,
    sourcemap: !isProduction,
    watch: !isProduction,
    dts: true,
    env: {
      NODE_ENV: process.env.NODE_ENV || "development",
    },
  };
});
