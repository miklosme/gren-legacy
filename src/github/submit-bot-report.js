const findBotComment = require('./find-bot-comment');
const postNewBotComment = require('./post-new-bot-comment');
const updateBotComment = require('./update-bot-comment');
const { reportId } = require('../commons/constants');

function addHiddenData(message) {
    return `<!-- ${reportId} --> ${message}`;
}

module.exports = function submitBotReport(message) {
    const body = addHiddenData(message);
    return findBotComment().then(result => {
        if (result.reportAlreadyExists) {
            const subjectId = result.commentId;
            return updateBotComment(subjectId, body);
        } else {
            const subjectId = result.prId;
            return postNewBotComment(subjectId, body);
        }
    });
};
