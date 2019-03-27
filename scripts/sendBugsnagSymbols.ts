import {exec} from 'child_process'
import {positive, error} from './utils'
import bugsnagSourcemapUpload from './bugsnagSourcemapUpload'

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
    const bundleName = 'main.jsbundle'
    console.log(`Bundling ${platform}...`)
    exec(
      `react-native bundle --platform ${platform} --entry-file index.js --dev false --bundle-output ./${buildDirPath}/${bundleName} --sourcemap-output ${buildDirPath}/${bundleName}.map`,
      async (err, stdout) => {
        console.log('RN bundle result:', positive(stdout), error(err))

        if (err) {
          reject(err)
        }

        await bugsnagSourcemapUpload({
          appVersion,
          codeBundleId: appVersion + platform + buildId,
          buildDirPath,
          bundleName,
        })
        resolve()
      }
    )
  })
}
