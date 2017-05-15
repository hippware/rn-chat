import {exec} from 'child_process';
import chalk from 'chalk';
import utils from './utils';

const packagePath = '../package.json';
const packageInfo = require(packagePath);
const version = packageInfo.version;

console.log(chalk.cyan.underline('\r\n## VERSION TAG'));

exec(`git tag -a v${version} -m "auto release"`, (err, stdout, stderr) => {
    console.log('git result:', utils.positive(stdout), utils.error(err), utils.error(stderr));
});
