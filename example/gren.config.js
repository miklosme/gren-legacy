const React = require('react');
const { message, warn, fail, checkCommand, reduce } = require('../src/index');

// the way to add pre-defined tasks from npm
module.exports.tasks = {
    // jestPlugin,
    // ...flowTools,
    // prettier,
};

// adding own tasks
module.exports.tasks.eslint = async () => {
    const eslint = checkCommand('./example/scripts/lint.sh');
    eslint.onSuccess = () => message(`${yeah()} There are no lint errors on touched lines!`);
    eslint.onError = stdout => {
        const result = stdout
            .replace(/^node\snode_modules.*/, '')
            .replace('info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.', '')
            .replace(/(.*)(src\/(app|lib)(.)*\.js?x)/g, (match, p1, filename) => filename)
            .trim();

        fail(`:raised_hand: There are some linting issues.`);
        reduce(state => ({
            ...state,
            eslintErrors: result,
        }));
        // reduce(state => ({
        //     ...state,
        //     fails: [...(state.fails || []), result],
        // }));
    };
};

const Fail = ({ fail }) => <li>{fail}</li>;

module.exports.buildReport = props => (
    <p>
        <ul>{props.fails.map(fail => <Fail fail={fail} />)}</ul>
        <p>{props.eslintErrors}</p>
    </p>
);
