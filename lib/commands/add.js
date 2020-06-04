const { generateSlide } = require('../generate');
module.exports = async (slide, { light }) => {
  generateSlide({ name: slide, light });
}