const getRepoInfo = require('../helpers/get-repo-info');
const getBranchName = require('../helpers/get-branch-name');
const { reportId } = require('../commons/constants');
const client = require('../graphql/client');

const query = `
    query ReadBotComment($owner: String!, $name: String!, $branchName: String!) {
        repository(owner: $owner, name: $name) {
            pullRequests(last:1, headRefName: $branchName) {
                edges {
                    node {
                        prId: id
                        comments(first: 10) {
                            totalCount
                            nodes {
                                id
                                author {
                                    login
                                }
                                body
                            }
                        }
                    }
                }
            }
        }
    }
`;

module.exports = function findBotComment() {
    const branchName = getBranchName();
    const repoInfo = getRepoInfo();
    return client.request(query, { ...repoInfo, branchName }).then(result => {
        const botReportComment = result.repository.pullRequests.edges[0].node.comments.nodes.find(commentNode => {
            return commentNode.body.includes(reportId);
        });
        return botReportComment
            ? { reportAlreadyExists: true, commentId: botReportComment.id }
            : { reportAlreadyExists: false, prId: result.repository.pullRequests.edges[0].node.prId };
    });
};
