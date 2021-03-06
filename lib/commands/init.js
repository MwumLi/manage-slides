const path = require('path');
const {
  ensureDirSync,
  copy,
  outputJSONSync,
  readJSONSync
} = require("fs-extra");
const { spawnSync } = require('child_process');
const { getPkg } = require('../utils');
const SCAFFOLDING = path.join(__dirname, '..', '..', 'templates', 'scaffolding');
module.exports = async (directory) => {
  directory = path.isAbsolute(directory) ? directory : path.resolve(process.cwd(), directory);

  ensureDirSync(directory);

  // 拷贝默认
  await copy(SCAFFOLDING, directory);
  const spawnSyncOpts = {
    stdio: 'inherit',
    shell: true,
    cwd: directory
  }
  // 生成 package.json
  spawnSync('npm', ['init', '-y'], spawnSyncOpts);

  // 获取当前包的 name 和 版本
  const { name, version } = getPkg();

  // 写入脚本
  const pkgPath = path.join(directory, 'package.json');
  const pkg = readJSONSync(pkgPath);
  pkg.scripts = pkg.scripts || {};
  pkg.scripts.serve = `${name} serve`;
  pkg.scripts.build = `${name} build`;
  outputJSONSync(pkgPath, pkg, {
    spaces: 2
  });

  // 安装依赖
  spawnSync('npm', ['install', 'reveal.js', '--save'], spawnSyncOpts);

  spawnSync('npm', ['install', `${name}@${version}`, '--save-dev'], spawnSyncOpts);

  // 初始化创建 Normal Slide
  spawnSync('npx', [name, 'add', 'normal-slide'], spawnSyncOpts);

  // 初始化创建 Light Slide
  spawnSync('npx', [name, 'add', '--light', 'light-slide'], spawnSyncOpts);
}