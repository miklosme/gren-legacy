const readPullRequestInfo = require('./read-pull-request-info');
const octokit = require('@octokit/rest')();
const getRepoInfo = require('../helpers/get-repo-info');
const { checkStatuses, checkStatusMessages } = require('../commons/constants');

octokit.authenticate({
    type: 'app',
    token: process.env.GREN_GITHUB_TOKEN,
});

module.exports = async function setCommitStatus(status) {
    const data = await readPullRequestInfo();
    const sha = data.repository.pullRequests.edges[0].node.headRef.target.oid;
    const { owner, name: repo } = getRepoInfo();
    const state = checkStatuses[status];

    if (!state) {
        throw new Error(`invalid check state ${status}`);
    }

    return octokit.repos.createStatus({
        owner,
        repo,
        sha,
        state,
        // TODO make it support other ci
        // BUILD_URL comes from jenkins
        target_url: process.env.BUILD_URL,
        description: checkStatusMessages[status],
        context: 'gren',
    });
};
