import {exec} from 'child_process'
import {positive, error} from './utils'
import bugsnagSourcemapUpload, {BUNDLE_NAME, BUNDLE_MAP_NAME} from './bugsnagSourcemapUpload'

// tslint:disable:no-console

const appVersion = require('../package.json').version
const buildId = process.argv.length >= 3 && process.argv[2]

async function send() {
  console.log(`appVersion: ${appVersion}`)

  await bundleAndSend('ios')
  await bundleAndSend('android')
}

send()

// ------------------------------------------------------------------

async function bundleAndSend(platform: 'ios' | 'android') {
  return new Promise((resolve, reject) => {
    const buildDirPath = './' + platform
    console.log(`Bundling ${platform}...`)
    exec(
      `react-native bundle --platform ${platform} --entry-file index.js --dev false --bundle-output ./${buildDirPath}/${BUNDLE_NAME} --sourcemap-output ${buildDirPath}/${BUNDLE_MAP_NAME}`,
      async (err, stdout) => {
        console.log('RN bundle result:', positive(stdout), error(err))

        if (err) {
          reject(err)
        }

        await bugsnagSourcemapUpload({
          appVersion,
          codeBundleId: appVersion + platform + buildId,
          buildDirPath,
        })
        resolve()
      }
    )
  })
}
