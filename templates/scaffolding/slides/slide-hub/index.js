import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';

import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

// highlight
import 'reveal.js/plugin/highlight/monokai.css';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm';

// requre 在 html 中引用的资源: 因为 html 目前没有被 webpack loader 处理, 所以不能处理 html 里面引用的资源, 因此, 只能通过这种手段保证资源可以正确的被 webpack 所识别, 
require('./images/what-ppt.gif');
require('./images/sad.png');
require('./images/slide-html.png');
require('./images/slide-main.png')

let deck = new Reveal({
  plugins: [Markdown, Highlight],
  history: true,
})
deck.initialize();