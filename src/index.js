const submitBotReport = require('./github/submit-bot-report');

if (!process.env.message) {
    throw new Error('give me `process.env.message`')
}

submitBotReport(process.env.message).then(data => {
    console.log('WATCH', JSON.stringify(data, null, 2))
});
