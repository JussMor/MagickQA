import globals from "globals";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "eslint-plugin-next";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser, // Browser globals
      parser: tsParser, // Use the TypeScript parser
      parserOptions: {
        ecmaVersion: 2020, // ECMAScript features
        sourceType: "module", // ES Modules support
        ecmaFeatures: {
          jsx: true, // Enable JSX
        },
        project: "./tsconfig.json", // Use TypeScript config if needed
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      next: nextPlugin,
    },
    rules: {
      // ESLint recommended rules
      ...js.configs.recommended.rules,

      // TypeScript recommended rules
      ...tsPlugin.configs.recommended.rules,

      // Next.js Core Web Vitals rules
      ...nextPlugin.configs.coreWebVitals.rules,

      // Example customizations (adjust as needed)
      "react/react-in-jsx-scope": "off", // Not needed in Next.js (since React 17)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // Ignore unused variables starting with '_'
      "no-console": "warn", // Warn about console logs
      "react/prop-types": "off", // Disable prop-types rule if using TypeScript
    },
  },
];

