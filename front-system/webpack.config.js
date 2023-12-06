const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

if (process.env.NODE_ENV === "production") {
  module.exports = {
    devServer: {
      // 修改端口号为8889
      port: 8889,
    },
    devtool: "none", // 去掉源码地图map
    // plugins: [
    //   new BundleAnalyzerPlugin({
    //     analyzerPort: "8889",
    //   }),
    // ],
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      axios: "axios",
    },
  };
} else {
  module.exports = {
    devServer: {
      // 修改端口号为8889
      port: 8889,
    },
  };
}
