const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  // mode: 'production',
  // devtool: 'cheap-module-eval-source-map',//buildエラー
  performance: {
    hints: false,  
    // maxEntrypointSize: 512000,
    // maxAssetSize: 512000
  },
  entry: {
    main: './src/javascripts/main.js',
  },
  stats: {
    //waringsの内容を表示
    children: true,
    // warnings: false,
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'javascripts/[name]-[contenthash].js',
    publicPath: '/', 
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',//importしているものを分割の対象とする
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
        },
        vendorsModules: {
          //optimizeされるファイル
          test: /src[\\/]javascripts[\\/]*.js/,
          name: 'vendor-modules',
          minSize: 0,//どのファイルサイズも対象にする
          minChunks: 2,//
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        //Licenseのコメントファイルを作らない
        extractComments: false,
        terserOptions: {
          compress: {
            //console.logなどを省く(本番環境であるproduction時のみ
            drop_console: true, 
          },
        },
      }),
    ],
  },

  devServer: {
    hot: false, //liveReloadの自動読み込みをon
    // open: ['/webpack'],読み込み先に''の内容を付与
    open: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },

      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
                '@babel/preset-react'
              ],
            },
          },
        ],
      },

      {
        test: /\.(css|sass|scss)/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // ベンダープレフィックスを自動付与
                plugins: [
                  require('autoprefixer')({
                    overrideBrowserslist: ['last 2 versions'],
                  }),
                ],
              },
            },
          },
          'sass-loader',
        ],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif$)/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]-[contenthash][ext]',
          // filename: 'images/[name].[ext]',
        },

        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './stylesheets/[name]-[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    
    new ESLintPlugin(),

    // new CleanWebpackPlugin(),
  ],
};
