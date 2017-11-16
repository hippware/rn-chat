import {exec} from 'child_process';
import chalk from 'chalk';
import {positive, error} from './utils';

const packageInfo = require('../package.json');

const version = packageInfo.version;

console.log(chalk.cyan.underline('\r\nVERSION TAG'));

exec(`git tag -a iphone-${version} -m "auto release"`, (err, stdout) => {
  console.log(positive(stdout), error(err));
});
