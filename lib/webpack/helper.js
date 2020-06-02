const path = require('path');
const fs = require('fs');
const { parse } = require('node-html-parser');
const { SOURCE, SLIDES, TEMPLATE_ROOT, root } = require('./paths');
const pkgFile = root('package.json');
const pkg = require(pkgFile);
const APP_NAME = pkg.name || 'slide-manager';
const { MAIN_ENTRY_NAME, SLIDE_PREFIX, SLIDE_ROUTE } = require('./constant');

if (!fs.existsSync(SLIDES)) {
  throw new Error(`${MAIN_ENTRY_NAME}: slides 目录不存在 ${SLIDES}`);
}
function getSlideEntry(entry) {
  return `${SLIDE_PREFIX}${entry}`;
}

function getMainEntryFile(file) {
  const main = 'main';
  let filePath = path.join(SOURCE, main, file);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(TEMPLATE_ROOT, main, file);
  }
  return filePath;
}

// entries
function getHtmlWebpackPlugins() {
  const slides = fs.readdirSync(SLIDES)
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  return [
    // main entry
    {
      template: getMainEntryFile('index.html'),
      filename: `index.html`,
      inject: true,
      cache: false,
      chunks: [MAIN_ENTRY_NAME],
    },
    // all slide entries
    ...slides.map(k => {
      return {
        template: path.join(SLIDES, k, 'index.html'),
        filename: `${SLIDE_ROUTE}/${k}/index.html`,
        inject: true,
        cache: false,
        chunks: [getSlideEntry(k)],
      };
    })
  ].map(conf => new HtmlWebpackPlugin(conf));
}

function getEntries() {
  return new Promise((resolve) => {
    // all slides page
    let slides = fs.readdirSync(SLIDES);
    slides = slides.reduce((acc, k) => {
      const file = path.join(SLIDES, k, 'index.js');
      // ignore not exist
      if (fs.existsSync(file)) {
        acc[`${SLIDE_PREFIX}${k}`] = file;
      }
      return acc;
    }, {});
    // main page
    slides[MAIN_ENTRY_NAME] = getMainEntryFile('index.js');
    resolve(slides);
  })
}

function getManifests(slides) {
  let slidesRoot = SLIDES;
  if (typeof slides === 'string') {
    slidesRoot = slides;
    slides = null;
  }
  if (!slides) {
    slides = fs.readdirSync(slidesRoot);
  }
  return slides.map(k => {
    const info = {
      href: `${SLIDE_ROUTE}/${k}`,
      title: k,
      desc: k
    };
    try {
      const file = path.join(slidesRoot, k, 'manifest')
      const manifest = require(file);
      Object.assign(info, manifest);
    } catch (err) {}
    return info;
  });
}

function getAppData() {
  const manifests = getManifests(SLIDES);
  const appName = pkg['slide-manager'] || {
    appName: APP_NAME
  };
  return {
    ...appName,
    manifests
  };
}

function getAppScript() {
  const appData = JSON.stringify(getAppData());
  return `window.__APP = ${appData};`;
}

function loadHtml(url) {
  if (url.endsWith('.html')) {
    url = path.basename(path.dirname(url));
  } else {
    url = path.basename(url);
  }
  let htmlFile;
  if (url) {
    htmlFile = path.join(SLIDES, url, 'index.html')
  } else {
    htmlFile = getMainEntryFile('index.html')
  }
  let content = `
<h1>Not Found: html file not exist</h1>
<p>Path: ${htmlFile}</p>
`
  try {
    content = fs.readFileSync(htmlFile, 'utf-8');
  } catch (err) { }
  const document = parse(content);
  const appMetadataScript = parse(`<script type='text/javascript'>${getAppScript()}</script>`, {
    script: true
  });
  const mainScript = parse(`<script type='text/javascript' src='${url}/index.js'></script>`, { script: true });
  const body = document.querySelector('body');
  if (body) {
    [appMetadataScript, mainScript].forEach(script => body.appendChild(script));
  }
  return document.toString();
}

function getOutputFilename(entryName, isProd) {
  const slidePrefix = 'slide_';
  let filename;
  if (entryName.startsWith(slidePrefix)) {
    const name = entryName.slice(slidePrefix.length);
    filename = `${SLIDE_ROUTE}/${name}/index.js`;
  } else {
    filename = 'index.js'; // main
  }
  return isProd ? `${filename}?hash=[chunkhash]` : filename;
}

module.exports = {
  getEntries,
  getHtmlWebpackPlugins,
  getManifests,
  IS_PROD: process.env.NODE_ENV === "production",
  loadHtml,
  getOutputFilename,
  getAppScript,
  APP_NAME,
}