module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    // "prettier",
    "prettier/@typescript-eslint"
  ],
  parserOptions: {
    project: "./tsconfig.json"
  }
};
