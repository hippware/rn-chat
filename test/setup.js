process.env.NODE_ENV = 'test';
global.DOMParser = require("xmldom").DOMParser;
global.window = global;
global.XMLHttpRequest = require("./support/xmlhttprequest").XMLHttpRequest;
//global.XMLHttpRequest = require('xhr2');
global.WebSocket = require('websocket').w3cwebsocket;
global.fetch = require('node-fetch');
global.Promise = require('promise');
global.FormData = require('form-data');
global.fs = require('fs');
global.tempDir = require('os').tmpdir();
global.downloadHttpFile = async function (urlString, fileName, headers){
        const URL = require("url");
        const http = require("http");
        const url = URL.parse(urlString);

        return new Promise((resolve, reject)=> {
            const request = http.get({
                host: url.hostname,
                port: url.port,
                path: url.path,
                headers
            }, function (response) {
                console.log("RESPONSE:", response.statusCode);
                if (response.statusCode !== 200){
                  reject(`Invalid status code ${response.statusCode}`);
                  return;
                }
                const file = fs.createWriteStream(fileName);
                response.pipe(file);
                file.on('finish', function () {
                    file.close(resolve(fileName));  // close() is async, call cb after close completes.
                });
            }).on('error', function (err) { // Handle errors
                reject(err.message);
            });
        });
};
var denodeify = require('denodeify');
global.readFile = denodeify(fs.readFile);
global.writeFile = denodeify(fs.writeFile);
global.mkdir = denodeify(fs.mkdir);
global.fileExists = async function(filePath) {
    return new Promise((resolve, reject)=> {
        fs.stat(filePath, (error, stat)=> {
            if (error) {
                resolve(false);
            } else {
                console.log("CACHED:", filePath);
                resolve(true);
            }
        });
    });
}

global.__DEV__ = true;
