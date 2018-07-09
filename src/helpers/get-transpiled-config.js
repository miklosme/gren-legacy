import * as babel from '@babel/core';
import requireFromString from 'require-from-string';

export default function getTranspiledConfig(path) {
    return new Promise((resolve, reject) => {
        babel.transformFile(path, { envName: 'legacy' }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(requireFromString(result.code));
            }
        });
    });
}
