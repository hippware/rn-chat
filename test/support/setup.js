process.env.NODE_ENV = 'test';
global.DOMParser = require('xmldom').DOMParser;

global.window = global;
global.XMLHttpRequest = require('./xmlhttprequest').XMLHttpRequest;
// global.XMLHttpRequest = require('xhr2');
global.WebSocket = require('websocket').w3cwebsocket;
global.fetch = require('node-fetch');
global.Promise = require('promise');
global.FormData = require('form-data');
global.fs = require('fs');

global.fs.unlink = fs.unlinkSync;
global.tempDir = require('os').tmpdir();

global.downloadHttpFile = async function (urlString, fileName, headers) {
  const URL = require('url');
  const http = require('http');
  const url = URL.parse(urlString);

  return new Promise((resolve, reject) => {
    const request = http
      .get(
        {
          host: url.hostname,
          port: url.port,
          path: url.path,
          headers,
        },
        response => {
          console.log('RESPONSE:', response.statusCode);
          if (response.statusCode !== 200) {
            reject(`Invalid status code ${response.statusCode}`);
            return;
          }
          const file = fs.createWriteStream(fileName);
          response.pipe(file);
          file.on('finish', () => {
            console.log('FINISHED');
            file.close(resolve(fileName)); // close() is async, call cb after close completes.
          });
        },
      )
      .on('error', err => {
        // Handle errors
        reject(err.message);
      });
  });
};
var denodeify = require('denodeify');

global.readFile = denodeify(fs.readFile);
global.writeFile = denodeify(fs.writeFile);
global.mkdir = denodeify(fs.mkdir);
global.fileExists = async function (filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (error, stat) => {
      if (error) {
        resolve(false);
      } else {
        console.log('CACHED:', filePath);
        resolve(true);
      }
    });
  });
};
global.getImageSize = uri => new Promise((resolve, reject) => resolve({}));

global.__DEV__ = true;
