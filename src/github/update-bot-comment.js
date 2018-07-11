const octokit = require('@octokit/rest')();
const getRepoInfo = require('../helpers/get-repo-info');
const getBranchName = require('../helpers/get-branch-name');
const { reportId } = require('../commons/constants');

// graphql api does not support editing comments, so we need to use v3

octokit.authenticate({
    type: 'app',
    token: process.env.GREN_GITHUB_TOKEN,
});

module.exports = async function updateBotComment(_, body) {
    const { owner, name: repo } = getRepoInfo();
    const branchName = getBranchName();

    // for some reason the editing endpoint doesn't work with the graphql id (it should)
    // let's find the non-hashed id

    const prNumber = await octokit.pullRequests.getAll({ owner, repo, state: 'open' }).then(result => {
        try {
            return result.data.filter(pr => pr.head.ref === branchName)[0].number;
        } catch (error) {
            throw new Error('could not find pr on github');
        }
    });

    const { data } = await octokit.issues.getComments({
        owner,
        repo,
        number: prNumber,
    });
    const commentId = data.find(comment => comment.body.includes(reportId)).id;

    return octokit.issues.editComment({ owner, repo, comment_id: commentId, body });
};
