module.exports = {
  publicPath:'./',
  outputDir:'dist',
  // assetsDir:'static',
  configureWebpack: {
    // outputDir:'dist',
    resolve:{
      extensions:[],
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    }
  }
}
