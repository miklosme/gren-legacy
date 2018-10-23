module.exports = {
    env: {
        legacy: {
            presets: [
                [
                    '@babel/env',
                    {
                        loose: true,
                        targets: {
                            node: 4,
                        },
                    },
                ],
                '@babel/react',
            ],
            plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                ['@babel/transform-runtime', { corejs: 2 }],
            ],
        },
        modern: {
            presets: [
                [
                    '@babel/env',
                    {
                        loose: true,
                        targets: {
                            node: 8,
                        },
                    },
                ],
                '@babel/react',
            ],
            plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                ['@babel/transform-runtime', { corejs: 2 }],
            ],
        },
    },
};
