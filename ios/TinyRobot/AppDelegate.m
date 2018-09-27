/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <AppCenterReactNativeAnalytics/AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes/AppCenterReactNativeCrashes.h>
#import <AppCenterReactNative/AppCenterReactNative.h>

#import <React/RCTRootView.h>
#import <React/RCTAssert.h>
#import <React/RCTPushNotificationManager.h>
#import <React/RCTBundleURLProvider.h>
#import <CodePush/CodePush.h>
#import <React/RCTLinkingManager.h>
#import "RNFirebaseLinks.h"

@import GoogleMaps;

#import <Firebase.h>

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
//  [RNFirebaseMessaging didReceiveLocalNotification:notification];
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  NSLog(@"%@", error);
}

-(void)loadBundle:(NSDictionary *)launchOptions initialProps:(NSDictionary *)props {
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];

  NSURL *jsCodeLocation;

  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];  // Initialize AppCenter analytics

  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];  // Initialize AppCenter crashes

  [AppCenterReactNative register];  // Initialize AppCenter 

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
  [GMSServices provideAPIKey:@"AIzaSyD0DHHzl3sSy3aEbZo9OLqEYo3FAlEM_qI"];
  [FIRApp configure];
  NSString *schema = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleURLTypes"][0][@"CFBundleURLSchemes"][0];
  [FIROptions defaultOptions].deepLinkURLScheme  = schema;
  NSDictionary *env = [[NSProcessInfo processInfo] environment];

  [[UITextField appearance] setTintColor:[UIColor lightGrayColor]];
  [self loadBundle:launchOptions initialProps:env];
  return YES;
}

-(void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler {
  [RCTPushNotificationManager didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
  dispatch_async(dispatch_get_main_queue(), ^{
    completionHandler(UIBackgroundFetchResultNewData);
  });
  
}
// TODO: ENABLE IT FOR DYNAMIC LINKS
//- (BOOL)application:(UIApplication *)application
//            openURL:(NSURL *)url
//            options:(NSDictionary<NSString *, id> *)options {
//  return [[RNFirebaseLinks instance] application:application openURL:url options:options];
//}
//
//- (BOOL)application:(UIApplication *)application
//continueUserActivity:(NSUserActivity *)userActivity
// restorationHandler:(void (^)(NSArray *))restorationHandler {
//  return [[RNFirebaseLinks instance] application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
//}
//
// Add this above the `@end`:
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}


@end
