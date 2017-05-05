import chalk from 'chalk';
import {exec, execSync} from 'child_process';
import utils from './utils';
import assert from 'assert';

const packagePath = '../package.json';
const packageInfo = require(packagePath);
const version = packageInfo.version;
const versionTag = `v${version}`;
const targetEnv = process.env.TARGET_ENV;

console.log(chalk.cyan.underline('\r\n## VERSION DEPLOY'));

// @TODO: validation (version numbers, tag naming scheme, etc)

// ensure versionTag looks correct and exists in git tags
assert(versionTag[0] === 'v', chalk.red(`invalid versionTag ${versionTag}, expected first char to be v`));
assert(Number.isInteger(parseInt(versionTag[1])), chalk.red(`invalid versionTag ${versionTag}, expected second char to be integer`));
assert(versionTag.split('.').length === 3, chalk.red(`invalid versionTag ${versionTag}, expected three segments`));
try {
    let hasTag = execSync(`git show-ref --tags | grep "refs/tags/${versionTag}"`).toString();
    assert(!!hasTag === true, chalk.red(`versionTag ${versionTag} not found in git tags`));
} catch (err) {
    chalk.red('error checking for version tag', err);
}

let latestTag = execSync('git describe --abbrev=0 --tags').toString().trim();

if (latestTag != versionTag) {
    console.log(
        chalk.yellow(`WARNING: promoting a version that does not match the latest known git tagged version. Latest: ${latestTag}. Version: ${versionTag}`)
    );
}

const nevercodeDeployUrl =
    'https://app.nevercode.io/api/projects/2e4be066-0061-4c95-84ed-1e8ee2de554d/build?token=c88383cd616303c448b846665bc1fb0a&branch=master';

exec(`curl -X POST ${nevercodeDeployUrl}`, function (err, stdout, stderr) {
    console.log('deploy iOS result:', chalk.green(stdout), utils.error(err), stderr);
});
