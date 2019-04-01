import {upload} from 'bugsnag-sourcemaps'

// tslint:disable:no-console

type Params = {
  appVersion: string
  codeBundleId?: string
  buildDirPath: string
  bundleName: string
}

export default async ({appVersion, codeBundleId, buildDirPath, bundleName}: Params) => {
  console.log('Beginning bugsnag sourcemap upload...')
  // https://github.com/bugsnag/bugsnag-sourcemaps#api-usage
  const result = await upload(
    {
      apiKey: 'f108fb997359e5519815d5fc58c79ad3',
      appVersion,
      codeBundleId,
      minifiedUrl: 'main.jsbundle',
      sourceMap: `${buildDirPath}/${bundleName}.map`,
      minifiedFile: `${buildDirPath}/${bundleName}`, // optional
      // overwrite: true, // optional
      // sources: {
      //   'http://example.com/assets/main.js': path.resolve(__dirname, 'path/to/main.js'),
      //   'http://example.com/assets/utils.js': path.resolve(__dirname, 'path/to/utils.js'),
      // },
    },
    err => {
      if (err) {
        throw new Error('Something went wrong! ' + err.message)
      }
    }
  )
  console.log('Bugsnag sourcemap uploaded successfully.', result)
}