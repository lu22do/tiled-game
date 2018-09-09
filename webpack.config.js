const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

config = {
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff)$/,
        use: 'file-loader'
      },
      {
        test: [ /\.vert$/, /\.frag$/ ],
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.unshift(new CleanWebpackPlugin(['dist']));
  }
  else {
    config.devtool = 'inline-source-map';
  }

  return config;
};
