import { exec } from 'child_process';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const submitBotReport = require('./github/submit-bot-report');
const { getState } = require('./index');

const config = require('../example/gren.config.js');

function cmd(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            // console.log(borderText(command));
            // console.log()
            // console.log(stdout)

            if (error) {
                reject(stdout.trim());
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

(async () => {
    const mainStart = Date.now();
    const performance = {
        tasks: {},
    };
    await Promise.all(
        Object.entries(config.tasks)
            .map(([name, task]) => async () => {
                // TODO: pass in useful data to the job
                const start = Date.now();
                const job = await task();

                if (job.command) {
                    let result = null;
                    try {
                        result = await cmd(job.command);
                        if (job.onSuccess) job.onSuccess(result);
                    } catch (errorResult) {
                        if (job.onError) job.onError(errorResult);
                    }

                    if (job.onFinally) job.onFinally(result);
                }

                performance.tasks[name] = secondsSince(start);
            })
            .map(fn => (console.log(fn), fn()))
            .map(reflect),
    );
    performance.main = secondsSince(mainStart);

    const state = {
        ...getState(),
        performance,
    };

    const DefaultReport = <h1>pretty dope pr, my dude!</h1>;
    const Report = config.buildReport || DefaultReport;
    const htmlReport = ReactDOMServer.renderToStaticMarkup(<Report {...state} />);

    await submitBotReport(htmlReport);

    console.log('all seems good');
})();

// util functions

function borderText(text) {
    const middle = `** ${text} **`;
    const border = '*'.repeat(middle.length);
    return `${border}\n${middle}\n${border}`;
}

function secondsSince(start) {
    return Math.floor((Date.now() - start) / 10) / 100;
}

function reflect(promise) {
    return promise.then(value => ({ value, status: 'resolved' }), error => ({ error, status: 'rejected' }));
}
