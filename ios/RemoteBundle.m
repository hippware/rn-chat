//
//  RemoteBundle.m
//  Chat
//
//  Created by Pavlo Aksonov on 08.01.16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RemoteBundle.h"
#import <CommonCrypto/CommonCrypto.h>
#import <Security/Security.h>
#import "Shared.h"

@implementation RemoteBundle


+(NSData *)readSignature {
  NSError *error;
  NSString* path = [[NSBundle mainBundle] pathForResource:@"signature" ofType:@"txt"];
  NSString *signatureStr = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:&error];
  NSData *signature = [[NSData alloc] initWithBase64EncodedString:signatureStr options:0];
  return signature;
}

+(void)readBundle {
  NSData *signature = [RemoteBundle readSignature];
  
  NSString* publicKeyPath = [[NSBundle mainBundle] pathForResource:@"public" ofType:@"pem"];
  NSString* bundlePath = [[NSBundle mainBundle] pathForResource:@"main2" ofType:@"jsbundle"];
  NSData* content = [[NSData alloc] initWithContentsOfFile:bundlePath];
  
  BOOL res = [Verifier verifyContent:content publicKeyPath:publicKeyPath signature:signature];
  
  NSLog(@"RES: %d", res);
}

@end
