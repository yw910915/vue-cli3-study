/**
 * @author XXOO
 * @description 后端服务代理
 * @warning xxoo
 */

let gateWay = '';
gateWay = 'http://30.23.12.5:8980';

module.exports = {
    'hsa-demo': {
        target: gateWay,
        changeOrigin: true
    }
}