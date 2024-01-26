const { urlToRequest } = require("loader-utils");
const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

module.exports = function gitLoader(source) {
  const options = this.getOptions();
  const filepath = urlToRequest(this.resourcePath).replace("./", "");
  const dir = path.dirname(filepath);
  const { birthtime } = fs.statSync(filepath);
  const { stdout } = execSync(
    `git log --diff-filter=A --format=%aI ${filepath}`
  );
  const { stdout: lastUpdated } = execSync(
    `git log -1 --format=%aI ${filepath}`
  );

  let description = "";
  const descriptionPath = filepath.replace("page.tsx", "description.txt");

  if (fs.existsSync(descriptionPath)) {
    description = fs.readFileSync(descriptionPath, "utf8");
  }

  return `export default ${JSON.stringify({
    source,
    creationDate: stdout || birthtime,
    lastUpdated,
    description,
  })}`;
};
