/**
 * Bump native version #s based on package.json version
 *
 * Usage: `yarn versionBump [minor | major]`
 */

import fs from 'fs'
import {exec} from 'child_process'
import chalk from 'chalk'
import console = require('console')

//  tslint:disable:no-console

// default to micro version #
let indexToBump = 2

switch (process.argv[2]) {
  case 'minor':
    indexToBump = 1
    break
  case 'major':
    indexToBump = 0
    break
  case undefined:
    break
  default:
    throw new Error('only "major" or "minor" are valid options')
}

// 1. Retrieve the current version # from package.json
const packageInfo = require('../package.json')

// 2. bump the build number
const versionParts: string[] = packageInfo.version.split('.')
const newVersion = versionParts
  .map((p, index) => (index === indexToBump ? parseInt(p) + 1 : index > indexToBump ? 0 : p))
  .join('.')

writeToFiles()

// ------------------------------------------------------------

async function writeToFiles() {
  console.log(chalk.cyan.underline('\r\nBUMP VERSION'))

  // 3. Set the XCode version number to the new version
  await writeIOS()

  // 4. Set the Android version numbers to the new version
  writeAndroid(newVersion)

  // 5. Set the package.json version number to the new version
  writePackage(newVersion)
  console.log('Version successfully bumped to', newVersion)
}

async function writeIOS() {
  return new Promise((resolve, reject) => {
    // NOTE: AppCenter does this piece automatically
    // exec('(cd ios && agvtool next-version -all)', (err, stdout, stderr) => {
    //   if (err) throw err;
    //   if (stderr) throw err;
    // });

    exec(`(cd ios && agvtool new-marketing-version ${newVersion})`, (err, _0, stderr) => {
      if (err) reject(err)
      if (stderr) reject(err)
      resolve()
    })
  })
}

// finds the versionName line of version.properties and updates value to the current version
function writeAndroid(version) {
  const filePath = `${__dirname}/../android/app/version.properties`
  const lines = fs
    .readFileSync(filePath, 'utf8')
    .split(/\r?\n|\r/)
    .map(line => {
      if (!/\s*=\s*/i.test(line)) return line
      const lineParts = line.split('=')
      if (lineParts[0] === 'VERSION_NAME') {
        return [lineParts[0], `${version}`].join('=')
      }
      // if (lineParts[0] === 'versionCode') {
      //   return [lineParts[0], parseInt(lineParts[1]) + 1].join('=');
      // }
      return line
    })

  fs.writeFileSync(filePath, lines.join('\n'))
}

// updates package.json to the current version
function writePackage(version) {
  packageInfo.version = version
  fs.writeFileSync(`${__dirname}/../package.json`, JSON.stringify(packageInfo, null, 2))
}
