const config = require(`./configs/${process.env.cli_env || 'dev'}.env.js`);

module.exports = Object.assign({
    lintOnSave: true
}, config)