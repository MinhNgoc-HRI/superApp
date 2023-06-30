module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  comments: true,
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.src'],
        alias: {
          '@src': './src',
        },
      },
    ],
  ],
};
