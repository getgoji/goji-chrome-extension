module.exports = {
  env: { browser: true, es2021: true, webextensions: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  rules: {
    "no-undef": "off",
    "no-unused-vars": "off"
  }
}
