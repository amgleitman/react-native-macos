/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.react.module.model

import com.facebook.react.turbomodule.core.interfaces.TurboModule

/**
 * Data holder class holding native module specifications. [ReactModuleSpecProcessor] creates these
 * so Java modules don't have to be instantiated at React Native start up.
 */
public class ReactModuleInfo(
    @get:JvmName("name") public val name: String,
    @get:JvmName("className") public val className: String,
    @get:JvmName("canOverrideExistingModule") public val canOverrideExistingModule: Boolean,
    @get:JvmName("needsEagerInit") public val needsEagerInit: Boolean,
    public val isCxxModule: Boolean,
    public val isTurboModule: Boolean
) {
  public companion object {
    /**
     * Checks if the passed class is a TurboModule. Useful to populate the parameter [isTurboModule]
     * in the constructor of ReactModuleInfo.
     */
    @JvmStatic
    public fun classIsTurboModule(clazz: Class<*>): Boolean =
        TurboModule::class.java.isAssignableFrom(clazz)
  }
}
