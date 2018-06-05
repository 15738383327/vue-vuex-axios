'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    openUrlQuery: '/', // 调试时，启动页面参数，例如 '/index?cryptPhone=ILUV/Y34vi7INGusxX/jMA=='
    proxyTable: {},
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8082, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'eval-source-map',
    cacheBusting: true,
    cssSourceMap: false,
  },
  build: {
    index: path.resolve(__dirname, '../dist/analysis/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/analysis'),
    assetsSubDirectory: 'static',
    // you can set by youself according to actual condition
    assetsPublicPath: '/analysis/',  // 项目发布的二级目录
    productionSourceMap: false,
    devtool: '#source-map',
    // 打包时是否生成Gzip
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    locationAPI: 'http://180.96.27.110:2346/locationPlatform', // 广东位置平台地址：http://221.226.175.82:9918/locPlatGD  江苏位置平台地址：http://180.96.27.110:2346/locationPlatform
    onlineApiUrl: 'http://221.226.175.82:9918/portal', // 线上环境接口地
    offlineApiUrl: 'http://221.226.175.82:9918/portal'  // 线下环境接口地址   http://192.168.9.201/portal   http://192.168.0.101:8080/portal   http://127.0.0.1:8080/portal
  }
}
