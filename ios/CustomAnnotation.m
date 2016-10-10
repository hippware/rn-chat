//
//  CustomAnnotation.m
//  RCTMapboxGL
//
//  Created by Pavlo Aksonov on 26/09/16.
//  Copyright © 2016 Mapbox. All rights reserved.
//

#import "CustomAnnotation.h"

@implementation CustomAnnotation

-(id)initWithReuseIdentifier:(NSString *)reuseIdentifier {
    self = [super initWithReuseIdentifier:reuseIdentifier];
    self.frame = CGRectMake(0, 0, 40, 40);
  UIButton *button = [[UIButton alloc] initWithFrame:self.frame];
  [button addTarget:self action:@selector(onPress) forControlEvents:UIControlEventTouchUpInside];
  [self addSubview:button];
  
    return self;
}
-(void)onPress {
  CGPoint point = [self.map convertCoordinate:self.coordinate toPointToView:self.map];
  self.frame = CGRectMake(0, 0, self.frame.size.width + 10, self.frame.size.height + 10);
  self.center = point;
}

-(CLLocationCoordinate2D)coordinate {
    return CLLocationCoordinate2DMake(0, 66);
}
- (void)layoutSubviews {
    [super layoutSubviews];
    
    // Force the annotation view to maintain a constant size when the map is tilted.
    self.scalesWithViewingDistance = false;
    
    // Use CALayer’s corner radius to turn this view into a circle.
    self.layer.cornerRadius = self.frame.size.width / 2;
    self.layer.borderWidth = 2;
    self.layer.borderColor = [UIColor whiteColor].CGColor;
}


@end
