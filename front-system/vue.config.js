// vue-cli的配置文件
module.exports = {
  // 代理服务器,让前端开发服务器去发网络请求,脱离了浏览器环境也就没有了跨域问题
  devServer: {
    proxy: {
      // 当请求的地址是以/res，则在该请求前拼接上target
      "/res": {
        // target: "http://127.0.0.1:7001",
        target: "http://127.0.0.1:3001",
      },
      "/api": {
        // target: "http://127.0.0.1:7001",
        target: "http://127.0.0.1:3001",
      },
      "/static": {
        // target: "http://127.0.0.1:7001",
        target: "http://127.0.0.1:3001",
      },
    },
    port: 8989,
  },
  configureWebpack: require("./webpack.config"),
};
