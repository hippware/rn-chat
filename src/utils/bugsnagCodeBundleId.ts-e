// codeBundleId is filled in by codepush.sh
const codeBundleId = ''

const version = require('../../package.json').version

export default (platform: string): string =>
  codeBundleId.length > 0 ? codeBundleId : `${version}-${platform}`
