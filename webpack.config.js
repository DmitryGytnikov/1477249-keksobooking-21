const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/backend.js`,
    `./js/debounce.js`,
    `./js/filter.js`,
    `./js/pin.js`,
    `./js/offer.js`,
    `./js/move-pin.js`,
    `./js/form-send.js`,
    `./js/form-validation.js`,
    `./js/photo-uploader.js`,
    `./js/main.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
