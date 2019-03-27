import {exec} from 'child_process'
import bugsnagSourcemapUpload, {BUNDLE_MAP_NAME, BUNDLE_NAME} from '../bugsnagSourcemapUpload'

// tslint:disable:no-console

const buildDir = './cpbuild'

export default async (
  deployment: string,
  platform: 'android' | 'ios',
  appCenterAppName: string,
  description: string
) => {
  // RELEASE_ID=${DEPLOYMENT_NAME}_`date +"%Y-%m-%d_%H-%M-%S_%z"`
  const releaseId = `${deployment}-${platform}-${Date.now().toString()}`
  console.log('release id:', releaseId)

  const version = require('../../package.json').version
  console.log('version:', version)

  try {
    await injectBugsnagReleaseId(releaseId)
    await codepush(appCenterAppName, deployment, description, version)
    await bugsnagSourcemapUpload({
      appVersion: version,
      codeBundleId: releaseId,
      buildDirPath: `${buildDir}/CodePush`,
    })
    await cleanup()
  } catch (err) {
    console.log('Error:', err)
  }
}

// Insert release identifier into the Bugsnag configuration
async function injectBugsnagReleaseId(releaseId: string) {
  return new Promise((resolve, reject) => {
    exec(
      `sed -e "2s/.*/const codeBundleId = '${releaseId}'/" -i '' src/utils/bugsnagConfig.js`,
      (error, stdout) => {
        if (error) reject(error)
        // console.log('Bugsnag inject result:', positive(stdout))
        resolve()
      }
    )
  })
}

async function codepush(
  appCenterAppName,
  deployment: string,
  description: string,
  version: string
) {
  return new Promise((resolve, reject) => {
    const command = `./node_modules/.bin/appcenter codepush release-react -a hippware/${appCenterAppName} -d ${deployment} --description "${description}" --output-dir ${buildDir} --sourcemap-output ${buildDir}/CodePush/${BUNDLE_MAP_NAME} -t ${version} --bundle-name ${BUNDLE_NAME}`
    console.log(command)
    exec(command, (error, stdout) => {
      if (error) reject(error)
      console.log('Codepush result:', stdout)
      resolve()
      // console.log('Bugsnag inject result:', positive(stdout1), error(err1))
    })
  })
}

async function cleanup() {
  return new Promise((resolve, reject) => {
    console.log(
      'Cleanup. Remove the codepush generated files and discard the change to bugsnagConfig.js'
    )
    const removeFileCmd = `rm -rf ${buildDir}`
    const discardBugsnagChangesCmd = 'git checkout -- src/utils/bugsnagConfig.js'
    console.log(removeFileCmd)
    exec(removeFileCmd, (error, stdout) => {
      if (error) reject(error)
      console.log(discardBugsnagChangesCmd)
      exec(discardBugsnagChangesCmd, (error2, stdout2) => {
        if (error2) reject(error2)
        resolve()
      })
    })
  })
}
