module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "import", "react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      { assertionStyle: "as", objectLiteralTypeAssertions: "never" },
    ],
    "@typescript-eslint/consistent-type-imports": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: { order: "asc" },
        "newlines-between": "always",
      },
    ],
  },
};
