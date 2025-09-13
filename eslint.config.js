// eslint.config.js
import globals from "globals"
import js from "@eslint/js"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import pluginJsxA11y from "eslint-plugin-jsx-a11y"
import pluginImport from "eslint-plugin-import"

export default [
  js.configs.recommended, // base JS rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y,
      import: pluginImport,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // not needed with React 17+
      "react/prop-types": "off", // disable if using TS
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: { version: "detect" },
    },
  },
]
