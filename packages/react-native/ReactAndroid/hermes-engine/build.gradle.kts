/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import de.undercouch.gradle.tasks.download.Download
import org.apache.tools.ant.taskdefs.condition.Os

plugins {
  id("maven-publish")
  id("signing")
  alias(libs.plugins.android.library)
  alias(libs.plugins.download)
}

group = "com.facebook.react"

version = parent?.properties?.get("publishing_version")?.toString()!!

val cmakeVersion = parent?.properties?.get("cmake_version")?.toString()!!
val cmakePath = "${getSDKPath()}/cmake/$cmakeVersion"
val cmakeBinaryPath = "${cmakePath}/bin/cmake"

fun getSDKPath(): String {
  val androidSdkRoot = System.getenv("ANDROID_SDK_ROOT")
  val androidHome = System.getenv("ANDROID_HOME")
  return when {
    !androidSdkRoot.isNullOrBlank() -> androidSdkRoot
    !androidHome.isNullOrBlank() -> androidHome
    else -> throw IllegalStateException("Neither ANDROID_SDK_ROOT nor ANDROID_HOME is set.")
  }
}

fun getSDKManagerPath(): String {
  val metaSdkManagerPath = File("${getSDKPath()}/cmdline-tools/latest/bin/sdkmanager")
  val ossSdkManagerPath = File("${getSDKPath()}/tools/bin/sdkmanager")
  return when {
    metaSdkManagerPath.exists() -> metaSdkManagerPath.absolutePath
    ossSdkManagerPath.exists() -> ossSdkManagerPath.absolutePath
    else -> throw GradleException("Could not find sdkmanager executable.")
  }
}

val reactNativeRootDir = project(":packages:react-native:ReactAndroid").projectDir.parent
val customDownloadDir = System.getenv("REACT_NATIVE_DOWNLOADS_DIR")
val downloadsDir =
    if (customDownloadDir != null) {
      File(customDownloadDir)
    } else {
      File(reactNativeRootDir, "sdks/download")
    }

// By default we are going to download and unzip hermes inside the /sdks/hermes folder
// but you can provide an override for where the hermes source code is located.
val buildDir = project.layout.buildDirectory.get().asFile
val overrideHermesDir = System.getenv("REACT_NATIVE_OVERRIDE_HERMES_DIR") != null
val hermesDir =
    if (overrideHermesDir) {
      File(System.getenv("REACT_NATIVE_OVERRIDE_HERMES_DIR"))
    } else {
      File(reactNativeRootDir, "sdks/hermes")
    }
val hermesBuildDir = File("$buildDir/hermes")
val hermesCOutputBinary = File("$buildDir/hermes/bin/hermesc")

// This filetree represents the file of the Hermes build that we want as input/output
// of the buildHermesC task. Gradle will compute the hash of files in the file tree
// and won't rebuilt hermesc unless those files are changing.
val hermesBuildOutputFileTree =
    fileTree(hermesBuildDir.toString())
        .include(
            "**/*.make",
            "**/*.cmake",
            "**/*.marks",
            "**/compiler_depends.ts",
            "**/Makefile",
            "**/link.txt")

var hermesVersion = "main"
val hermesVersionFile = File(reactNativeRootDir, "sdks/.hermesversion")

if (hermesVersionFile.exists()) {
  hermesVersion = hermesVersionFile.readText()
}

val ndkBuildJobs = Runtime.getRuntime().availableProcessors().toString()
val prefabHeadersDir = File("$buildDir/prefab-headers")

// We inject the JSI directory used inside the Hermes build with the -DJSI_DIR config.
val jsiDir = File(reactNativeRootDir, "ReactCommon/jsi")

val downloadHermes by
    tasks.creating(Download::class) {
      src("https://github.com/facebook/hermes/tarball/${hermesVersion}")
      onlyIfModified(true)
      overwrite(true)
      useETag("all")
      retries(5)
      dest(File(downloadsDir, "hermes.tar.gz"))
    }

val unzipHermes by
    tasks.registering(Copy::class) {
      dependsOn(downloadHermes)
      from(tarTree(downloadHermes.dest)) {
        eachFile {
          // We flatten the unzip as the tarball contains a `facebook-hermes-<SHA>`
          // folder at the top level.
          if (this.path.startsWith("facebook-hermes-")) {
            this.path = this.path.substringAfter("/")
          }
        }
      }
      into(hermesDir)
    }

// NOTE: ideally, we would like CMake to be installed automatically by the `externalNativeBuild`
// below. To do that, we would need the various `ConfigureCMake*` tasks to run *before*
// `configureBuildForHermes` and `buildHermesC` so that CMake is available for their run. But the
// `ConfigureCMake*` tasks depend upon the `ImportHermesc.cmake` file which is actually generated by
// the two tasks mentioned before, so we install CMake manually to break the circular dependency.

val installCMake by
    tasks.registering(Exec::class) {
      onlyIf { !File(cmakePath).exists() }
      commandLine(
          windowsAwareCommandLine(getSDKManagerPath(), "--install", "cmake;${cmakeVersion}"))
    }

val configureBuildForHermes by
    tasks.registering(Exec::class) {
      dependsOn(installCMake)
      workingDir(hermesDir)
      inputs.dir(hermesDir)
      outputs.files(hermesBuildOutputFileTree)
      commandLine(
          windowsAwareCommandLine(
              cmakeBinaryPath,
              if (Os.isFamily(Os.FAMILY_WINDOWS)) "-GNMake Makefiles" else "",
              "-S",
              ".",
              "-B",
              hermesBuildDir.toString(),
              "-DJSI_DIR=" + jsiDir.absolutePath))
    }

val buildHermesC by
    tasks.registering(Exec::class) {
      dependsOn(configureBuildForHermes)
      workingDir(hermesDir)
      inputs.files(hermesBuildOutputFileTree)
      outputs.file(hermesCOutputBinary)
      commandLine(
          windowsAwareCommandLine(
              cmakeBinaryPath,
              "--build",
              hermesBuildDir.toString(),
              "--target",
              "hermesc",
              "-j",
              ndkBuildJobs,
          ))
    }

val prepareHeadersForPrefab by
    tasks.registering(Copy::class) {
      dependsOn(buildHermesC)
      from("$hermesDir/API")
      from("$hermesDir/public")
      include("**/*.h")
      exclude("jsi/**")
      into(prefabHeadersDir)
    }

fun windowsAwareCommandLine(vararg commands: String): List<String> {
  val result =
      if (Os.isFamily(Os.FAMILY_WINDOWS)) {
        mutableListOf("cmd", "/c")
      } else {
        mutableListOf()
      }
  result.addAll(commands)
  return result
}

fun reactNativeArchitectures(): List<String> {
  val value = project.properties["reactNativeArchitectures"]
  return value?.toString()?.split(",") ?: listOf("armeabi-v7a", "x86", "x86_64", "arm64-v8a")
}

repositories {
  // Normally RNGP will set repositories for all modules,
  // but when consumed from source, we need to re-declare
  // those repositories as there is no app module there.
  mavenCentral()
  google()
}

android {
  compileSdk = libs.versions.compileSdk.get().toInt()
  buildToolsVersion = libs.versions.buildTools.get()
  namespace = "com.facebook.hermes"

  // Used to override the NDK path/version on internal CI or by allowing
  // users to customize the NDK path/version from their root project (e.g. for Apple Silicon
  // support)
  if (rootProject.hasProperty("ndkPath") && rootProject.properties["ndkPath"] != null) {
    ndkPath = rootProject.properties["ndkPath"].toString()
  }
  if (rootProject.hasProperty("ndkVersion") && rootProject.properties["ndkVersion"] != null) {
    ndkVersion = rootProject.properties["ndkVersion"].toString()
  } else {
    ndkVersion = libs.versions.ndkVersion.get()
  }

  defaultConfig {
    minSdk = libs.versions.minSdk.get().toInt()

    externalNativeBuild {
      cmake {
        arguments(
            "-DHERMES_IS_ANDROID=True",
            "-DANDROID_STL=c++_shared",
            "-DANDROID_PIE=True",
            "-DIMPORT_HERMESC=${File(hermesBuildDir, "ImportHermesc.cmake").toString()}",
            "-DJSI_DIR=${jsiDir}",
            "-DHERMES_SLOW_DEBUG=False",
            "-DHERMES_BUILD_SHARED_JSI=True",
            "-DHERMES_RELEASE_VERSION=for RN ${version}",
            // We intentionally build Hermes with Intl support only. This is to simplify
            // the build setup and to avoid overcomplicating the build-type matrix.
            "-DHERMES_ENABLE_INTL=True",
            // Due to https://github.com/android/ndk/issues/1693 we're losing Android
            // specific compilation flags. This can be removed once we moved to NDK 25/26
            "-DANDROID_USE_LEGACY_TOOLCHAIN_FILE=ON")

        targets("libhermes")
      }
    }
    ndk { abiFilters.addAll(reactNativeArchitectures()) }
  }

  externalNativeBuild {
    cmake {
      version = cmakeVersion
      path = File("$hermesDir/CMakeLists.txt")
    }
  }

  buildTypes {
    debug {
      externalNativeBuild {
        cmake {
          // JS developers aren't VM developers.
          // Therefore we're passing as build type Release, to provide a faster build.
          // This has the (unlucky) side effect of letting AGP call the build
          // tasks `configureCMakeRelease` while is actually building the debug flavor.
          arguments("-DCMAKE_BUILD_TYPE=Release")
          // Adding -O3 to handle the issue here:
          // https://github.com/android/ndk/issues/1740#issuecomment-1198438260
          // The old NDK toolchain is not passing -O3 correctly for release CMake builds. This is
          // fixed in NDK 25 and can be removed once we're there.
          cppFlags("-O3")
        }
      }
    }
    release {
      externalNativeBuild {
        cmake {
          arguments(
              "-DCMAKE_BUILD_TYPE=MinSizeRel",
              // For release builds, we don't want to enable the Hermes Debugger.
              "-DHERMES_ENABLE_DEBUGGER=False")
        }
      }
    }
  }

  sourceSets.getByName("main") {
    manifest.srcFile("$hermesDir/android/hermes/src/main/AndroidManifest.xml")
    java.srcDir("$hermesDir/lib/Platform/Intl/java")
  }

  buildFeatures {
    prefab = true
    prefabPublishing = true
  }

  dependencies {
    implementation(libs.fbjni)
    implementation(libs.yoga.proguard.annotations)
    implementation(libs.androidx.annotation)
  }

  packaging {
    jniLibs.excludes.add("**/libc++_shared.so")
    jniLibs.excludes.add("**/libjsi.so")
    jniLibs.excludes.add("**/libfbjni.so")
  }

  publishing {
    multipleVariants {
      withSourcesJar()
      allVariants()
    }
  }

  prefab {
    create("libhermes") {
      headers = prefabHeadersDir.absolutePath
      libraryName = "libhermes"
    }
  }
}

configurations.all { exclude(group = "com.facebook.soloader") }

afterEvaluate {
  if (!overrideHermesDir) {
    // If you're not specifying a Hermes Path override, we want to
    // download/unzip Hermes from Github then.
    tasks.getByName("configureBuildForHermes").dependsOn(unzipHermes)
    tasks.getByName("prepareHeadersForPrefab").dependsOn(unzipHermes)
  }
  tasks.getByName("preBuild").dependsOn(buildHermesC)
  tasks.getByName("preBuild").dependsOn(prepareHeadersForPrefab)
}

/* Publishing Configuration */
apply(from = "../publish.gradle")

// We need to override the artifact ID as this project is called `hermes-engine` but
// the maven coordinates are on `hermes-android`.
// Please note that the original coordinates, `hermes-engine`, have been voided
// as they caused https://github.com/facebook/react-native/issues/35210
publishing {
  publications { getByName("release", MavenPublication::class) { artifactId = "hermes-android" } }
}