//
//  RemoteBundle.h
//  Chat
//
//  Created by Pavlo Aksonov on 08.01.16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface RemoteBundle : NSObject

+(NSURL *)bundle;
+(void)checkUpdate;
@end
