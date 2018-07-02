const { execSync } = require('child_process');

module.exports = function getBranchName() {
    return execSync('git rev-parse --abbrev-ref HEAD')
        .toString('utf8')
        .trim();
}
