const paths = require('path');

function getNpmPath(npm) {
  let path = require.resolve(npm);
  console.log(path);
  const prefix = paths.join('node_modules', npm);
  let lastIndex = path.lastIndexOf(prefix);
  path = path.slice(0, lastIndex);
  return path + prefix;
}

const pkgFile = paths.join(__dirname, '..', 'package.json');
function getPkg() {
  return require(pkgFile);
}
module.exports = {
  getNpmPath,
  getPkg
}