#!/usr/bin/env node

const commander = require('commander');
const program = new commander.Command();
const pkgJson = require('../package.json');

program.version(pkgJson.version)

const commands = [
  {
    name: 'init',
    command: 'init <directory>',
    description: '初始化一个 Slide Manager 项目'
  },
  {
    name: 'serve',
    description: '本地运行'
  },
  {
    name: 'build',
    description: '构建可部署的静态站点'
  },
];

for (let { name, command, description } of commands) {
  program
    .command(command || name)
    .description(description)
    .action(require(`../lib/commands/${name}`));
}

program.parse(process.argv);
