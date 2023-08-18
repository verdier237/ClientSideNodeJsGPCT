const { override, addWebpackResolve } = require('customize-cra');

module.exports = override(
    addWebpackResolve({
        fallback: {
            "buffer": require.resolve("buffer/"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
            "path": require.resolve("path-browserify"),
            // Ne pas inclure "process" ici
        },
    })
);
