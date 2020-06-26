const fs = require("fs");
const path = require("path");

function findNested(dir, pattern) {
  let results = [];

  fs.readdirSync(dir).forEach((inner_dir) => {
    inner_dir = path.resolve(dir, inner_dir);
    const stat = fs.statSync(inner_dir);

    if (stat.isDirectory()) {
      results = results.concat(findNested(inner_dir, pattern));
    }

    if (stat.isFile() && inner_dir.endsWith(pattern)) {
      results.push(inner_dir);
    }
  });

  return results;
}

module.exports = {
  findNested,
};
