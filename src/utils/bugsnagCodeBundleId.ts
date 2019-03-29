const version = require('../../package.json').version

export default (platform: string): string => `${version}-${platform}`
