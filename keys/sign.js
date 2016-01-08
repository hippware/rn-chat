var crypto = require('crypto');
var fs = require('fs');

var pem = fs.readFileSync('keys/private.pem');
var bundle = fs.readFileSync('main.jsbundle').toString('utf8');
var key = pem.toString('ascii');

var sign = crypto.createSign('RSA-SHA256');
sign.update(bundle);
var sig = sign.sign({key, passphrase:'User2000'}, 'base64');
fs.writeFileSync('signature.txt',sig);
