const { urlToRequest } = require("loader-utils");
const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

module.exports = function gitLoader(source) {
  const options = this.getOptions();
  const filepath = urlToRequest(this.resourcePath).replace("./", "");
  const dir = path.dirname(filepath);
  const { birthtime } = fs.statSync(filepath);
  // Quote the path: the checkout may live somewhere with spaces (a worktree under
  // ~/Library/Application Support, say).
  const quoted = JSON.stringify(filepath);
  const { stdout: lastUpdated } = execSync(
    `git log -1 --format=%aI -- ${quoted}`
  );

  let description = "";
  const descriptionPath = filepath.replace("page.tsx", "description.txt");

  if (fs.existsSync(descriptionPath)) {
    description = fs.readFileSync(descriptionPath, "utf8");
  }

  const creationPath = filepath.replace("page.tsx", "creation.txt");
  let { stdout: creationDate } = execSync(
    `git log --diff-filter=A --follow --format=%aI -- ${quoted} | tail -1`
  );

  if (fs.existsSync(creationPath)) {
    creationDate = fs.readFileSync(creationPath, "utf8");
  }

  return `export default ${JSON.stringify({
    source,
    creationDate: creationDate || birthtime,
    lastUpdated,
    description,
  })}`;
};
