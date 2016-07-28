/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTRootView.h"
#import "RemoteBundle.h"
#import "RCTAssert.h"
#import "UIImage+SplashImage.h"
#import <Fabric/Fabric.h>
#import <DigitsKit/DigitsKit.h>
#import "FLAnimatedImage.h"
#import "FLAnimatedImageView.h"

@implementation AppDelegate

-(void)loadBundle:(NSDictionary *)launchOptions initialProps:(NSDictionary *)props {
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:[RemoteBundle bundle]
                                                      moduleName:@"Chat"
                                               initialProperties:props
                                                   launchOptions:launchOptions];
//  UIView *waitingView = [[UIView alloc] initWithFrame:[UIScreen mainScreen].bounds];
//  UIImageView *launchView = [[UIImageView alloc] initWithImage:[UIImage splashImageForOrientation:[[UIDevice currentDevice] orientation]]];
//  [waitingView addSubview:launchView];
//  UIImageView *iconView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"logoName"]];
//  iconView.center = waitingView.center;
//  [waitingView addSubview:iconView];
  
  NSURL *url1 = [[NSBundle mainBundle] URLForResource:@"icon" withExtension:@"gif"];
  NSData *data1 = [NSData dataWithContentsOfURL:url1];
  FLAnimatedImage *animatedImage1 = [FLAnimatedImage animatedImageWithGIFData:data1];
  FLAnimatedImageView *waitingView = [[FLAnimatedImageView alloc] initWithFrame:[UIScreen mainScreen].bounds];
  waitingView.animatedImage = animatedImage1;
  
  rootView.loadingView = waitingView;
  
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSDictionary *env = [[NSProcessInfo processInfo] environment];
  [Fabric with:@[[Digits class]]];
  
  [[UITextField appearance] setTintColor:[UIColor lightGrayColor]];
  [RemoteBundle checkUpdate];
  RCTSetFatalHandler(^(NSError *error) {
    // remove loaded version!
    if ([RemoteBundle removeCurrentVersion]){
      dispatch_async(dispatch_get_main_queue(), ^{
        [self loadBundle:launchOptions initialProps:env];
      });
    }
  });
  [self loadBundle:launchOptions initialProps:env];
  return YES;
}

-(void)applicationDidEnterBackground:(UIApplication *)application {
  [RemoteBundle checkUpdate];
}
@end
