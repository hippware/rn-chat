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
#import <React/RCTAssert.h>
#import "UIImage+SplashImage.h"
#import <Fabric/Fabric.h>
#import <DigitsKit/DigitsKit.h>
//#import <Crashlytics/Crashlytics.h>
#import "FLAnimatedImage.h"
#import "FLAnimatedImageView.h"
#import "RCCManager.h"
#import <React/RCTPushNotificationManager.h>
#import <React/RCTBundleURLProvider.h>
#import <CodePush/CodePush.h>

//#import <TSBackgroundFetch/TSBackgroundFetch.h>
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
  
  NSURL *jsCodeLocation;
  
  #ifdef DEBUG
    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
  #else
    jsCodeLocation = [CodePush bundleURL];
  #endif
  
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:props];
  
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
  NSDictionary *env = [[NSProcessInfo processInfo] environment];
//  [Fabric with:@[[Digits class], [MGLAccountManager class], [Crashlytics class]]];
  [Fabric with:@[[Digits class]]];

  [[UITextField appearance] setTintColor:[UIColor lightGrayColor]];
  [self loadBundle:launchOptions initialProps:env];
  return YES;
}

-(void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler {

}
-(void)application:(UIApplication *)application performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
//  NSLog(@"RNBackgroundFetch AppDelegate received fetch event");
//  TSBackgroundFetch *fetchManager = [TSBackgroundFetch sharedInstance];
//  [fetchManager performFetchWithCompletionHandler:completionHandler];
}
@end
