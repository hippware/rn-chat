/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "RNCubeManager.h"

#import "RCTBridge.h"
#import "RNCube.h"

@implementation RNCubeManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [RNCube new];
}

RCT_EXPORT_VIEW_PROPERTY(currentIndex, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(swipeEnabled, BOOL)


@end
