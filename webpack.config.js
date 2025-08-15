const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');


const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",

  entry: {
    main: "./src/js/index.js",
    search: "./src/js/search.js",
    about: "./src/js/about.js",
    facilities: "./src/js/facilities.js",
    portfolio: "./src/js/portfolio.js",
    news: "./src/js/news.js",
    contact: "./src/js/contact.js",
    privacypolicy: "./src/js/privacypolicy.js",
    termsandconditions: "./src/js/termsandconditions.js",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  devtool: isProduction ? "source-map" : "eval-source-map",

  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, "dist"),
      },
      {
        directory: path.resolve(__dirname, "public"),
        publicPath: "/assets",
        watch: true,
      },
    ],
    watchFiles: ["./public/**/*.html"],
    open: true,
    hot: true,
    historyApiFallback: false,
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
      chunks: ["main"],
      inject: "body",
      favicon: "./src/assets/favicon.ico", 
    }),
    new HtmlWebpackPlugin({
      filename: "search.html",
      template: "./public/search.html",
      chunks: ["search"],
      inject: "body",
      favicon: "./src/assets/favicon.ico", 
    }),
    new HtmlWebpackPlugin({
    filename: "about.html",
    template: "./public/about.html",
    chunks: ["about"],
    inject: "body",
    favicon: "./src/assets/favicon.ico",
    }),
    new HtmlWebpackPlugin({
    filename: "facilities.html",
    template: "./public/facilities.html",
    chunks: ["facilities"],
    inject: "body",
    favicon: "./src/assets/favicon.ico",
    }),
    new HtmlWebpackPlugin({
    filename: "portfolio.html",
    template: "./public/portfolio.html",
    chunks: ["portfolio"],
    inject: "body",
    favicon: "./src/assets/favicon.ico",
    }),
    new HtmlWebpackPlugin({
    filename: "news.html",
    template: "./public/news.html",
    chunks: ["news"],
    inject: "body",
    favicon: "./src/assets/favicon.ico",
    }),
    new HtmlWebpackPlugin({
    filename: "contact.html",
    template: "./public/contact.html",
    chunks: ["contact"],
    inject: "body",
    favicon: "./src/assets/favicon.ico",
    }),
    new HtmlWebpackPlugin({
    filename: "privacypolicy.html",
    template: "./public/privacypolicy.html",
    chunks: ["privacypolicy"],
    inject: "body",
    favicon: "./src/assets/favicon.ico",
    }),
    new HtmlWebpackPlugin({
    filename: "termsandconditions.html",
    template: "./public/termsandconditions.html",
    chunks: ["termsandconditions"],
    inject: "body",
    favicon: "./src/assets/favicon.ico",
    }),
    new PreloadWebpackPlugin({
    rel: 'preload',
    as: (entry) => {
    if (/\.(woff2?|otf|ttf|eot)$/.test(entry)) return 'font';
    if (/\.(png|jpe?g|gif|svg)$/.test(entry)) return 'image';
    return 'script';
    },
    fileWhitelist: [/\.(woff2?|otf|ttf|eot)$/],
    include: 'allAssets',
    crossorigin: 'anonymous',
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.svg$/i,
        resourceQuery: /raw/,
        type: "asset/source",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|ttf|otf|eot)$/i,
        type: "asset/resource",
      },
      {
        test: /\.ico$/i, // ✅ Handle .ico files (favicons)
        type: "asset/resource",
        generator: {
          filename: "[name][ext]", // preserve original filename
        },
      },
      {
        test: /\.json$/i, // ✅ Handle .json files (e.g. search-data.json)
        type: "json",
        parser: {
          parse: JSON.parse,
        },
      },
    ],
  },
};
