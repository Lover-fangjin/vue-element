// vue.config.js

module.exports = {
  publicPath: './',
  assetsDir: "assets",
  runtimeCompiler: true,
  devServer: {
    disableHostCheck: true,
    overlay: {
      warnings: process.env.NODE_ENV !== 'production',
      errors: process.env.NODE_ENV !== 'production'
    }
  }
  
}