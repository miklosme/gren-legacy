import meow from 'meow';
import gren from './gren';

async function main(cwd, argv) {
    let cli = meow({
        argv,
        // prettier-ignore
        help: `
  Usage
    $ gren

  Options
    --config=/path/to/config
    `.trimRight(),
        flags: {
            config: {
                type: 'string',
                default: 'gren.config.js',
            },
            silent: {
                type: 'boolean',
                default: false,
            },
            sourceBranch: {
                type: 'string',
            },
            printHtmlReport: {
                type: 'boolean',
                default: false,
            },
        },
    });

    const { silent, printHtmlReport, sourceBranch } = cli.flags;

    if (silent) {
        process.env.GREN_SILENT = true;
    }

    if (printHtmlReport) {
        process.env.GREN_PRINT_HTML_REPORT = true;
    }

    if (sourceBranch) {
        process.env.GREN_SOURCE_BRANCH = sourceBranch;
    }

    const exitCode = await gren({
        config: `${cwd}/${cli.flags.config}`,
    });

    process.exit(exitCode);
}

export default main;
