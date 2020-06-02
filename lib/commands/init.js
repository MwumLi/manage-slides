const path = require('path');
const { statSync, copy, outputJSONSync } = require("fs-extra");
const { spawnSync } = require('child_process');

const TEMPLATE_ROOT = path.join(__dirname, '..', '..', 'templates');
module.exports = async (directory, sss, zz) => {
  directory = path.isAbsolute(directory) ? directory : path.resolve(process.cwd(), directory);
  if (!statSync(directory).isDirectory()) {
    throw new Error(`${directory} should be a directory`);
  }

  // 拷贝默认
  await copy(TEMPLATE_ROOT, directory, {
    filter: (src) => path.basename(src) !== 'main'
  });

  // 生成 package.json
  spawnSync('npm', ['init', '-y'], {
    stdio: 'inherit',
    shell: true
  });

  // 写入脚本
  const pkgPath = path.join(directory, 'package.json');
  const pkg = require(pkgPath);
  pkg.scripts = pkg.scripts || {};
  pkg.scripts.serve = 'sm serve';
  pkg.scripts.build = 'sm build';
  outputJSONSync(pkgPath, pkg, {
    spaces: 2
  });

  // 安装依赖
  spawnSync('npm', ['install', 'reveal.js', '--save'], {
    stdio: 'inherit',
    shell: true
  });
  spawnSync('npm', ['install', 'slide-manager', '--save-dev'], {
    stdio: 'inherit',
    shell: true
  });
}