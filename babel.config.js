module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-transform-export-namespace-from',
      [
        'react-native-reanimated/plugin',
        {
          globals: ['__reanimatedWorkletInit', '__reanimatedWorkletRuntime'],
          relativeSourceLocation: true,
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};