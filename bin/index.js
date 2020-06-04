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
    name: 'add',
    command: 'add <slide name>',
    
    description: '新增一个 slide'
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

// https://github.com/tj/commander.js/issues/7#issuecomment-32448653
// Check the program.args obj
const NO_COMMAND_SPECIFIED = program.args.length === 0;

if (NO_COMMAND_SPECIFIED) {
  program.help();
}