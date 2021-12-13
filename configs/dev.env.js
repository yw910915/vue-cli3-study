/**
 * @author XXOO
 * @description 开发环境、CI环境vue-cli配置
 * 
 */

const path = require('path');
// const { config } = require('process');
const commonConfig = require('./common');
const proxyTables = require('./proxyTable');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    publicPath: './',
    productionSourceMap: true,
    devServer: {
        proxy: proxyTables,
    },
    chainWebpack: config => {
        commonConfig(config)
        // 修改入口文件名称
        config.entryPoints.delete('app');
        config.entry('main').add('./src/main.js');
        // 根据编译环境使用对应html模板
        config.plugin('html').tap(args => {
            args[0].template = resolve(`public/index.html`);
            return args;
        })
        config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
            {
                analyzerPort: 'auto'
            }
        ])
    }
}

