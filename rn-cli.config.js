const blacklist = require('metro').createBlacklist
module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer')
  },
  getSourceExts() {
    return ['ts', 'tsx']
  },
  getBlacklistRE() {
    return blacklist([/third-party\/wocky-client\/node_modules\/.*/])
  },
}
