const path = require('path');
module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier', 'prettier/react'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        'import/resolver': {
            'babel-module': {
                alias: {
                    Containers: './src/containers',
                    Components: './src/components',
                    Constants: './src/constants',
                    Assets: './src/assets'
                }
            }
        }
    },
    env: {
        browser: true,
        node: true,
        mocha: true,
        es6: true,
        jest: true
    },
    rules: {
        indent: ['error', 4],
        'space-before-function-paren': 'off',
        'react/prefer-stateless-function': 'warn',
        'react/jsx-one-expression-per-line': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true }
        ],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'linebreak-style': 'off',
        'global-require': 'off',
        semi: 'warn',
        'arrow-body-style': 'off',
        'no-multiple-empty-lines': ['warn', { max: 1 }],
        'no-unused-expressions': [
            'error',
            {
                allowTaggedTemplates: true
            }
        ],
        'no-underscore-dangle': [2, { allow: ['__REDUX_DEVTOOLS_EXTENSION__'] }]
    }
};
