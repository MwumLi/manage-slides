const path = require('path');
const { getNpmPath } = require('../utils');
const { spawn } = require('child_process');

module.exports = () => {
  const cmd = path.join(getNpmPath('webpack'), 'bin', 'webpack.js');
  const opts = ["--config", path.join(__dirname, '..', 'webpack/webpack.build.config.js')]
  spawn(cmd, opts, {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });
}