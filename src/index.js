function checkCommand(command) {}

let state = {};

function reduce(reducer) {
    state = reducer(state);
}

const saveToKey = (key, data) => {
    reduce(state => ({
        ...state,
        [key]: [...(state[key] || []), data],
    }));
};

const message = data => saveToKey('messages', data);
const warn = data => saveToKey('warnings', data);
const fail = data => saveToKey('fails', data);

const getState = () => state;

module.exports = {
    checkCommand,
    reduce,
    saveToKey,
    message,
    warn,
    fail,
    getState,
};
