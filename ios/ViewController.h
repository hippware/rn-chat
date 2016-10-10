//
//  ViewController.h
//  Chat
//
//  Created by Pavlo Aksonov on 26/09/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
@import Mapbox;

@interface ViewController : UIViewController<MGLMapViewDelegate>
@property (nonatomic, readonly, nullable) id <MGLAnnotation> annotation;

@end
