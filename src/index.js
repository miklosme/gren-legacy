const readPullRequestInfo = require('./github/read-pull-request-info');
const setCommitStatus = require('./github/set-commit-status');

readPullRequestInfo().then(data => {
    const sha = data.repository.pullRequests.edges[0].node.headRef.target.oid;
    setCommitStatus(sha, 'failure').then(data => {
        console.log('WATCH', JSON.stringify(data, null, 2))
    });
});
