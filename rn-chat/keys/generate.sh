openssl genrsa -out private.pem 768
openssl rsa -in private.pem -pubout -out public.pem

#//Create a certificate signing request with the private key
#openssl req -new -key private.pem -out rsaCertReq.csr

#openssl rsa -in private_key.pem -pubout -out public_key.pem
#//Create a self-signed certificate with the private key and signing request
#openssl x509 -req -days 3650 -in rsaCertReq.csr -signkey private.pem -out rsaCert.crt

#//Convert the certificate to DER format: the certificate contains the public key
#openssl x509 -outform der -in rsaCert.crt -out rsaCert.der

#//Export the private key and certificate to p12 file
#openssl pkcs12 -export -out rsaPrivate.p12 -inkey private.pem -in rsaCert.crt


#//
#openssl req -x509 -nodes -days 7300 -newkey rsa:2048 -keyout private.pem -out public.crt
#openssl x509 -in public.crt -outform der -out public.crt