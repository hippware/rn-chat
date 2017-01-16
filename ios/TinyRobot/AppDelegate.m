/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTRootView.h>
#import "RemoteBundle.h"
#import <React/RCTAssert.h>
#import "UIImage+SplashImage.h"
#import <Fabric/Fabric.h>
#import <DigitsKit/DigitsKit.h>
#import "FLAnimatedImage.h"
#import "FLAnimatedImageView.h"
#import "RCCManager.h"
#import <React/RCTPushNotificationManager.h>
#import <TSBackgroundFetch/TSBackgroundFetch.h>
//#import <Bugsnag/Bugsnag.h>

@implementation AppDelegate

// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
{
  [RCTPushNotificationManager didReceiveRemoteNotification:notification];
}
// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  [RCTPushNotificationManager didReceiveLocalNotification:notification];
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  NSLog(@"%@", error);
}

-(void)loadBundle:(NSDictionary *)launchOptions initialProps:(NSDictionary *)props {
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  
  [[RCCManager sharedInstance] initBridgeWithBundleURL:[RemoteBundle bundle] launchOptions:props];
  NSURL *url1 = [[NSBundle mainBundle] URLForResource:@"icon" withExtension:@"gif"];
  NSData *data1 = [NSData dataWithContentsOfURL:url1];
  FLAnimatedImage *animatedImage1 = [FLAnimatedImage animatedImageWithGIFData:data1];
  FLAnimatedImageView *waitingView = [[FLAnimatedImageView alloc] initWithFrame:[UIScreen mainScreen].bounds];
  waitingView.animatedImage = animatedImage1;
  
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = waitingView;
  self.window.rootViewController = rootViewController;
//  UIViewController *viewController = [[ViewController alloc] init];
//  self.window.rootViewController = viewController;
  self.window.backgroundColor = [UIColor whiteColor];
  [self.window makeKeyAndVisible];
}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //[Bugsnag startBugsnagWithApiKey:@"f108fb997359e5519815d5fc58c79ad3"];
//  [Bugsnag notify: [NSException
//                    exceptionWithName: @"ExceptionName"
//                    reason: @"Test Error"
//                    userInfo: nil
//                    ]];
  
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
-(void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler {
  
}
-(void)application:(UIApplication *)application performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  NSLog(@"RNBackgroundFetch AppDelegate received fetch event");
  TSBackgroundFetch *fetchManager = [TSBackgroundFetch sharedInstance];
  [fetchManager performFetchWithCompletionHandler:completionHandler];
}
@end
