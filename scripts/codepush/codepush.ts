/**
 * Usage: yarn codepush [deployment name] [description] ?[ios | android]
 * By default codepushes to Android and iOS
 */

import codepushSingle from './codepushSingle'

// tslint:disable:no-console

const [deployment, description, platform] = process.argv.slice(2)

// // console.log(deploymentName, description, platforms)
if (!(deployment && description)) {
  console.error('Try again. yarn codepush [deployment name] [description] ?[ios | android]')
  process.exit(1)
}

if (platform && !['android', 'ios'].includes(platform)) {
  console.error(
    'Bad platform argument. Valid values are "android" or "ios". Leave blank to codepush to both platforms.'
  )
  process.exit(1)
}

async function go() {
  if (platform === 'android' || !platform) {
    await codepushSingle(deployment, 'android', 'TinyrobotStaging', description)
  }

  if (platform === 'ios' || !platform) {
    await codepushSingle(deployment, 'ios', 'tinyrobot-2', description)
  }
}

go()
