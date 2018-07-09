require('@babel/register')({
    only: [/gren\.config\.(js|jsx)$/],
});

import { exec } from 'child_process';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import submitBotReport from './github/submit-bot-report';
import { getState } from './index';

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

async function gren({ config: configPath }) {
    console.log('WATCH', 'configPath', configPath);
    const config = require(configPath);

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
            .map(fn => fn())
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

    // TODO exit code
    return 0;
}

export default gren;
