import chalk from 'chalk'
import {exec} from 'child_process'
import {positive, error} from './utils'

const version = require('../package.json').version
// buildID is the first command line argument, if supplied
const buildID = process.argv.length >= 3 ? process.argv[2] : null
const appVersion = version // buildID ? `${version} (${buildID})` : version

console.log(`appVersion: ${appVersion}`)
console.log(chalk.green('Bundling react-native assets...'))

exec(
  'react-native bundle --platform ios --entry-file index.ios.js --dev false --bundle-output ./ios/main.jsbundle --sourcemap-output ./sourcemap.js',
  (err, stdout) => {
    console.log('RN bundle result:', positive(stdout), error(err))

    if (err) return

    // upload symbol files to bugsnag
    exec(
      `curl https://upload.bugsnag.com/ \
        -F apiKey=f108fb997359e5519815d5fc58c79ad3 \
        -F "appVersion=${appVersion}" \
        -F minifiedUrl=main.jsbundle \
        -F sourceMap=@./sourcemap.js \
        -F minifiedFile=@./ios/main.jsbundle \
        -F overwrite=true`,
      (err1, stdout1) => {
        console.log('Bugsnag deploy result:', positive(stdout1), error(err1))
      }
    )
  }
)
