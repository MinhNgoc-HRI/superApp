module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  comments: true,
  plugins: [
    [
      'module-resolver',
      {
        root: ['.src'],
        alias: {
          '@src': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
