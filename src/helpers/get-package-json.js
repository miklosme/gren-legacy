const appRoot = require('app-root-path');

module.exports = function getPackageJson() {
    return require(`${appRoot}/package.json`);
}