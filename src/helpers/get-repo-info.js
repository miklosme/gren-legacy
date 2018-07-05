const extractRepoId = require('./extract-repo-id');
const getPackageJson = require('./get-package-json');

module.exports = function getRepoInfo() {
    const { repository } = getPackageJson();
    return extractRepoId(repository);
};
