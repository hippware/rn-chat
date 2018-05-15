#import <UIKit/UIKit.h>

/**
 * Category on `UIImage` to access the splash image.
 **/
@interface UIImage (SplashImage)

/**
 * Return the name of the splash image for a given orientation.
 * @param orientation The interface orientation.
 * @return The name of the splash image.
 **/
+ (NSString *)splashImageNameForOrientation:(UIDeviceOrientation)orientation;

/**
 * Returns the splash image for a given orientation.
 * @param orientation The interface orientation.
 * @return The splash image.
 **/
+ (UIImage*)splashImageForOrientation:(UIDeviceOrientation)orientation;

@end