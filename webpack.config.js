const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/App.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'website/js')
  },
  /*plugins: [
    new CopyPlugin([
      { from: 'blockchain/build/contracts/Twibber.json', to: 'website/contracts/Twibber.json' },
    ]),
  ],*/
  watch: true
};
