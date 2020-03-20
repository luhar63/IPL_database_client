const path = require('path');

/**
 * Determine the array of extensions that should be used to resolve modules.
 */
module.exports = {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
        Containers: path.resolve(__dirname, 'src/containers'),
        Components: path.resolve(__dirname, 'src/components'),
        Constants: path.resolve(__dirname, 'src/constants'),
        'react-dom': '@hot-loader/react-dom'
    }
};
