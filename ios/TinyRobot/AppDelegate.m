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
#import <React/RCTPushNotificationManager.h>
#import <React/RCTBundleURLProvider.h>
#import <CodePush/CodePush.h>

//#import <TSBackgroundFetch/TSBackgroundFetch.h>
//#import <Bugsnag/Bugsnag.h>
#import <Firebase.h>
#import "RNFirebaseMessaging.h"

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
  if (floor(NSFoundationVersionNumber) <= NSFoundationVersionNumber_iOS_9_x_Max) {
    UIUserNotificationType allNotificationTypes =
    (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
    UIUserNotificationSettings *settings =
    [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
  } else {
    // iOS 10 or later
#if defined(__IPHONE_10_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
    // For iOS 10 display notification (sent via APNS)
    [UNUserNotificationCenter currentNotificationCenter].delegate = self;
    UNAuthorizationOptions authOptions =
    UNAuthorizationOptionAlert
    | UNAuthorizationOptionSound
    | UNAuthorizationOptionBadge;
    [[UNUserNotificationCenter currentNotificationCenter] requestAuthorizationWithOptions:authOptions completionHandler:^(BOOL granted, NSError * _Nullable error) {
    }];
#endif
  }
  
  [[UIApplication sharedApplication] registerForRemoteNotifications];
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
  [RNFirebaseMessaging didReceiveLocalNotification:notification];
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  NSLog(@"%@", error);
}

-(void)loadBundle:(NSDictionary *)launchOptions initialProps:(NSDictionary *)props {
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  
  NSURL *jsCodeLocation;
  
  #ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  #else
    jsCodeLocation = [CodePush bundleURL];
  #endif
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"App"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  self.window.backgroundColor = [UIColor whiteColor];
  [self.window makeKeyAndVisible];
}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
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
