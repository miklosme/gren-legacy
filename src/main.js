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
                default: `gren.config.js`,
            },
        },
    });

    const exitCode = await gren({
        config: `${cwd}/${cli.flags.config}`,
    });

    process.exit(exitCode);
}

export default main;