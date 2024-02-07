/* eslint-env node */
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vitest-globals/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  env: {
    browser: true,
    es2022: true,
    es6: true,
    "vitest-globals/env": true,
    "cypress/globals": true,
  },
  overrides: [
    {
      files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
    {
      files: ["*.tsx, *.jsx"],
      rules: {
        "@typescript-eslint/ban-types": [
          "error",
          {
            extendDefaults: true,
            types: {
              "{}": false,
            },
          },
        ],
        "no-unused-expressions": "off",
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-undef": "off",
        "@typescript-eslint/no-misused-promises": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.json",
  },
  plugins: ["react", "import", "jsx-a11y", "@typescript-eslint", "cypress"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    "no-undef": process.env.NODE_ENV === "production" ? "warn" : "error",
    "no-unreachable": process.env.NODE_ENV === "production" ? "warn" : "error",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars":
      process.env.NODE_ENV === "production" ? "warn" : "error",
    "react/prop-types": 0,
    "@typescript-eslint/no-empty-function": 0,
  },
};
