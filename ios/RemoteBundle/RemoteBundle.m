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
#import "RCTBridge.h"
#import "RCTExceptionsManager.h"
#import "RCTRootView.h"
#import "RCTAssert.h"

NSString * const ETag = @"ETag";
@implementation RemoteBundle


+(void)checkUpdate {
  // 1. check if there new file on S3
  NSError* error;
  NSDictionary *info = [[NSBundle mainBundle] infoDictionary];
  NSString *version = info[@"CFBundleShortVersionString"];
  NSString *filename = [NSString stringWithFormat:@"ios_%@.zip", version];
  NSArray   *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString  *documentsDirectory = [paths objectAtIndex:0];
  NSLog(@"Checking for update");
  NSString  *filePath = [NSString stringWithFormat:@"%@/%@", documentsDirectory, filename];
  
  NSString *newBundlePath = [documentsDirectory stringByAppendingPathComponent:@"new"];
  // create folder for bundle
  if (![[NSFileManager defaultManager] fileExistsAtPath:newBundlePath]){
    if( ! [[NSFileManager defaultManager] createDirectoryAtPath:newBundlePath withIntermediateDirectories:NO attributes:nil error:&error]){
        NSLog(@"[%@] ERROR: attempting to write create new directory", [self class]);
      return;
    }
  }
  NSString *cdn = [NSString stringWithFormat:
                   @"https://rn-chat.s3.amazonaws.com/%@", filename];
  
  NSURL  *url = [NSURL URLWithString:cdn];
  NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url cachePolicy:NSURLRequestReloadIgnoringLocalCacheData timeoutInterval:1000];
  NSString *eTag = [[NSUserDefaults standardUserDefaults] objectForKey:ETag];
  if (eTag){
    [request addValue:eTag forHTTPHeaderField:@"If-None-Match"];
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
                  // 2. load new bundle, unzip and verify content
                  [data writeToFile:filePath atomically:YES];
                  [AH_SSZipArchive unzipFileAtPath:filePath toDestination:newBundlePath];
                  NSDictionary *headers = [((NSHTTPURLResponse *)response) allHeaderFields];
                  // save Etag
                  if (headers[ETag]){
                    [[NSUserDefaults standardUserDefaults] setValue:headers[ETag] forKey:ETag];
                    [[NSUserDefaults standardUserDefaults] synchronize];
                  }
                  
                  // 3. verify signature
                  NSString* publicKeyPath = [[NSBundle mainBundle] pathForResource:@"public" ofType:@"pem"];
                  NSString  *signaturePath = [NSString stringWithFormat:@"%@/signature.txt", newBundlePath];
                  NSString  *bundlePath = [NSString stringWithFormat:@"%@/ios.bundle.zip", newBundlePath];
                  
                  if (![Verifier verifyContent:bundlePath publicKeyPath:publicKeyPath signaturePath:signaturePath]){
                    NSLog(@"Verification of signature FAILED!");
                    return;
                  }
                  
                  // 4. unzip inner bundle
                  [AH_SSZipArchive unzipFileAtPath:bundlePath toDestination:newBundlePath];
                  NSLog(@"Unzip to %@", newBundlePath);
                } else {
                  NSLog(@"No new update");
                }
                
              }] resume];

}

+(BOOL)removeCurrentVersion {
  NSError *error;
  NSArray   *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString  *documentsDirectory = [paths objectAtIndex:0];
  NSString *currentBundlePath = [documentsDirectory stringByAppendingPathComponent:@"current"];
  NSFileManager *fileManager = [NSFileManager defaultManager];
  NSString  *bundlePath = [NSString stringWithFormat:@"%@/ios.bundle/main.jsbundle", currentBundlePath];
  if ([fileManager fileExistsAtPath:bundlePath]){
    [fileManager removeItemAtPath:currentBundlePath error:&error];
    if (error){
      return NO;
    } else {
      return YES;
    }
    
  } else {
    return NO;
  }
}

+(NSURL *)bundle {
#if TARGET_IPHONE_SIMULATOR && TESTING
  return [NSURL URLWithString:@"http://10.0.1.7:8081/index.ios.bundle?platform=ios&dev=true"];
#else
  NSError *error;
  // 1. check if new update loaded
  NSArray   *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString  *documentsDirectory = [paths objectAtIndex:0];
  NSString *newBundlePath = [documentsDirectory stringByAppendingPathComponent:@"new"];
  NSString *currentBundlePath = [documentsDirectory stringByAppendingPathComponent:@"current"];
  NSString  *bundlePath = [NSString stringWithFormat:@"%@/ios.bundle/main.jsbundle", newBundlePath];
  NSString *currentBundle = [NSString stringWithFormat:@"%@/ios.bundle/main.jsbundle", currentBundlePath];
  NSFileManager *fileManager = [NSFileManager defaultManager];
  if ([fileManager fileExistsAtPath:bundlePath]){
    [fileManager removeItemAtPath:currentBundlePath error:&error];
    if (error){
      NSLog(@"Error: %@",[ error localizedDescription]);
    }
    // move it to current
    NSLog(@"Found update, moving to current");
    [fileManager moveItemAtPath:newBundlePath toPath:currentBundlePath error:&error];
    if (error){
      NSLog(@"Error: %@",[ error localizedDescription]);
    }
  }
  
  if ([fileManager fileExistsAtPath:currentBundle]){
    NSLog(@"Use bundle from: %@", currentBundle);
    NSURL *url=  [NSURL fileURLWithPath:currentBundle];
    return url;
  } else {
    NSLog(@"Use built-in bundle");
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  }
  
  
#endif
}

@end
