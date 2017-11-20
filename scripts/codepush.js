// @flow

import {spawn} from 'child_process';
import chalk from 'chalk';
import readlineSync from 'readline-sync';
import codePushDeployments from '../src/constants/codepush-deployments';

const main = async () => {
  try {
    // await bumpVersion();
    const options = collectOptions();
    await pushIt(options);
    console.log(chalk.green('Success!'));
  } catch (err) {
    const errMessage = typeof err === 'object' ? JSON.stringify(err) : err;
    console.log(chalk.red(errMessage));
    process.exit(1);
  }
};

// const bumpVersion = async () => {
//     if (readlineSync.keyInYN(chalk.cyan('Bump version?'))) {
//         const output = await new Promise((resolve, reject) => {
//             const cmdBump = 'npm run version:bump && npm run version:tag && npm run version:push';
//             console.log(cmdBump);
//             exec(cmdBump, (err, stdout, stderr) => {
//                 if (err) reject(err);
//                 resolve(stdout);
//             });
//         });
//         console.log(output);
//     }
// };

const collectOptions = (): Object => {
  let targetBinary = '',
    description = '',
    isMandatory = false;
  const deployments = codePushDeployments.staging.map(d => d.name);
  const targetIndex = readlineSync.keyInSelect(deployments, chalk.cyan('Which deployment?'), {cancel: false});
  const deployment = deployments[targetIndex];

  targetBinary = readlineSync.question(chalk.cyan('Target binary version? '));

  while (!description) {
    description = readlineSync.question(chalk.cyan('Describe the changes. '));
  }

  isMandatory = readlineSync.keyInYN(chalk.cyan('Mandatory update?'));

  return {deployment, targetBinary, description, isMandatory};
};

const pushIt = async (options) => {
  await runVariant('ios', options);
  // await runVariant('android', options);
};

const runVariant = async (variant, {targetBinary, deployment, description, isMandatory}) => {
  const cmdPush = `code-push release-react 'southerneer/tinyrobot' ${variant} -d ${deployment} -t ${targetBinary} -m ${isMandatory} --des "${description}"`;
  console.log(chalk.green(cmdPush));

  await new Promise((resolve, reject) => {
    const cp = spawn('code-push', ['release-react', 'tinyrobot', variant, '-d', deployment, '-t', targetBinary, '--des', `"${description}"`, '-m', isMandatory.toString()]);
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
