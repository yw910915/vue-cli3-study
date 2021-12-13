/**
 * @author XXOO
 * @description 云集成生产环境vue-cli配置
 */

const commonConfig = require('./common')

module.exports = {
    publicPath = '/znjq',
    productionSourceMap: false,
    chainWebpack: config => {
        commonConfig(config);
        // 修改入口文件名称
        config.entryPoints.delete('app');
        config.entry('main').add('./src/main.prod.js');
    }
}