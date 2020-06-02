const path = require('path');
const { SLIDE_DIRECTORY } = require('./constant');

const ROOT = process.cwd();
const DEST = path.resolve(ROOT, 'dist');
const SOURCE = ROOT;
const SLIDES = path.resolve(SOURCE, SLIDE_DIRECTORY);
const TEMPLATE_ROOT = path.join(__dirname, '..', '..', 'templates');

module.exports = {
  root: (dir) => path.join(ROOT, dir || ''),
  dest: (dir) => path.join(DEST, dir || ''),
  source: (dir) => path.join(SOURCE, dir || ''),
  ppts: (dir) => path.join(SLIDES, dir || ''),
  ROOT,
  DEST,
  SOURCE,
  SLIDES,
  TEMPLATE_ROOT
}