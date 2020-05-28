module.exports = function (env = {}, argv) {
  env.mode = process.env.NODE_ENV;
  if (env.mode === 'production') {
    return require('./webpack.prod.config')(env, argv);
  }
  return require('./webpack.serve.config')(env, argv);
}