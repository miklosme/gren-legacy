export function borderText(text) {
    const middle = `** ${text} **`;
    const border = '*'.repeat(middle.length);
    return `${border}\n${middle}\n${border}`;
}

export function secondsSince(start) {
    return Math.floor((Date.now() - start) / 10) / 100;
}

export function reflect(promise) {
    return promise.then(value => ({ value, status: 'resolved' }), error => ({ error, status: 'rejected' }));
}
