module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["/lib/**/*", "jest.config.js"],
  env: { es6: true, node: true },
};
