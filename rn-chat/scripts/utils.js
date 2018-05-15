import chalk from 'chalk';

export function error(str) {
  if (str != null) return chalk.red(str);
  else return '';
}

export function positive(str) {
  if (str !== null) return chalk.green(str);
  else return '';
}
