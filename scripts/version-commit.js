import {exec} from 'child_process';
import chalk from 'chalk';
import {positive, error} from './utils';

const packageInfo = require('../package.json');

const version = packageInfo.version;

console.log(chalk.cyan.underline('\r\nVERSION COMMIT'));

exec(`git commit -m "[release] iphone-${version}"`, (err, stdout, stderr) => {
  console.log('git result:', positive(stdout), error(err), error(stderr));
});
