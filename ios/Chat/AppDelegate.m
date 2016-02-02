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
@implementation AppDelegate

-(void)loadBundle:(NSDictionary *)launchOptions {
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:[RemoteBundle bundle]
                                                      moduleName:@"Chat"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  UIView *waitingView = [[UIView alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIImageView *launchView = [[UIImageView alloc] initWithImage:[UIImage splashImageForOrientation:[[UIDevice currentDevice] orientation]]];
  [waitingView addSubview:launchView];
  UIImageView *iconView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"logoName"]];
  iconView.center = waitingView.center;
  [waitingView addSubview:iconView];
  rootView.loadingView = waitingView;
  
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [RemoteBundle checkUpdate];
  RCTSetFatalHandler(^(NSError *error) {
    // remove loaded version!
    if ([RemoteBundle removeCurrentVersion]){
      dispatch_async(dispatch_get_main_queue(), ^{
        [self loadBundle:launchOptions];
      });
    }
  });
  [self loadBundle:launchOptions];
  return YES;
}

-(void)applicationDidEnterBackground:(UIApplication *)application {
  [RemoteBundle checkUpdate];
}
@end
