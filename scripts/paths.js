const path = require('path');
const { SLIDE_DIRECTORY } = require('./constant');

const ROOT = path.resolve(__dirname, '..');
const DEST = path.resolve(ROOT, 'dist');
const SOURCE = path.resolve(ROOT, 'src');
const SLIDES = path.resolve(SOURCE, SLIDE_DIRECTORY);


module.exports = {
  root: (dir) => path.join(ROOT, dir || ''),
  dest: (dir) => path.join(DEST, dir || ''),
  source: (dir) => path.join(SOURCE, dir || ''),
  ppts: (dir) => path.join(SLIDES, dir || ''),
  ROOT,
  DEST,
  SOURCE,
  SLIDES
}