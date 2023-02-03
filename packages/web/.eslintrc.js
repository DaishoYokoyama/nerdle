module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["dist", "vite.config.ts"],
  rules: {
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
  },
};
