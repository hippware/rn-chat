// @flow

import {exec} from 'child_process';
import chalk from 'chalk';
import readlineSync from 'readline-sync';
import codePushDeployments from '../src/constants/codepush-deployments';

const main = async () => {
    try {
        // await bumpVersion();
        const options = collectArgs();
        console.log('options', options);
        await pushIt(options);
        // console.log(codePushDeployments);
        console.log(chalk.green('Success!'));
    } catch (err) {
        const errMessage = typeof err === 'object' ? JSON.stringify(err) : err;
        console.log(chalk.red(errMessage));
        process.exit(1);
    }
};

const collectArgs = (): Object => {
    let targetBinary = '', description = '', isMandatory = false;

    const deployments = [codePushDeployments.Staging.name, codePushDeployments.StagingBeta.name];
    const targetIndex = readlineSync.keyInSelect(deployments, chalk.cyan('Which deployment?'), {cancel: false});
    const deployment = deployments[targetIndex];

    targetBinary = readlineSync.question(chalk.cyan('Target binary version? '));

    while (!description) {
        description = readlineSync.question(chalk.cyan('Describe the changes. '));
    }

    isMandatory = readlineSync.keyInYN(chalk.cyan('Is this a mandatory update?'));

    return {deployment, targetBinary, description, isMandatory};
};

const bumpVersion = async () => {
    if (readlineSync.keyInYN(chalk.cyan('Bump version?'))) {
        const output = await new Promise((resolve, reject) => {
            const cmdBump = 'npm run version:bump && npm run version:tag && npm run version:push';
            console.log(cmdBump);
            exec(cmdBump, (err, stdout, stderr) => {
                if (err) reject(err);
                resolve(stdout);
            });
        });
        console.log(output);
    }
};

const pushIt = async options => {
    await runVariant('ios', options);
    // await runVariant('android', options);
};

const runVariant = async (variant, {targetBinary, deployment, description, isMandatory}) => {
    console.log(chalk.green('Codepush', variant));
    const mando = isMandatory ? '-m' : '';
    const cmdPush = `code-push release-react tinyrobot ${variant} -d ${deployment} -t "${targetBinary}" ${mando} --des '${description}'`;
    console.log('The command:', cmdPush);

    // const output = await new Promise((resolve, reject) => {
    //     exec(cmdPush, (err, stdout, stderr) => {
    //         if (err) reject(err);
    //         resolve(stdout);
    //     });
    // });

    // console.log(output);
};

main();
