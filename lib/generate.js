const {
  writeFileSync,
  readFileSync,
  ensureDirSync
} = require('fs-extra');
const path = require('path');
const mustache = require('mustache')
const { SLIDES } = require('./webpack/paths');

class Generator {
  constructor({
    baseUrl,
    outputDir
  } = {}) {
    this.baseUrl = baseUrl || __dirname
    this.outputDir = path.isAbsolute(outputDir || '.') ?
      outputDir :
      path.join(this.baseUrl, outputDir || '.')
    this.templates = []
  }

  addTemplate(input, output) {
    if (!output) {
      output = path.basename(input).replace(/(.+)\.mustache$/, '$1')
    }
    this.templates.push({
      input,
      output
    })
  }

  render(ctx = {}) {
    this.templates.forEach(({
      input,
      output
    }) => {
      const tpl = readFileSync(path.join(this.baseUrl, input), 'utf8')
      const content = mustache.render(tpl.toString(), ctx)
      const outputFile = path.join(this.outputDir, output)
      console.log(`${input} -> ${outputFile}`)
      writeFileSync(outputFile, content)
    })
  }
}

function generateSlide({ name, simple }) {
  const outputDir = path.join(SLIDES, name);
  ensureDirSync(outputDir)

  const G = new Generator({
    baseUrl: path.join(__dirname, '..'),
    outputDir: outputDir
  })

  if (simple) {
    G.addTemplate('templates/slide/simple.manifest.json.mustache', 'manifest.json')
  } else {
    G.addTemplate('templates/slide/index.html.mustache')
    G.addTemplate('templates/slide/index.js.mustache')
    G.addTemplate('templates/slide/manifest.json.mustache')
  }

  const context = { name, title: name };
  if (simple) {
    context.href = "https://revealjs.com/";
    context.desc = "Reveal.js Online";
  }
  G.render(context)
}

module.exports = {
  generateSlide
}