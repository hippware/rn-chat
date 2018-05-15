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
});
