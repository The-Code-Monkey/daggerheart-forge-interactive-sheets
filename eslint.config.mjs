import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import eslintPluginBetterTailwind from "eslint-plugin-better-tailwindcss";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = tseslint.config(
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
[
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "better-tailwindcss": eslintPluginBetterTailwind
    },
    rules: {
          "@typescript-eslint/no-unnecessary-type-parameters": "off"
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "./src/index.css"
      }
    }
  },
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ),
  eslintPluginPrettierRecommended,
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "lf",
          semi: true,
          singleQuote: false,
          tabWidth: 2,
          trailingComma: "es5",
          importOrder: [
            "^(server-only$)",
            "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
            "^(next/(.*)$)|^(next$)",
            "<THIRD_PARTY_MODULES>",
            "^(@chakra-ui/(.*)$)|^(@chakra-ui$)",
            "",
            "^(@/hooks|@/forms|@/interfaces|@/lib|@/app)",
            "^@/components",
            "",
            "^[.]",
          ],
          importOrderTypeScriptVersion: "5.1.6",
        },
      ],
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": "off",
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "no-underscore-dangle": "off",

      // TypeScript specific rules
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      // Enforce arrow function style with const declarations
      "func-style": ["error", "expression"],
      "prefer-arrow-callback": ["error", { "allowNamedFunctions": false }],
      "prefer-const": "error",
      "no-var": "error",
      // Custom rule to forbid function declarations
      "no-restricted-syntax": [
        "error",
        {
          "selector": "FunctionDeclaration",
          "message": "Function declarations are not allowed. Use arrow functions with const instead: const funcName = () => {}"
        }
      ],
    },
  },
]);

export default eslintConfig;
