const octokit = require('@octokit/rest')();
const getRepoInfo = require('../helpers/get-repo-info');

octokit.authenticate({
    type: 'app',
    token: process.env.GREN_GITHUB_TOKEN,
});

export default async function listChangedFiles(number) {
    const { owner, name } = getRepoInfo();
    return octokit.pullRequests.getFiles({ owner, repo: name, number });
}
