/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "RNCube.h"

#import "RCTEventDispatcher.h"
#import "RCTLog.h"
#import "RCTTabBarItem.h"
#import "RCTUtils.h"
#import "RCTView.h"
#import "RCTViewControllerProtocol.h"
#import "RCTWrapperViewController.h"
#import "UIView+React.h"
#import "ADTransition.h"
#import "ADCubeTransition.h"

@interface RNCube ()

@end

@implementation RNCube
{
  BOOL _tabsChanged;
  NSMutableArray<UIViewController *> *_controllers;
  NSMutableArray<RCTView*> *_tabViews;
}

-(void)setCurrentIndex:(NSInteger)currentIndex {
  if ([_controllers count]){
    [self pushTo:currentIndex from:self.currentIndex];
  }
  _currentIndex = currentIndex;
}

-(void)pushTo:(NSInteger)currentIndex from:(NSInteger)oldIndex {
  ADTransitionController *controller = (ADTransitionController *)_controllers[0];
  if (currentIndex > 0){
    ADTransition * animation = [[ADCubeTransition alloc] initWithDuration:self.duration orientation:self.orientation sourceRect:_controllers[currentIndex].view.frame];
    
    [controller pushViewController:_controllers[currentIndex] withTransition:animation];
  } else {
    [controller popToRootViewController];
  }
  
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _tabViews = [NSMutableArray new];
    _controllers = [NSMutableArray new];
    _orientation = ADTransitionTopToBottom;
    _duration = 0.5f;
    _currentIndex = 0;
  }
  return self;
}

RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:(NSCoder *)aDecoder)

- (void)dealloc
{
  if ([_controllers count]){
    [_controllers[0] removeFromParentViewController];
  }
}

- (NSArray<RCTView *> *)reactSubviews
{
  return _tabViews;
}

- (void)insertReactSubview:(RCTView *)view atIndex:(NSInteger)atIndex
{
  [_tabViews insertObject:view atIndex:atIndex];
  CGSize point = view.frame.size;
  _tabsChanged = YES;
}

- (void)removeReactSubview:(RCTView *)subview
{
  if (_tabViews.count == 0) {
    RCTLogError(@"should have at least one view to remove a subview");
    return;
  }
  [_tabViews removeObject:subview];
  _tabsChanged = YES;
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  if ([_controllers count]){
    [self reactAddControllerToClosestParent:_controllers[0]];
    [self addSubview:_controllers[0].view];
  }
}

- (void)reactBridgeDidFinishTransaction
{
  // we can't hook up the VC hierarchy in 'init' because the subviews aren't
  // hooked up yet, so we do it on demand here whenever a transaction has finished
  if (_tabsChanged) {
    if ([_controllers count]){
      [_controllers[0].view removeFromSuperview];
      [_controllers[0] removeFromParentViewController];
    }
    [_controllers removeAllObjects];
    int index = 0;

    for (RCTView *tab in [self reactSubviews]) {
      UIViewController *controller = tab.reactViewController;
      if (!controller) {
        controller = [[RCTWrapperViewController alloc] initWithContentView:tab];
      }
      if (index == 0){
        ADTransitionController *mainController = [[ADTransitionController alloc] initWithRootViewController:controller];
        [_controllers addObject:mainController];
      } else {
        [_controllers addObject:controller];
      }
      index++;
    }
    _tabsChanged = NO;
    
    if ([_controllers count]){
      [self reactAddControllerToClosestParent:_controllers[0]];
      CGRect frame = _controllers[0].view.frame;
      [self addSubview:_controllers[0].view];
    }
    if (self.currentIndex > 0){
      [self pushTo:self.currentIndex from:0];
    }
    
  }

}

@end
