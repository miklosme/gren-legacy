const readPullRequestInfo = require('./read-pull-request-info');
const octokit = require('@octokit/rest')();
const getRepoInfo = require('../helpers/get-repo-info');
const { checkStatuses } = require('../commons/constants');

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
        target_url: 'https://jenkins.app.eiq/fill-this',
        description: 'Foo bar baz description.',
        context: 'gren',
    });
};
