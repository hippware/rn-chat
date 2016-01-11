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
#import "AH_SSZipArchive.h"

NSString * const ETag = @"ETag";

@implementation RemoteBundle




+(NSURL *)bundle {
#if TARGET_IPHONE_SIMULATOR2
  return [NSURL URLWithString:@"http://10.0.1.7:8081/index.ios.bundle?platform=ios&dev=true"];
#else
  NSURL *result = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  NSDictionary *info = [[NSBundle mainBundle] infoDictionary];
  NSString *version = info[@"CFBundleShortVersionString"];
  NSString *filename = [NSString stringWithFormat:@"main_%@.zip", version];
  NSString *cdn = [NSString stringWithFormat:
                   @"https://rn-chat.s3.amazonaws.com/%@", filename];
  
  NSURL  *url = [NSURL URLWithString:cdn];
  NSArray   *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString  *documentsDirectory = [paths objectAtIndex:0];
  NSString  *filePath = [NSString stringWithFormat:@"%@/%@", documentsDirectory, filename];
  NSString  *signaturePath = [NSString stringWithFormat:@"%@/signature.txt", documentsDirectory];
  NSString  *bundlePath = [NSString stringWithFormat:@"%@/main.jsbundle", documentsDirectory];
  NSString* publicKeyPath = [[NSBundle mainBundle] pathForResource:@"public" ofType:@"pem"];
  NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url cachePolicy:NSURLRequestReloadIgnoringLocalCacheData timeoutInterval:1000];
  NSString *eTag = [[NSUserDefaults standardUserDefaults] objectForKey:ETag];
  
  if (eTag && [Verifier verifyContent:bundlePath publicKeyPath:publicKeyPath signaturePath:signaturePath]){
    [request addValue:eTag forHTTPHeaderField:@"If-None-Match"];
    result = [[NSURL alloc] initFileURLWithPath:bundlePath];
  }
  NSURLSessionConfiguration *defaultConfigObject = [NSURLSessionConfiguration ephemeralSessionConfiguration];
  
  defaultConfigObject.requestCachePolicy = NSURLRequestReloadIgnoringLocalAndRemoteCacheData;
  
  NSURLSession *session = [NSURLSession sessionWithConfiguration:defaultConfigObject];

  [[session dataTaskWithRequest:request
          completionHandler:^(NSData *data,
                              NSURLResponse *response,
                              NSError *error) {
            NSInteger code = [((NSHTTPURLResponse *)response) statusCode];
            if (!error && code == 200){
              [data writeToFile:filePath atomically:YES];
              [AH_SSZipArchive unzipFileAtPath:filePath toDestination:documentsDirectory];
              NSDictionary *headers = [((NSHTTPURLResponse *)response) allHeaderFields];
              // save Etag
              if (headers[ETag]){
                [[NSUserDefaults standardUserDefaults] setValue:headers[ETag] forKey:ETag];
                [[NSUserDefaults standardUserDefaults] synchronize];
              }
            }
            
          }] resume];
  
  
  return result;
#endif
}

@end
