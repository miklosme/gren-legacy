const React = require('react');
const ReactDOMServer = require('react-dom/server');
const submitBotReport = require('./github/submit-bot-report')

const config = require('../example/gren.config.js');

const DefaultReport = <h1>pretty dope pr, my dude!</h1>;

const Report = config.buildReport || DefaultReport;

const state = {
    fails: ['foo', 'bar', 'baz'],
    eslintErrors: 'lorem ipsum',
};

const htmlReport = ReactDOMServer.renderToStaticMarkup(<Report {...state} />);

submitBotReport(htmlReport).then(data => console.log('WATCH', JSON.stringify(data, null, 2)))