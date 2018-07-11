const shuffle = require('lodash.shuffle');

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

export const yeah = (() => {
    let index = 0;
    const happyEmojis = shuffle([
        ':smirk:',
        ':blush:',
        ':relieved:',
        ':relaxed:',
        ':yum:',
        ':sunglasses:',
        ':+1:',
        ':ok_hand:',
        ':clap:',
        ':muscle:',
        ':smile_cat:',
        ':tada:',
        ':beers:',
        ':rocket:',
        ':white_check_mark:',
        ':heavy_check_mark:',
        ':ballot_box_with_check:',
        ':100:',
        ':star:',
        ':pineapple:',
    ]);
    return () => {
        index = (index + 1) % happyEmojis.length;
        return happyEmojis[index];
    };
})();
