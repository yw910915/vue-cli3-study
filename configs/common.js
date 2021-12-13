/**
 * @author XXOO
 * @description webpackChain公共设置
 * 目录别名、环境变量等
 */

const path = require('path')
const projectConfig = require('../project.json')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = function commonConfig(config) {
    const needPref = process.env.cli_env != 'dev';

    // 设置别名
    config.resolve.alias.set('views', resolve('src/views'));
    config.resolve.alias.set('Components', resolve('src/components'));
    config.resolve.alias.set('Route', resolve('src/route'));
    config.resolve.alias.set('Services', resolve('src/services'));
    config.resolve.alias.set('Store', resolve('src/store'));
    config.resolve.alias.set('Constains', resolve('src/constains'));
    config.resolve.alias.set('Api', resolve('src/api'));
    config.resolve.alias.set('Utils', resolve('src/utils'));
    config.resolve.alias.set('Static', resolve('src/static'));
    config.resolve.alias.set('Test', resolve('src/test'));

    // 定义额外属性
    config.plugin('define').tap(args => {
        args[0]['process.env'].cli_env = `"${process.env.cli_env}"`;
        args[0]['process.env'].SYSTEM_NAME = `"${projectConfig.name}"`
        return args;
    })

    // 拷贝静态文件
    config.plugin('assets').use(require('copy-webpack-plugin'), [
        [
            {
                from: resolve('static'),
                to: 'static',
                ignore: ['.*'],
            }
        ]
    ])

    if(needPref) {
        // 修改terser行为
        config.optimization.minimize(true);
        config.optimization.minimizer('terser').tap(args => {
            args[0].test = /\.js(\?.*)?$/i;
        })

        // gzip support
        config.plugin('compression').use(require('compression-webpack-plugin'),[
            {
                test: /\.js$|\.css$/,
                threshold: 10240,
                deleteOriginalAssets: false
            }
        ])
    }

}
