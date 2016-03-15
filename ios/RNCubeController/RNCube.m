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
#import "CubeController.h"

@interface RNCube () <CubeControllerDataSource>

@end

@implementation RNCube
{
  BOOL _tabsChanged;
  CubeController *_cubeController;
  NSMutableArray<UIViewController *> *_controllers;
  NSMutableArray<RCTView*> *_tabViews;
}

- (UIViewController *)cubeController:(__unused CubeController *)cubeController viewControllerAtIndex:(NSInteger)index
{
  return _controllers[index];
}

- (NSInteger)numberOfViewControllersInCubeController:(__unused CubeController *)cubeController
{
  return [_controllers count];
}

-(void)setSwipeEnabled:(BOOL)swipeEnabled {
  _cubeController.scrollView.scrollEnabled = swipeEnabled;
}

-(void)setCurrentIndex:(NSInteger)currentIndex {
  _currentIndex = currentIndex;
  if ([_controllers count]>currentIndex){
    [_cubeController scrollToViewControllerAtIndex:self.currentIndex animated:YES];
  }
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _tabViews = [NSMutableArray new];
    _controllers = [NSMutableArray new];
    _cubeController = [CubeController new];
    _cubeController.dataSource = self;
    [self addSubview:_cubeController.view];
  }
  return self;
}

RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:(NSCoder *)aDecoder)

- (UIViewController *)reactViewController
{
  return _cubeController;
}

- (void)dealloc
{
  _cubeController.delegate = nil;
  [_cubeController removeFromParentViewController];
}

- (NSArray<RCTView *> *)reactSubviews
{
  return _tabViews;
}

- (void)insertReactSubview:(RCTView *)view atIndex:(NSInteger)atIndex
{
  [_tabViews insertObject:view atIndex:atIndex];
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
  [self reactAddControllerToClosestParent:_cubeController];
  _cubeController.view.frame = self.bounds;
}

- (void)reactBridgeDidFinishTransaction
{
  // we can't hook up the VC hierarchy in 'init' because the subviews aren't
  // hooked up yet, so we do it on demand here whenever a transaction has finished
  [self reactAddControllerToClosestParent:_cubeController];
  if (_tabsChanged) {
    [_controllers removeAllObjects];
    

    for (RCTView *tab in [self reactSubviews]) {
      UIViewController *controller = tab.reactViewController;
      if (!controller) {
        controller = [[RCTWrapperViewController alloc] initWithContentView:tab];
      }
      [_controllers addObject:controller];
    }

    [_cubeController reloadData];
    _tabsChanged = NO;
    
    if (_cubeController.currentViewControllerIndex != self.currentIndex){
      [_cubeController scrollToViewControllerAtIndex:self.currentIndex animated:YES];
    }
    
  }

}

@end
