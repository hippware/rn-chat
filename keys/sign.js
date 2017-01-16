var crypto = require('crypto');
var fs = require('fs');
var args = process.argv.slice(2);
var pem = fs.readFileSync('keys/private.pem');
var bundle = fs.readFileSync(args[0]);
var key = pem.toString('ascii');

var sign = crypto.createSign('RSA-SHA256');
sign.update(bundle);
var sig = sign.sign(key, 'base64');
fs.writeFileSync('signature.txt',sig);

//var verifier = crypto.createVerify('sha256');
//verifier.update(bundle);

//
//var publicpem = fs.readFileSync('keys/public.pem');
//var publickey = publicpem.toString('ascii');
//var ver = verifier.verify(publickey, sig,'base64');
//console.log(ver);//<--- always false!