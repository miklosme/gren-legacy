const { GraphQLClient } = require('graphql-request');

if (!process.env.GREN_GITHUB_TOKEN) {
    throw new Error('could not find `GREN_GITHUB_TOKEN` env variable');
}

const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
        Authorization: `Bearer ${process.env.GREN_GITHUB_TOKEN}`,
    },
});

// jsut a test

module.exports = client;
