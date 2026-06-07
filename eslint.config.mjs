import eslint from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Prettier integration (optional, but recommended)
  prettierPlugin,

  {
    // Ignore compiled output and generated folders
    ignores: ["dist/**", "node_modules/**", "prisma/**"],
  },
  {
    // Apply these rules to TypeScript files
    files: ["src/**/*.ts"],
    rules: {
      // Catch unused variables to keep modules clean
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],

      // Warn when using 'any' to encourage proper typing
      "@typescript-eslint/no-explicit-any": "warn",

      // Prevent accidental console logs in production
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    },
  },
);
