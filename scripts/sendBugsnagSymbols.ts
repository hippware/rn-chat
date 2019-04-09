import {exec} from 'child_process'
import {env} from 'process'
import {positive, error} from './utils'
import bugsnagSourcemapUpload from './bugsnagSourcemapUpload'
import getCodeBundleId from '../src/utils/bugsnagCodeBundleId'

// tslint:disable:no-console

const appVersion = require('../package.json').version

async function send() {
  console.log(`appVersion: ${appVersion}`)

  if (env.APPCENTER_XCODE_SCHEME) await bundleAndSend('ios')
  if (env.APPCENTER_ANDROID_VARIANT) await bundleAndSend('android')
}

send()

// ------------------------------------------------------------------

async function bundleAndSend(platform: 'ios' | 'android') {
  return new Promise((resolve, reject) => {
    const buildDirPath = './' + platform
    const bundleName = platform === 'ios' ? 'main.jsbundle' : 'index.android.bundle'
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
          codeBundleId: getCodeBundleId(platform),
          buildDirPath,
          bundleName,
        })
        resolve()
      }
    )
  })
}
