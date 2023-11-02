module.exports = {
  root: true,
  ignorePatterns: [
    "node_modules",
    "dist/*",
    ".eslintrc.js",
    "tsconfig.json",
    "build",
    ".cache",
    // "src/**/*.test.ts",
    // "src/admin/*",
  ],
  overrides: [
    {
      files: ["webpack.config.js", "webpack.config.example.js"],
      env: {
        es2021: true,
        commonjs: true,
      },
      rules: {
        // "no-unused-vars": 0,
      },
    },
    {
      files: ["src/**/*.js", "src/**/*.ts"],
      excludedFiles: [
        "*.tests.js",
        // "src/admin/**/*.js",
        // "**/admin/src/**/*.js",
        // "src/admin/**/*.ts",
        // "**/admin/src/**/*.ts",
        "webpack.config.js",
        "webpack.config.example.js",
      ],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:node/recommended",
        "plugin:import/errors",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: { project: ["./tsconfig.json"] },
      plugins: ["@typescript-eslint"],
      rules: {
        // avoid errors on strapi generated code
        // "@typescript-eslint/strict-boolean-expressions": 0,
        // "@typescript-eslint/no-unused-vars": 0,
        // "@typescript-eslint/ban-types": 0,
        "node/no-unsupported-features/es-syntax": 0,
        // other rules
        "no-console": ["error", { allow: ["warn", "error"] }],
        "no-return-await": "error",
        // strapi backend rules https://www.npmjs.com/package/@strapi-community/eslint-config?activeTab=code
        "no-param-reassign": ["error", { props: false }],
        "global-require": "off",
        "no-return-await": "error",
        "object-shorthand": [
          "error",
          "always",
          { avoidExplicitReturnArrows: true },
        ],
        "import/order": "error",
        "import/no-cycle": "error",
        "import/no-useless-path-segments": "error",
        "import/first": "error",
        "import/newline-after-import": "error",
        "node/exports-style": ["error", "module.exports"],
        "node/no-new-require": "error",
        "node/no-path-concat": "error",
        "node/no-callback-literal": "error",
        "node/handle-callback-err": "error",
        "one-var": ["error", "never"],
      },
    },
  ],
};
