const setCommitStatus = require('./github/set-commit-status');

setCommitStatus('failure').then(data => {
    console.log('WATCH', JSON.stringify(data, null, 2));
});
