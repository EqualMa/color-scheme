/* eslint-env node */
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: { version: 3, proposals: false },
        exclude: ["@babel/plugin-transform-regenerator"],
      },
    ],
  ],
};
