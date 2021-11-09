/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * <p>This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 *
 * @generated by codegen project: GeneratePropsJavaDelegate.js
 */
package com.facebook.react.viewmanagers;

import android.view.View;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.BaseViewManagerDelegate;
import com.facebook.react.uimanager.BaseViewManagerInterface;
import com.facebook.react.uimanager.LayoutShadowNode;

public class AndroidDropdownPickerManagerDelegate<
        T extends View,
        U extends BaseViewManagerInterface<T> & AndroidDropdownPickerManagerInterface<T>>
    extends BaseViewManagerDelegate<T, U> {
  public AndroidDropdownPickerManagerDelegate(U viewManager) {
    super(viewManager);
  }

  @Override
  public void setProperty(T view, String propName, @Nullable Object value) {
    switch (propName) {
      case "color":
        mViewManager.setColor(view, value == null ? null : ((Double) value).intValue());
        break;
      case "enabled":
        mViewManager.setEnabled(view, value == null ? true : (boolean) value);
        break;
      case "items":
        mViewManager.setItems(view, (ReadableArray) value);
        break;
      case "prompt":
        mViewManager.setPrompt(view, value == null ? "" : (String) value);
        break;
      case "selected":
        mViewManager.setSelected(view, value == null ? 0 : ((Double) value).intValue());
        break;
      default:
        super.setProperty(view, propName, value);
    }
  }
}