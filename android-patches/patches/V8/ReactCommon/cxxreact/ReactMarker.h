--- ./ReactCommon/cxxreact/ReactMarker.h	2021-10-19 18:12:12.000000000 -0700
+++ /var/folders/vs/8_b205053dddbcv7btj0w0v80000gn/T/update-Ge4Sm3/merge/V8/ReactCommon/cxxreact/ReactMarker.h	2021-10-25 12:22:45.000000000 -0700
@@ -28,7 +28,10 @@
   REGISTER_JS_SEGMENT_START,
   REGISTER_JS_SEGMENT_STOP,
   REACT_INSTANCE_INIT_START,
-  REACT_INSTANCE_INIT_STOP
+  REACT_INSTANCE_INIT_STOP,
+  BYTECODE_CREATION_FAILED,
+  BYTECODE_READ_FAILED,
+  BYTECODE_WRITE_FAILED
 };
 
 #ifdef __APPLE__