/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <React/RCTUtils.h>

#import "RCTAlertController.h"

@interface RCTAlertController ()

#if !TARGET_OS_OSX // [TODO(macOS GH#774)
@property (nonatomic, strong) UIWindow *alertWindow;
#endif // ]TODO(macOS GH#774)

@end

@implementation RCTAlertController

#if !TARGET_OS_OSX // [TODO(macOS GH#774)
- (UIWindow *)alertWindow
{
  if (_alertWindow == nil) {
    _alertWindow = [[UIWindow alloc] initWithFrame:RCTSharedApplication().keyWindow.bounds];
    _alertWindow.rootViewController = [UIViewController new];
    _alertWindow.windowLevel = UIWindowLevelAlert + 1;
  }
  return _alertWindow;
}

- (void)show:(BOOL)animated completion:(void (^)(void))completion
{
  [self.alertWindow makeKeyAndVisible];
  [self.alertWindow.rootViewController presentViewController:self animated:animated completion:completion];
}
#endif // ]TODO(macOS GH#774)

- (void)hide
{
  _alertWindow = nil;
}

@end
