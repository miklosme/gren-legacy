const { GraphQLClient } = require("graphql-request");

const client = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    Authorization: `Bearer ${process.env.token}`
  }
});

const query = `
    query {
        repository(owner:"miklosme", name:"gren") {
            pullRequests(last:2, states:OPEN) {
            edges {
              node {
                title
                url
                labels(first:5) {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
`;

client.request(query).then(data => console.log(JSON.stringify(data, null, 2)));
