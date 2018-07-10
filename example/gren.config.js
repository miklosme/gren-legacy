const React = require('react');
// const { message, warn, fail, checkCommand, saveToKey } = require('../src/index');

// the way to add pre-defined tasks from npm
module.exports.tasks = {
    // jestPlugin,
    // ...flowTools,
    // prettier,
};

// adding own tasks

module.exports.tasks.eslint = ({ message, fail, saveToKey, yeah }) => ({
    command: './example/scripts/lint.sh',
    onSuccess: () => message(`${yeah()} There are no lint errors on touched lines!`),
    onError: stdout => {
        const result = stdout
            .replace(/^node\snode_modules.*/, '')
            .replace('info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.', '')
            .replace(/(.*)(src\/(app|lib)(.)*\.js?x)/g, (match, p1, filename) => filename)
            .trim();

        fail(`:raised_hand: There are some linting issues.`);
        saveToKey('eslintErrors', result);
    },
});

module.exports.tasks.foo = async ({ warn }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    warn('bar baz!');
};

const Item = ({ text }) => <li>{text}</li>;

module.exports.buildReport = props => (
    <p>
        {props.messages ? (
            <>
                <h1>Messages</h1>
                <ul>{props.messages.map(message => <Item text={message} />)}</ul>
            </>
        ) : null}

        {props.warnings ? (
            <>
                <h1>Warnings</h1>
                <ul>{props.warnings.map(warning => <Item text={warning} />)}</ul>
            </>
        ) : null}

        {props.fails ? (
            <>
                <h1>Fails</h1>
                <ul>{props.fails.map(fail => <Item text={fail} />)}</ul>
            </>
        ) : null}

        <p>{JSON.stringify(props, null, 2)}</p>
    </p>
);
