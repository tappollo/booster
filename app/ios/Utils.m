//
//  Utils.m
//  mercy
//
//  Created by Kyle Fang on 2020/2/27.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTUtils.h>
#import <React/RCTConvert.h>
#import <React/RCTBridgeModule.h>
#import <Firebase/Firebase.h>

@interface Utils : NSObject<RCTBridgeModule>

@end

@implementation Utils

RCT_EXPORT_MODULE()

// https://github.com/invertase/react-native-firebase/issues/2657#issuecomment-582815742
RCT_EXPORT_METHOD(getToken:(RCTPromiseResolveBlock) resolve:(RCTPromiseRejectBlock) reject) {
  dispatch_async(dispatch_get_main_queue(), ^{
    if ([UIApplication sharedApplication].isRegisteredForRemoteNotifications == NO) {
      reject(@"error", @"error", nil);
      return;
    }
    
    [[FIRInstanceID instanceID] instanceIDWithHandler:^(FIRInstanceIDResult * _Nullable result, NSError * _Nullable error) {
      if (error) {
        reject(@"error", @"error", nil);
      } else {
        resolve(result.token);
      }
    }];
  });
}

@end
