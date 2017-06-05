/*
1. Retrieve the current version # from package.json
2. bump the build number
3. Set the XCode version numbers to the new version
4. Set the Android version numbers to the new version
5. Set the package.json version number to the new version
*/

import fs from 'fs';
import {exec} from 'child_process';
import chalk from 'chalk';

const packagePath = '../package.json';
const packageInfo = require(packagePath);
const versionParts = packageInfo.version.split('.');
const buildInt = parseInt(versionParts[2]) + 1;
const newVersion = [versionParts[0], versionParts[1], buildInt].join('.');
const versionPropertiesPath = '../android/app/version.properties';

console.log(chalk.cyan.underline('\r\nVERSION INCREMENT'));

// use apple's agvtool to update info.plist version
exec('(cd ios && agvtool next-version -all)', (err, stdout, stderr) => {
  if (err) throw err;
  if (stderr) throw err;
});

exec(`(cd ios && agvtool new-marketing-version ${newVersion})`, (err, stdout, stderr) => {
  if (err) throw err;
  if (stderr) throw err;
  // writeAndroid(newVersion);
  writePackage(newVersion);
  console.log('Version successfully bumped to', newVersion);
});

// finds the versionName line of version.properties and updates value to the current version
function writeAndroid(version) {
  const filePath = `${__dirname}/${versionPropertiesPath}`;
  console.log(chalk.green('VERSION'), chalk.green(version));
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n|\r/).map(line => {
    if (!/\s*=\s*/i.test(line)) return line;
    const lineParts = line.split('=');
    if (lineParts[0] === 'versionName') {
      return [lineParts[0], `${version}`].join('=');
    }
    if (lineParts[0] === 'versionCode') {
      return [lineParts[0], parseInt(lineParts[1]) + 1].join('=');
    }
    return line;
  });

  fs.writeFileSync(filePath, lines.join('\n'));
}

// updates package.json to the current version
function writePackage(version) {
  packageInfo.version = version;
  fs.writeFileSync(`${__dirname}/${packagePath}`, JSON.stringify(packageInfo, null, 2));
}
