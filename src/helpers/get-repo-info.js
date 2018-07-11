const extractRepoId = require('./extract-repo-id');
const getPackageJson = require('./get-package-json');

module.exports = function getRepoInfo() {
    const { repository } = getPackageJson();
    if (!repository) {
        throw new Error('you must set the `repository` field in package json');
    }
    if (typeof repository === 'object') {
        if (!repository.url) {
            throw new Error('you must set the `repository.url` field in package json');
        }
        return extractRepoId(repository.url);
    }
    return extractRepoId(repository);
};
