const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // mode: 'development',// load時間がproductionより速い
  mode: 'production',
  // devtool: 'cheap-module-eval-source-map',//buildエラー
  performance: {
    hints: false,  //img sizeのエラーを消す
    // maxEntrypointSize: 512000,
    // maxAssetSize: 512000
  },
  entry: {
    main: './src/javascripts/main.js',
  },
  stats: {
    children: true,//waringsの内容を表示
    // warnings: false,
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    // filename: 'javascripts/main.js',
    filename: 'javascripts/[name]-[contenthash].js',
    // publicPath: '/webpack', //For gh-pages deployment
    publicPath: '/',  // For Netlify deployment　出力されるCSSなどからの画像のパスを指定
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',//importしているものを分割の対象とする
      cacheGroups: {
        vendor: {//ライブラリの中のパッケージを分割することを宣言している?重複している3rdパーティのライブラリ（jQueryやvelocityなど）をまとめたファイルvendor fileを作り、各jsファイルはそれを読み込む。
          test: /node_modules/,//分割の対象を指定。(jqueryなどはここにある)
          name: 'vendor',
        },
        //greet.jsなどｊｓ共有ファイルをvendorとは別に作成する
        vendorsModules: {
          test: /src[\\/]javascripts[\\/]*.js/,//optimizeされるファイル
          name: 'vendor-modules',
          minSize: 0,//どのファイルサイズも対象にする
          minChunks: 2,//
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        extractComments: false,//Licenseのコメントファイルを作らないようにできる
        terserOptions: {
          compress: {
            drop_console: true, //console.logなどを省く(本番環境であるproduction時のみ)
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
        exclude: /node_modules/,//除外しないとビルド時間が長くなる
        use: [//ローダーを複数指定したい場合は、use内に利用したいローダーを記述します。
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
                '@babel/preset-react'//for react
              ],
            },
          },
        ],
      },

      {
        test: /\.(css|sass|scss)/,
        use: [
          MiniCssExtractPlugin.loader,
          // CSSを文字列に変換してJSで扱えるようにする
          'css-loader',

          // jsでｃｓｓを変換するプラグインを作るためのツール
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
          // JSでsassに変換された文字列をCSSに変換
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
      // filename: './stylesheets/main.css',
      filename: './stylesheets/[name]-[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'index.html',
      chunks: ['main'],//entry point名を指定する(このjsファイルを読み込む)
    }),
    
    //Eslintを実行()内にoptionを渡せる。デフォルトではjs。
    new ESLintPlugin(),

    // new CleanWebpackPlugin(),
  ],
};
