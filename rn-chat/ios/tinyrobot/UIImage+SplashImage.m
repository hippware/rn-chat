#import "UIImage+SplashImage.h"

@implementation UIImage (SplashImage)

+ (NSString *)splashImageNameForOrientation:(UIDeviceOrientation)orientation
{
  CGSize viewSize = [UIScreen mainScreen].bounds.size;
  
  NSString *viewOrientation = @"Portrait";
  
  if (UIDeviceOrientationIsLandscape(orientation))
  {
    viewSize = CGSizeMake(viewSize.height, viewSize.width);
    viewOrientation = @"Landscape";
  }
  
  NSArray* imagesDict = [[[NSBundle mainBundle] infoDictionary] valueForKey:@"UILaunchImages"];
  
  for (NSDictionary *dict in imagesDict)
  {
    CGSize imageSize = CGSizeFromString(dict[@"UILaunchImageSize"]);
    if (CGSizeEqualToSize(imageSize, viewSize) && [viewOrientation isEqualToString:dict[@"UILaunchImageOrientation"]])
      return dict[@"UILaunchImageName"];
  }
  return nil;
}

+ (UIImage*)splashImageForOrientation:(UIDeviceOrientation)orientation
{
  NSString *imageName = [self splashImageNameForOrientation:orientation];
  UIImage *image = [UIImage imageNamed:imageName];
  return image;
}

@end