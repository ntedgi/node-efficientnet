// babel.config.js
module.exports = {
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
    ],
    "env": {
        "test": {
            "presets": [["@babel/preset-env"], '@babel/preset-typescript']
        }
    },
    "plugins": ["@babel/proposal-class-properties"]
};
