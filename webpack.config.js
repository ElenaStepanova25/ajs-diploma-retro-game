const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'; // Проверка режима (production/development)

  return {
    mode: isProduction ? 'production' : 'development', // Установка режима
    entry: './src/index.js', // Точка входа
    output: {
      filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js', // Хеширование в production
      path: path.resolve(__dirname, 'dist'), // Папка для выходных файлов
      clean: true, // Очистка папки dist перед каждой сборкой
      assetModuleFilename: 'assets/[name].[hash][ext]', // Путь для asset modules
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'), // Папка для статических файлов
      },
      compress: true, // Сжатие
      port: 9000, // Порт для devServer
      hot: true, // Включение горячей перезагрузки
      open: true, // Автоматическое открытие браузера
    },
    module: {
      rules: [
        {
          test: /\.js$/, // Обработка JavaScript
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/, // Обработка CSS
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // MiniCssExtractPlugin в production
            'css-loader',
          ],
        },
        {
          test: /\.html$/, // Обработка HTML
          use: 'html-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i, // Обработка изображений
          type: 'asset/resource', // Использование Asset Modules (Webpack 5)
          generator: {
            filename: 'images/[name].[hash][ext]', // Путь для сохранения изображений
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i, // Обработка шрифтов
          type: 'asset/resource', // Использование Asset Modules (Webpack 5)
          generator: {
            filename: 'fonts/[name].[hash][ext]', // Путь для сохранения шрифтов
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // Шаблон HTML
        filename: 'index.html', // Имя выходного HTML-файла
        inject: 'body', // Вставка скриптов в <body>
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? 'styles.[contenthash].css' : 'styles.css', // Хеширование в production
      }),
    ],
    devtool: isProduction ? 'source-map' : 'eval-source-map', // Source maps
    optimization: {
      minimize: isProduction, // Минификация в production
    },
  };
};
