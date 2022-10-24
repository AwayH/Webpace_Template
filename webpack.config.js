const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';
const CONTENT_HASH = IS_DEV ? '' : '-[contenthash]';

module.exports = {
  mode: process.env.NODE_ENV,

  // context 指定所有的檔案都從 src 資料始開始
  context: path.resolve('src'),

  // 入口（多入口以物件設定）
  entry: {
    index: './views/index',
    async: './views/async',
  },

  // 設定開發版本才會有 source-map，上線版則否
  devtool: IS_DEV ? 'inline-source-map' : false,

  // 出口（filename 會對應入口的檔案名稱）
  output: {
    filename: `js/[name]${CONTENT_HASH}.js`,
    // chunkFilename: `js/[name]-chunk${CONTENT_HASH}.js`,
    path: path.resolve('dist'),
    publicPath: IS_DEV ? '/' : './',
  },

  resolve: { // 省略引入的路徑
    modules: [
      path.resolve('src'),
      path.resolve('src/assets'),
      // path.resolve('src/assets/style'),
      // path.resolve('src/assets/images'),
      path.resolve('node_modules'),
    ],
    // 省略副檔名
    extensions: ['.js'],
    alias: {
      '@': path.resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: {
          loader: 'babel-loader',
        },
        include: [path.resolve('src')],
        // exclude: /node_modules/,
      }, {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { // 背景影像路徑
              publicPath: '../',
            },
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV,
            },
          },
        ],
        include: path.resolve('src'),
      }, {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { // 背景影像路徑
              publicPath: '../',
            },
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV,
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEV,
              additionalData: '@import ~assets/style/utils/variables',
            },
          },
        ],
        include: path.resolve('src'),
      }, {
        test: /\.(png|jpg|gif|svg|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 2,
              name: IS_DEV ? '[name].[ext]' : '[name].[ext]?[contenthash:10]',
              outputPath: 'images',
              // 沒加會變成 [object Module]
              esModule: false,
            },
          }, {
            loader: 'image-webpack-loader',
            options: {
              disable: IS_DEV,
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false, // 表示不啟用這一個圖片優化器
              },
              pngquant: {
                quality: [
                  0.65, 0.9,
                ],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75, // 配置選項表示啟用 WebP 優化器
              },
            },
          },
        ],
        include: path.resolve('src/assets/images'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: '基本測試',
        meta: {
          description: '此網頁的介紹文',
          keyword: '此網頁的關鍵字',
          'og:title': {
            property: 'og:title',
            content: '此網頁轉貼到 FB 上渲染出來的標題字',
          },
          'og:description': {
            property: 'og:description',
            content: '此網頁轉貼到 FB 上渲染出來的介紹文',
          },
          'og:type': {
            property: 'og:type',
            content: '此網頁的類型',
          },
          'og:url': {
            property: 'og:url',
            content: '此網頁轉貼到 FB 上渲染出來的獨立網址',
          },
          'og:image': {
            property: 'og:image',
            content: '此網頁轉貼到 FB 上渲染出來的影像',
          },
        },
        template: './views/Index/template.html',
        filename: 'index.html',
        chunks: ['index'],
      },
    ),
    new HtmlWebpackPlugin(
      {
        title: 'Async',
        template: './views/Async/template.html',
        filename: 'async.html',
        chunks: ['async'],
      },
    ),
    new MiniCssExtractPlugin(
      {
        filename: `style/[name]${CONTENT_HASH}.css`,
      },
    ),
    new CopyPlugin(
      {
        patterns: [
          {
            from: '../static',
            to: 'static',
          },
        ],
      },
    ),
  ],
  devServer: {
    // 開發 Router 使用
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: false,
    liveReload: true,
  },
  // optimization: {
  // // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
  // splitChunks: {
  //     chunks: 'all',
  //     cacheGroups: {
  //       verdors: {
  //         name: 'verdors',
  //         chunks: 'all',
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: 10,
  //         // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegroupenforce
  //         enforce: true,
  //       },
  //     },
  // },
  // },
};
