// config-overrides.js
const webpack = require('webpack');

module.exports = function override(config, env) {

  const envKeys = Object.keys(process.env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});

  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin(envKeys),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);

  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify"),
    "child_process": false,
    "os": require.resolve("os-browserify/browser"),
    "fs": require.resolve("browserify-fs"),
    "stream": require.resolve("stream-browserify")
  };

  console.log('Webpack plugins:', config.plugins);

  return config;
};