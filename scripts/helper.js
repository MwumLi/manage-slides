const path = require('path');
const fs = require('fs');

// paths
const ROOT = path.resolve(__dirname, '..');
const DEST = path.resolve(ROOT, 'dist');
const SOURCE = path.resolve(ROOT, 'src');
const PPTS = path.resolve(SOURCE, 'ppts');

// entries
// all ppt entries
const ppts = fs.readdirSync(PPTS);
const ENTRIES = ppts.reduce((acc, k) => (acc[k] = path.join(PPTS, k, 'index.js'), acc), {});
const HTML_WEBPACK_PLUGIN_CONFIGS = ppts.map(k => {
  return {
    template: path.join(PPTS, k, 'index.html'),
    filename: `${k}/index.html`,
    inject: true,
    cache: false,
    chunks: [k],
  };
});

// add main entry
ENTRIES.main = path.join(SOURCE, 'index.js');
HTML_WEBPACK_PLUGIN_CONFIGS.push({
  template: path.join(SOURCE, 'index.html'),
  filename: `index.html`,
  inject: true,
  cache: false,
  chunks: ['main'],
})

// ppt 元数据
const MANITESTS = ppts.map(k => {
  const info = {
    href: k,
    title: k,
    desc: k
  };
  try {
    const file = path.join(PPTS, k, 'manifest')
    const manifest = require(file);
    Object.assign(info, manifest);
  } catch (err) { }
  return info;
});

module.exports = {
  ROOT,
  SOURCE,
  DEST,
  PPTS,
  ENTRIES,
  HTML_WEBPACK_PLUGIN_CONFIGS,
  MANITESTS,
  IS_PROD: process.env.NODE_ENV === "production"
}