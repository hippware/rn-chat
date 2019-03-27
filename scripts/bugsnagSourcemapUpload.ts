import {upload} from 'bugsnag-sourcemaps'

// tslint:disable:no-console

export default async (
  appVersion: string,
  codeBundleId: string | undefined,
  buildDirPath: string
) => {
  console.log('Beginning bugsnag sourcemap upload...')
  // https://github.com/bugsnag/bugsnag-sourcemaps#api-usage
  const result = await upload(
    {
      apiKey: 'f108fb997359e5519815d5fc58c79ad3',
      appVersion,
      codeBundleId,
      minifiedUrl: 'main.jsbundle',
      sourceMap: `${buildDirPath}/main.jsbundle.map`,
      minifiedFile: `${buildDirPath}/main.jsbundle`, // optional
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
