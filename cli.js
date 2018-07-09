#!/usr/bin/env node
'use strict';

var ver = process.versions.node;
var majorVer = parseInt(ver.split('.')[0], 10);
var cli;

if (majorVer < 4) {
    throw new Error('Node version ' + ver + ' is not supported in Glow, please use Node.js 4.0 or higher.');
} else if (majorVer < 8) {
    cli = require('./dist/legacy/cli').default;
} else {
    cli = require('./dist/modern/cli').default;
}

cli(process.cwd(), process.argv.slice(2));
