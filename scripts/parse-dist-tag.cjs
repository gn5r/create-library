const packageJson = require("../package.json");
const version = packageJson.version;

if (version.match(/beta/)) {
  console.log("beta");
} else if (version.match(/next/)) {
  console.log("next");
} else {
  console.log("latest");
}
