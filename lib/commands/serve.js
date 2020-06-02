const path = require('path');
const { getNpmPath } = require('../utils');
const { spawn } = require('child_process');

module.exports = () => {
  const cmd = path.join(getNpmPath('webpack-dev-server'), 'bin', 'webpack-dev-server.js');
  const opts = ["--config", path.join(__dirname, '..', 'webpack/webpack.serve.config.js')];
  spawn(cmd, opts, {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: 'development'
    }
  });
}