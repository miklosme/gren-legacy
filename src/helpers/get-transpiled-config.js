import path from 'path';
import { transformFile } from '@babel/core';
import requireFromString from 'require-from-string';

const configFile = path.resolve(__dirname, '../../../babel.config.js');

export default function getTranspiledConfig(configPath) {
    return new Promise((resolve, reject) => {
        transformFile(configPath, { configFile }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(requireFromString(result.code, { prependPaths: [process.cwd()] }));
            }
        });
    });
}
