module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["/lib/**/*"],
  env: { es6: true, node: true },
};
