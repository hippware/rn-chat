// @flow

import {spawn} from 'child_process';
import chalk from 'chalk';
import readlineSync from 'readline-sync';
import codePushDeployments from '../src/constants/codepush-deployments';

const main = async () => {
  try {
    const options = collectOptions();
    await pushIt(options);
    console.log(chalk.green('Success!'));
  } catch (err) {
    const errMessage = typeof err === 'object' ? JSON.stringify(err) : err;
    console.log(chalk.red(errMessage));
    process.exit(1);
  }
};

const collectOptions = (): Object => {
  let targetBinary = '',
    description = '',
    isMandatory = false;
  const deployments = codePushDeployments.staging.map(d => d.name);
  const targetIndex = readlineSync.keyInSelect(deployments, chalk.cyan('Which deployment?'), {cancel: false});
  const deployment = deployments[targetIndex];
  // targetBinary = readlineSync.question(chalk.cyan('Target binary version? '));
  description = readlineSync.question(chalk.cyan('Describe the changes. '));
  // isMandatory = readlineSync.keyInYN(chalk.cyan('Mandatory update?'));
  return {deployment, targetBinary, description, isMandatory};
};

// NOTE: currently the AppCenter CLI doesn't seem to be honoring the --targetBinaryVersion and just uses the version in Info.plist
const pushIt = async ({targetBinary, deployment, description, isMandatory}) => {
  const cmd = [
    'codepush',
    'release-react',
    // '-a',
    // 'southerneer/tinyrobot',
    '-d',
    deployment,
    // '--target-binary-version',
    // targetBinary,
    '--description',
    `"${description}"`,
    // '-m',
    // isMandatory.toString(),
  ];
  console.log(chalk.green(`appcenter ${cmd.join(' ')}`));

  await new Promise((resolve, reject) => {
    const cp = spawn('appcenter', cmd);
    cp.stdout.on('data', data => console.log(data.toString()));
    cp.stderr.on('data', data => console.log(chalk.red(data.toString())));
    cp.on('error', (err) => {
      console.log(chalk.red('Bad command.', err));
    });
    cp.on('exit', (code) => {
      if (code === 0) resolve(code);
      else reject(code);
    });
  });
};

main();
