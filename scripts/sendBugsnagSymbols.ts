import chalk from 'chalk'
import {exec} from 'child_process'
import {positive, error} from './utils'
import bugsnagSourcemapUpload, {BUNDLE_NAME, BUNDLE_MAP_NAME} from './bugsnagSourcemapUpload'

// tslint:disable:no-console

const appVersion = require('../package.json').version
const codeBundleId = process.argv.length >= 3 && process.argv[2]

async function send() {
  console.log(`appVersion: ${appVersion}`)
  console.log(chalk.green('Bundling react-native assets...'))

  await bundleAndSend('ios')
  await bundleAndSend('android')
}

send()

// ------------------------------------------------------------------

async function bundleAndSend(platform: 'ios' | 'android') {
  return new Promise((resolve, reject) => {
    const buildDirPath = './' + platform
    exec(
      `react-native bundle --platform ${platform} --entry-file index.js --dev false --bundle-output ./${buildDirPath}/${BUNDLE_NAME} --sourcemap-output ${buildDirPath}/${BUNDLE_MAP_NAME}`,
      async (err, stdout) => {
        console.log('RN bundle result:', positive(stdout), error(err))

        if (err) {
          reject(err)
        }

        await bugsnagSourcemapUpload({appVersion, codeBundleId, buildDirPath})
        resolve()

        // // upload symbol files to bugsnag
        // exec(
        //   `curl https://upload.bugsnag.com/ \
        //     -F apiKey=f108fb997359e5519815d5fc58c79ad3 \
        //     -F "appVersion=${appVersion}" \
        //     -F minifiedUrl=main.jsbundle \
        //     -F sourceMap=@./sourcemap.js \
        //     -F minifiedFile=@./ios/main.jsbundle \
        //     -F overwrite=true`,
        //   (err1, stdout1) => {
        //     console.log('Bugsnag deploy result:', positive(stdout1), error(err1))
        //   }
        // )
      }
    )
  })
}
