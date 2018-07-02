const fetch = require('node-fetch');
const getRepoInfo = require('../helpers/get-repo-info');

module.exports = function updateBotComment(commentId, body) {
    const { owner, name } = getRepoInfo();
    // graphql api does not support this, so we need to use v3
    return fetch(`https://api.github.com/repos/${owner}/${name}/issues/comments/${commentId}`, {
        method: 'PATCH',
        body,
        headers: {
            Authorization: `Bearer ${process.env.GREN_GITHUB_TOKEN}`,
        },
    });
};
