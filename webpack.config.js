const path = require("path"); // Import path module
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development", // Use 'production' for deployment
  entry: "./src/app.js", // Main JS file
  output: {
    path: path.resolve(__dirname, "public"), // Output directory
    filename: "app.js",
    clean: true, // Clean public folder on each build
  },
  module: {
    rules: [
      {
        // Transpile JavaScript with Babel
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        // Compile SCSS to CSS
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Input HTML file
      filename: "index.html", // Output HTML file in public
    }),
    new MiniCssExtractPlugin({
      filename: "style.css", // Output CSS file directly in public folder
    }),
  ],

  devServer: {
    static: "./public", // Directory to serve
    port: 3000, // Server port
    open: true, // Open in browser automatically
    devMiddleware: {
      writeToDisk: true, // Ensure files are written to disk in public
    },
  },
};
