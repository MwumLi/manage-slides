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
    command: 'add <slide>',
    options: [
      {
        params: ['-l --light', "轻量级 slide"]
      }
    ],
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
  {
    name: 'custom-portal',
    command: 'custom-portal',
    description: '定制首页'
  },
];

for (let { name, command, description, options } of commands) {
  const cmd = program
    .command(command || name)
    .description(description)

  if (options) {
    options.forEach(option => {
      if (option.required) {
        cmd.requiredOption(...option.params)
      } else {
        cmd.option(...option.params)
      }
    })
  }
  cmd.action(require(`../lib/commands/${name}`));
}

const argv = process.argv;
program.parse(argv);

// https://github.com/tj/commander.js/issues/7#issuecomment-48854967
const NO_COMMAND_SPECIFIED = !argv.slice(2).length
if (NO_COMMAND_SPECIFIED) {
  program.help();
}