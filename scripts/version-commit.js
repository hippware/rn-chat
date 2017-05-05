import {exec} from 'child_process';
import chalk from 'chalk';
import utils from './utils';

const packagePath = '../package.json';
const packageInfo = require(packagePath);
const version = packageInfo.version;

console.log(chalk.cyan.underline('\r\n## VERSION COMMIT'));

exec(`git commit -m "[release] v${version}"`, (err, stdout, stderr) => {
    console.log('git result:', utils.positive(stdout), utils.error(err), utils.error(stderr));
});
