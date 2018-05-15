import chalk from 'chalk';
import {exec, execSync} from 'child_process';
import {positive, error} from './utils';
import assert from 'assert';

const packageInfo = require('../package.json');

const {version} = packageInfo;
const versionTag = `iphone-${version}`;
const targetEnv = process.env.TARGET_ENV;

console.log(chalk.cyan.underline('\r\nVERSION PROMOTE'));

assert(['stage', 'prod'].indexOf(targetEnv) !== -1, chalk.red(`invalid TARGET_ENV: ${targetEnv}`));

try {
  const hasTag = execSync(`git show-ref --tags | grep "refs/tags/${versionTag}"`).toString();
  assert(!!hasTag === true, chalk.red(`versionTag ${versionTag} not found in git tags`));
} catch (err) {
  chalk.red('error checking for version tag', err);
}

const latestTag = execSync('git describe --abbrev=0 --tags')
  .toString()
  .trim();

if (latestTag !== versionTag) {
  console.log(chalk.yellow(`WARNING: promoting a version that does not match the latest known git tagged version. Latest: ${latestTag}. Version: ${versionTag}`));
}

const nevercodeDeployUrl = 'https://app.nevercode.io/api/projects/2e4be066-0061-4c95-84ed-1e8ee2de554d/build?token=c88383cd616303c448b846665bc1fb0a&branch=deploy-stage';

exec(`curl -X POST ${nevercodeDeployUrl}`, (err, stdout) => {
  console.log('deploy iOS result:', positive(stdout), error(err));
});
