module.exports = {
  ignorePatterns: ["dist"],
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "@typescript-eslint/camelcase": "off",
    "jsx-a11y/alt-text": "off",
    "@next/next/no-img-element": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-expressions": [2, { allowShortCircuit: true, allowTernary: true }],
    "@typescript-eslint/no-unused-vars": [2, { caughtErrors: "none" }],
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
