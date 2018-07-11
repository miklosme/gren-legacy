const { execSync } = require('child_process');

module.exports = function getBranchName() {
    if (process.env.GREN_SOURCE_BRANCH) {
        return process.env.GREN_SOURCE_BRANCH;
    }

    const sourceBranch = execSync('git rev-parse --abbrev-ref HEAD')
        .toString('utf8')
        .trim();

    if (sourceBranch === 'HEAD') {
        throw new Error('could not detect source branch correctly');
    }

    return sourceBranch;
};
