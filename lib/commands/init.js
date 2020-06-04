const path = require('path');
const { statSync, copy, outputJSONSync } = require("fs-extra");
const { spawnSync } = require('child_process');
const { getPkg } = require('../utils');
const SCAFFOLDING = path.join(__dirname, '..', '..', 'templates', 'scaffolding');
module.exports = async (directory) => {
  directory = path.isAbsolute(directory) ? directory : path.resolve(process.cwd(), directory);
  if (!statSync(directory).isDirectory()) {
    throw new Error(`${directory} should be a directory`);
  }

  // 拷贝默认
  await copy(SCAFFOLDING, directory);

  // 生成 package.json
  spawnSync('npm', ['init', '-y'], {
    stdio: 'inherit',
    shell: true
  });

  // 获取当前包的 name 和 版本
  const { name, version } = getPkg();

  // 写入脚本
  const pkgPath = path.join(directory, 'package.json');
  const pkg = require(pkgPath);
  pkg.scripts = pkg.scripts || {};
  pkg.scripts.serve = `${name} serve`;
  pkg.scripts.build = `${name} build`;
  outputJSONSync(pkgPath, pkg, {
    spaces: 2
  });

  // 安装依赖
  spawnSync('npm', ['install', 'reveal.js', '--save'], {
    stdio: 'inherit',
    shell: true
  });

  spawnSync('npm', ['install', `${name}@${version}`, '--save-dev'], {
    stdio: 'inherit',
    shell: true
  });
}