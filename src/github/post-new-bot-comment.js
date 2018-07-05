const client = require('../graphql/client');

const mutation = `
    mutation PostComment($subjectId: ID!, $body: String!) {
        addComment(input: { subjectId: $subjectId, body: $body }) {
            subject {
                id
            }
        }
    }
`;

module.exports = function postNewBotComment(subjectId, body) {
    return client.request(mutation, { subjectId, body });
};
