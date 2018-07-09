import { exec } from 'child_process';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import submitBotReport from './github/submit-bot-report';
import { getState } from './index';
import setCommitStatus from './github/set-commit-status';
import getTranspiledConfig from './helpers/get-transpiled-config';
import { secondsSince, borderText, reflect } from './helpers/utils';
import { checkStatuses } from './commons/constants';

function cmd(command, name) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            console.log(borderText(name));
            console.log();
            console.log(stdout);

            if (error) {
                reject(stdout.trim());
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

async function gren({ config: configPath }) {
    const config = await getTranspiledConfig(configPath);
    const mainStart = Date.now();
    const performance = {
        tasks: {},
    };

    await setCommitStatus(checkStatuses.pending);

    await Promise.all(
        Object.entries(config.tasks)
            .map(([name, task]) => async () => {
                // TODO: pass in useful data to the job
                const start = Date.now();
                const job = await task();

                if (job.command) {
                    let result = null;
                    try {
                        result = await cmd(job.command, name);
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

    const exitCode = state.fails ? state.fails.length : 0;

    const DefaultReport = <h1>pretty dope pr, my dude!</h1>;
    const Report = config.buildReport || DefaultReport;
    const htmlReport = ReactDOMServer.renderToStaticMarkup(<Report {...state} />);

    await submitBotReport(htmlReport);

    await setCommitStatus(exitCode ? checkStatuses.failure : checkStatuses.success);

    console.log(`Gren successfully finished with exit code ${exitCode}.`);

    return exitCode;
}

export default gren;
