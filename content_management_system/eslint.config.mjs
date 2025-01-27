import globals from "globals";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/node_modules",
      "dist/*",
      "**/.eslintrc.js",
      "**/tsconfig.json",
      "**/build",
      "**/.cache",
      "**/plugins/**",
    ],
  },
  {
    files: ["**/webpack.config.js", "**/webpack.config.example.js"],

    languageOptions: {
      globals: {
        ...globals.commonjs,
      },
    },
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:node/recommended",
      "plugin:import/errors",
    ),
  ).map((config) => ({
    ...config,
    files: ["src/**/*.js", "src/**/*.ts"],
    ignores: [
      "**/*.tests.js",
      "**/webpack.config.js",
      "**/webpack.config.example.js",
    ],
  })),
  {
    files: ["src/**/*.js", "src/**/*.ts"],
    ignores: [
      "**/*.tests.js",
      "**/webpack.config.js",
      "**/webpack.config.example.js",
    ],

    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: ["./tsconfig.json", "./src/plugins/**/tsconfig.json"],
      },
    },

    rules: {
      "global-require": "off",

      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],

      "no-param-reassign": [
        "error",
        {
          props: false,
        },
      ],

      "no-return-await": "error",
      "node/no-unsupported-features/es-syntax": 0,

      "import/no-duplicates": [
        "error",
        {
          considerQueryString: true,
        },
      ],

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
        {
          avoidExplicitReturnArrows: true,
        },
      ],

      "one-var": ["error", "never"],
    },
  },
];
