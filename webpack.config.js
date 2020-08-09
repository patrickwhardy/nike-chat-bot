const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        }
      },

  entry: './src/front-end/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  mode: 'production'
};
