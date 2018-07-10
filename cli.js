#!/usr/bin/env node
'use strict';

var ver = process.versions.node;
var majorVer = parseInt(ver.split('.')[0], 10);
var cli;

if (majorVer < 4) {
    throw new Error('Node version ' + ver + ' is not supported in Gren, please use Node.js 4.0 or higher.');
} else if (majorVer < 8) {
    process.env.BABEL_ENV = 'legacy';
    cli = require('./dist/legacy/main').default;
} else {
    process.env.BABEL_ENV = 'modern';
    cli = require('./dist/modern/main').default;
}

cli(process.cwd(), process.argv.slice(2));
