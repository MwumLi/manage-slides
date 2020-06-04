const path = require('path');
const { copy, ensureDirSync } = require("fs-extra");
const MAIN = path.join(__dirname, '..', '..', 'templates', 'main');
module.exports = async () => {
  const mainOutput = path.resolve(process.cwd(), 'main');
  ensureDirSync(mainOutput);
  // 拷贝默认
  await copy(MAIN, mainOutput);
}