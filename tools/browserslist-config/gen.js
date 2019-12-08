const caniuse = require("caniuse-api");
const browserslist = require("browserslist");

const supported = caniuse.getSupport("prefers-color-scheme");

const supportedQueries = Object.keys(supported)
  .map(browser => {
    const version = supported[browser].y;
    return version === undefined ? undefined : [browser, version];
  })
  .filter(Boolean)
  .map(([browser, version]) => `${browser} >= ${version}`);

const res = browserslist(supportedQueries);
console.assert(Array.isArray(res) && res.length, "Test failed!");

require("fs").writeFileSync(
  "index.js",
  `\
module.exports = ${JSON.stringify(supportedQueries, null, 2)};
`,
);
