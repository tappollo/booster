//
//  RNIQKeyboardManager.m
//  chatcy
//
//  Created by Kyle Fang on 3/22/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNIQKeyboardManager.h"
#import <IQKeyboardManager/IQKeyboardManager.h>

@implementation RNIQKeyboardManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(set:(BOOL)on)
{
  [[IQKeyboardManager sharedManager] setEnable:on];
}

@end

