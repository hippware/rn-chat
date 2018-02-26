import chalk from 'chalk';
import {exec} from 'child_process';
import {positive, error} from './utils';

const packageInfo = require('../package.json');

const {version} = packageInfo;

console.log(chalk.cyan.underline('\r\nDEPLOY STAGE\r\n'));

const nevercodeDeployUrl = 'https://app.nevercode.io/api/projects/2e4be066-0061-4c95-84ed-1e8ee2de554d/build?token=c88383cd616303c448b846665bc1fb0a&branch=deploy-stage';

// kick off the Nevercode deploy
exec(`curl -X POST ${nevercodeDeployUrl}`, (err, stdout) => {
  console.log('Deploy stage result:', positive(stdout), error(err));

  if (err) return;

  // kick off the Nevercode deploy
  exec('react-native bundle --platform ios --entry-file index.ios.js --dev false --bundle-output ./ios/main.jsbundle --sourcemap-output ./sourcemap.js', (err, stdout) => {
    console.log('RN build result:', positive(stdout), error(err));

    if (err) return;

    // upload symbol files to bugsnag
    exec(
      `curl https://upload.bugsnag.com/ \
          -F apiKey=f108fb997359e5519815d5fc58c79ad3 \
          -F appVersion=${version} \
          -F minifiedUrl="main.jsbundle" \
          -F sourceMap=@./sourcemap.js \
          -F minifiedFile=@./ios/main.jsbundle \
          -F overwrite=true`,
      (err, stdout) => {
        console.log('Bugsnag deploy result:', positive(stdout), error(err));
      },
    );
  });
});
