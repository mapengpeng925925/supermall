module.exports = {
  publicPath:'./',
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth:375,   // 视窗的高度 对应设计稿的宽度
      viewportHeight:667,   //视窗的高度
      unitPrecision:5,   //指定px转换为视窗单位值得小数位数  即保留几位小数
      viewportUnit:'vw', //指定需要转成的视窗单位
      minPixelValue:1, //小于或等于1px不转换为视口单位
      mediaQuery:false,  //允许在媒体查询中转换px
      selectorBlackList:['ignore','tab-bar','tab-bar-item'], //指定不需要转换的类
    }
  }
}
