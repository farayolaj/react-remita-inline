import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" assert { type: "json" };

/**
 * @type {import("rollup").RollupOptions[]}
 */
export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "esm",
      },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" }), terser()],
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.tsx",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
