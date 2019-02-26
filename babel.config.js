/**
 * https://babeljs.io/docs/en/plugins#plugin-ordering
 *
 * Plugin Ordering
 * 1. Plugins run before Presets.
 * 2. Plugin ordering is first to last.
 * 3. Preset ordering is reversed (last to first).
 */

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.tsx', '.ios.js', '.android.js'],
      },
    ],
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
  ],
  presets: ['module:metro-react-native-babel-preset'],
}
