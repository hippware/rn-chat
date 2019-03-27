/**
 * Usage: yarn codepush [deployment name] [description] [ios | android | both] [bugsnag unique id]
 */

import codepushSingle from './codepushSingle'

// tslint:disable:no-console

const [deployment, description, platforms] = process.argv.slice(2)

// // console.log(deploymentName, description, platforms)
if (!(deployment && description && platforms)) {
  console.error(
    'Try again. yarn codepush [deployment name] [description] [ios | android | both] [bugsnag unique id]'
  )
  process.exit(1)
}

if (!['android', 'ios', 'both'].includes(platforms)) {
  console.error('Bad platform argument. Valid values are "android", "ios", or "both')
  process.exit(1)
}

async function go() {
  if (platforms === 'android' || platforms === 'both') {
    await codepushSingle(deployment, 'android', 'TinyrobotStaging', description)
  }

  if (platforms === 'ios' || platforms === 'both') {
    await codepushSingle(deployment, 'ios', 'tinyrobot-2', description)
  }
}

go()
