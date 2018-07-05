const octokit = require('@octokit/rest')();
const getRepoInfo = require('../helpers/get-repo-info');
const { reportId } = require('../commons/constants');

// graphql api does not support editing comments, so we need to use v3

octokit.authenticate({
    type: 'app',
    token: process.env.GREN_GITHUB_TOKEN,
});

module.exports = async function updateBotComment(_, body) {
    const { owner, name: repo } = getRepoInfo();

    // for some reason the editing endpoint doesn't work with the graphql id (it should), so let's find it again
    const { data } = await octokit.issues.getComments({ owner, repo, number: 1 });
    const commentId = data.find(comment => comment.body.includes(reportId)).id;

    return octokit.issues.editComment({ owner, repo, comment_id: commentId, body });
};
