module.exports = {
  root: true,
  ignorePatterns: [
    "node_modules",
    "dist/*",
    ".eslintrc.js",
    "tsconfig.json",
    "build",
    ".cache",
  ],
  overrides: [
    {
      files: ["webpack.config.js", "webpack.config.example.js"],
      env: {
        es2021: true,
        commonjs: true,
      },
    },
    {
      files: ["src/**/*.js", "src/**/*.ts"],
      excludedFiles: [
        "*.tests.js",
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
        "global-require": "off",
        "no-console": ["error", { allow: ["warn", "error"] }],
        "no-param-reassign": ["error", { props: false }],
        "no-return-await": "error",
        "node/no-unsupported-features/es-syntax": 0, // avoid errors on strapi generated code
        "import/no-duplicates": ["error", { considerQueryString: true }],
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-cycle": "error",
        "import/no-useless-path-segments": "error",
        "import/order": "error",
        "node/exports-style": ["error", "module.exports"],
        "node/handle-callback-err": "error",
        "node/no-callback-literal": "error",
        "node/no-new-require": "error",
        "node/no-path-concat": "error",
        "object-shorthand": [
          "error",
          "always",
          { avoidExplicitReturnArrows: true },
        ],
        "one-var": ["error", "never"],
      },
    },
  ],
};
