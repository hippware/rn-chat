// @flow

import {when} from 'mobx';

export const timeoutPromise = (ms: number, promise: Promise<any>): Promise<any> => {
  console.log('timeoutPromise', ms, promise);
  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise((resolve, reject) => {
    try {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject(`Timed out in ${ms}ms.`);
      }, ms);
    } catch (err) {
      console.warn('timeoutPromise error', err);
      throw err;
    }
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout]);
};

export const timeoutWhen = async (predicate: Function, ms: number, identifier: string): Promise<any> => {
  try {
    // return timeoutPromise(ms, new Promise(resolve => when(predicate, () => resolve(true))));
    await timeoutPromise(ms, new Promise(resolve => when(predicate, () => resolve(true))));
    return true;
  } catch (err) {
    const message = `When timeout: ${identifier}`;
    console.log(message);
    throw new Error(message);
  }
};
