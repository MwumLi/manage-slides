const { generateSlide } = require('../generate');
module.exports = async (slide, { simple }) => {
  generateSlide({ name: slide, simple });
}