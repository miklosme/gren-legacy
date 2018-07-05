const getRepoInfo = require('../helpers/get-repo-info');
const getBranchName = require('../helpers/get-branch-name');
const client = require('../graphql/client');

const query = `
    query ReadPullRequestInfo($owner: String!, $name: String!, $branchName: String!) {
        repository(owner: $owner, name: $name) {
            pullRequests(last:1, headRefName: $branchName) {
                edges {
                    node {
                        id
                        title
                        bodyHTML
                        changedFiles
                        baseRef {
                            name
                            target {
                                oid
                            }
                        }
                        baseRefName
                        headRef {
                            name
                            target {
                                oid
                            }
                        }
                        headRefName
                    }
                }
            }
        }
    }
`;

module.exports = function readPullRequestInfo() {
    const branchName = getBranchName();
    const repoInfo = getRepoInfo();
    return client.request(query, { ...repoInfo, branchName });
};
