import"../shell/shell.js";import*as e from"../../core/common/common.js";import*as t from"../../core/i18n/i18n.js";import*as o from"../../core/root/root.js";import*as i from"../../ui/legacy/legacy.js";import*as n from"../../models/issues_manager/issues_manager.js";import*as a from"../../core/sdk/sdk.js";import*as r from"../../models/workspace/workspace.js";import*as s from"../../panels/network/forward/forward.js";import*as l from"../../core/host/host.js";import*as c from"../main/main.js";import*as d from"../../core/rn_experiments/rn_experiments.js";const g={toggleDeviceToolbar:"Toggle device toolbar",captureScreenshot:"Capture screenshot",captureFullSizeScreenshot:"Capture full size screenshot",captureNodeScreenshot:"Capture node screenshot",showMediaQueries:"Show media queries",device:"device",hideMediaQueries:"Hide media queries",showRulers:"Show rulers in the Device Mode toolbar",hideRulers:"Hide rulers in the Device Mode toolbar",showDeviceFrame:"Show device frame",hideDeviceFrame:"Hide device frame"},m=t.i18n.registerUIStrings("panels/emulation/emulation-meta.ts",g),w=t.i18n.getLazilyComputedLocalizedString.bind(void 0,m);let u;async function p(){return u||(u=await import("../../panels/emulation/emulation.js")),u}i.ActionRegistration.registerActionExtension({category:"MOBILE",actionId:"emulation.toggle-device-mode",toggleable:!0,loadActionDelegate:async()=>new((await p()).DeviceModeWrapper.ActionDelegate),condition:o.Runtime.conditions.canDock,title:w(g.toggleDeviceToolbar),iconClass:"devices",bindings:[{platform:"windows,linux",shortcut:"Shift+Ctrl+M"},{platform:"mac",shortcut:"Shift+Meta+M"}]}),i.ActionRegistration.registerActionExtension({actionId:"emulation.capture-screenshot",category:"SCREENSHOT",loadActionDelegate:async()=>new((await p()).DeviceModeWrapper.ActionDelegate),condition:o.Runtime.conditions.canDock,title:w(g.captureScreenshot)}),i.ActionRegistration.registerActionExtension({actionId:"emulation.capture-full-height-screenshot",category:"SCREENSHOT",loadActionDelegate:async()=>new((await p()).DeviceModeWrapper.ActionDelegate),condition:o.Runtime.conditions.canDock,title:w(g.captureFullSizeScreenshot)}),i.ActionRegistration.registerActionExtension({actionId:"emulation.capture-node-screenshot",category:"SCREENSHOT",loadActionDelegate:async()=>new((await p()).DeviceModeWrapper.ActionDelegate),condition:o.Runtime.conditions.canDock,title:w(g.captureNodeScreenshot)}),e.Settings.registerSettingExtension({category:"MOBILE",settingName:"show-media-query-inspector",settingType:"boolean",defaultValue:!1,options:[{value:!0,title:w(g.showMediaQueries)},{value:!1,title:w(g.hideMediaQueries)}],tags:[w(g.device)]}),e.Settings.registerSettingExtension({category:"MOBILE",settingName:"emulation.show-rulers",settingType:"boolean",defaultValue:!1,options:[{value:!0,title:w(g.showRulers)},{value:!1,title:w(g.hideRulers)}],tags:[w(g.device)]}),e.Settings.registerSettingExtension({category:"MOBILE",settingName:"emulation.show-device-outline",settingType:"boolean",defaultValue:!1,options:[{value:!0,title:w(g.showDeviceFrame)},{value:!1,title:w(g.hideDeviceFrame)}],tags:[w(g.device)]}),i.Toolbar.registerToolbarItem({actionId:"emulation.toggle-device-mode",condition:o.Runtime.conditions.canDock,location:"main-toolbar-left",order:1,showLabel:void 0,loadItem:void 0,separator:void 0}),e.AppProvider.registerAppProvider({loadAppProvider:async()=>(await p()).AdvancedApp.AdvancedAppProvider.instance(),condition:o.Runtime.conditions.canDock,order:0}),i.ContextMenu.registerItem({location:"deviceModeMenu/save",order:12,actionId:"emulation.capture-screenshot"}),i.ContextMenu.registerItem({location:"deviceModeMenu/save",order:13,actionId:"emulation.capture-full-height-screenshot"});const v={sensors:"Sensors",geolocation:"geolocation",timezones:"timezones",locale:"locale",locales:"locales",accelerometer:"accelerometer",deviceOrientation:"device orientation",locations:"Locations",touch:"Touch",devicebased:"Device-based",forceEnabled:"Force enabled",emulateIdleDetectorState:"Emulate Idle Detector state",noIdleEmulation:"No idle emulation",userActiveScreenUnlocked:"User active, screen unlocked",userActiveScreenLocked:"User active, screen locked",userIdleScreenUnlocked:"User idle, screen unlocked",userIdleScreenLocked:"User idle, screen locked",showSensors:"Show Sensors",showLocations:"Show Locations"},h=t.i18n.registerUIStrings("panels/sensors/sensors-meta.ts",v),y=t.i18n.getLazilyComputedLocalizedString.bind(void 0,h);let R;async function f(){return R||(R=await import("../../panels/sensors/sensors.js")),R}i.ViewManager.registerViewExtension({location:"drawer-view",commandPrompt:y(v.showSensors),title:y(v.sensors),id:"sensors",persistence:"closeable",order:100,loadView:async()=>new((await f()).SensorsView.SensorsView),tags:[y(v.geolocation),y(v.timezones),y(v.locale),y(v.locales),y(v.accelerometer),y(v.deviceOrientation)]}),i.ViewManager.registerViewExtension({location:"settings-view",id:"emulation-locations",commandPrompt:y(v.showLocations),title:y(v.locations),order:40,loadView:async()=>new((await f()).LocationsSettingsTab.LocationsSettingsTab),settings:["emulation.locations"]}),e.Settings.registerSettingExtension({storageType:"Synced",settingName:"emulation.locations",settingType:"array",defaultValue:[{title:"Berlin",lat:52.520007,long:13.404954,timezoneId:"Europe/Berlin",locale:"de-DE"},{title:"London",lat:51.507351,long:-.127758,timezoneId:"Europe/London",locale:"en-GB"},{title:"Moscow",lat:55.755826,long:37.6173,timezoneId:"Europe/Moscow",locale:"ru-RU"},{title:"Mountain View",lat:37.386052,long:-122.083851,timezoneId:"America/Los_Angeles",locale:"en-US"},{title:"Mumbai",lat:19.075984,long:72.877656,timezoneId:"Asia/Kolkata",locale:"mr-IN"},{title:"San Francisco",lat:37.774929,long:-122.419416,timezoneId:"America/Los_Angeles",locale:"en-US"},{title:"Shanghai",lat:31.230416,long:121.473701,timezoneId:"Asia/Shanghai",locale:"zh-Hans-CN"},{title:"São Paulo",lat:-23.55052,long:-46.633309,timezoneId:"America/Sao_Paulo",locale:"pt-BR"},{title:"Tokyo",lat:35.689487,long:139.691706,timezoneId:"Asia/Tokyo",locale:"ja-JP"}]}),e.Settings.registerSettingExtension({title:y(v.touch),reloadRequired:!0,settingName:"emulation.touch",settingType:"enum",defaultValue:"none",options:[{value:"none",title:y(v.devicebased),text:y(v.devicebased)},{value:"force",title:y(v.forceEnabled),text:y(v.forceEnabled)}]}),e.Settings.registerSettingExtension({title:y(v.emulateIdleDetectorState),settingName:"emulation.idle-detection",settingType:"enum",defaultValue:"none",options:[{value:"none",title:y(v.noIdleEmulation),text:y(v.noIdleEmulation)},{value:'{"isUserActive":true,"isScreenUnlocked":true}',title:y(v.userActiveScreenUnlocked),text:y(v.userActiveScreenUnlocked)},{value:'{"isUserActive":true,"isScreenUnlocked":false}',title:y(v.userActiveScreenLocked),text:y(v.userActiveScreenLocked)},{value:'{"isUserActive":false,"isScreenUnlocked":true}',title:y(v.userIdleScreenUnlocked),text:y(v.userIdleScreenUnlocked)},{value:'{"isUserActive":false,"isScreenUnlocked":false}',title:y(v.userIdleScreenLocked),text:y(v.userIdleScreenLocked)}]});const k={developerResources:"Developer resources",showDeveloperResources:"Show Developer resources"},S=t.i18n.registerUIStrings("panels/developer_resources/developer_resources-meta.ts",k),T=t.i18n.getLazilyComputedLocalizedString.bind(void 0,S);let b;i.ViewManager.registerViewExtension({location:"drawer-view",id:"developer-resources",title:T(k.developerResources),commandPrompt:T(k.showDeveloperResources),order:100,persistence:"closeable",loadView:async()=>new((await async function(){return b||(b=await import("../../panels/developer_resources/developer_resources.js")),b}()).DeveloperResourcesView.DeveloperResourcesView)});const A={rendering:"Rendering",showRendering:"Show Rendering",paint:"paint",layout:"layout",fps:"fps",cssMediaType:"CSS media type",cssMediaFeature:"CSS media feature",visionDeficiency:"vision deficiency",colorVisionDeficiency:"color vision deficiency",reloadPage:"Reload page",hardReloadPage:"Hard reload page",forceAdBlocking:"Force ad blocking on this site",blockAds:"Block ads on this site",showAds:"Show ads on this site, if allowed",autoOpenDevTools:"Auto-open DevTools for popups",doNotAutoOpen:"Do not auto-open DevTools for popups",disablePaused:"Disable paused state overlay",toggleCssPrefersColorSchemeMedia:"Toggle CSS media feature prefers-color-scheme"},P=t.i18n.registerUIStrings("entrypoints/inspector_main/inspector_main-meta.ts",A),E=t.i18n.getLazilyComputedLocalizedString.bind(void 0,P);let N;async function x(){return N||(N=await import("../inspector_main/inspector_main.js")),N}i.ViewManager.registerViewExtension({location:"drawer-view",id:"rendering",title:E(A.rendering),commandPrompt:E(A.showRendering),persistence:"closeable",order:50,loadView:async()=>new((await x()).RenderingOptions.RenderingOptionsView),tags:[E(A.paint),E(A.layout),E(A.fps),E(A.cssMediaType),E(A.cssMediaFeature),E(A.visionDeficiency),E(A.colorVisionDeficiency)]}),i.ActionRegistration.registerActionExtension({category:"NAVIGATION",actionId:"inspector-main.reload",loadActionDelegate:async()=>new((await x()).InspectorMain.ReloadActionDelegate),iconClass:"refresh",title:E(A.reloadPage),bindings:[{platform:"windows,linux",shortcut:"Ctrl+R"},{platform:"windows,linux",shortcut:"F5"},{platform:"mac",shortcut:"Meta+R"}]}),i.ActionRegistration.registerActionExtension({category:"NAVIGATION",actionId:"inspector-main.hard-reload",loadActionDelegate:async()=>new((await x()).InspectorMain.ReloadActionDelegate),title:E(A.hardReloadPage),bindings:[{platform:"windows,linux",shortcut:"Shift+Ctrl+R"},{platform:"windows,linux",shortcut:"Shift+F5"},{platform:"windows,linux",shortcut:"Ctrl+F5"},{platform:"windows,linux",shortcut:"Ctrl+Shift+F5"},{platform:"mac",shortcut:"Shift+Meta+R"}]}),i.ActionRegistration.registerActionExtension({actionId:"rendering.toggle-prefers-color-scheme",category:"RENDERING",title:E(A.toggleCssPrefersColorSchemeMedia),loadActionDelegate:async()=>new((await x()).RenderingOptions.ReloadActionDelegate)}),e.Settings.registerSettingExtension({category:"NETWORK",title:E(A.forceAdBlocking),settingName:"network.ad-blocking-enabled",settingType:"boolean",storageType:"Session",defaultValue:!1,options:[{value:!0,title:E(A.blockAds)},{value:!1,title:E(A.showAds)}]}),e.Settings.registerSettingExtension({category:"GLOBAL",storageType:"Synced",title:E(A.autoOpenDevTools),settingName:"auto-attach-to-created-pages",settingType:"boolean",order:2,defaultValue:!1,options:[{value:!0,title:E(A.autoOpenDevTools)},{value:!1,title:E(A.doNotAutoOpen)}]}),e.Settings.registerSettingExtension({category:"APPEARANCE",storageType:"Synced",title:E(A.disablePaused),settingName:"disable-paused-state-overlay",settingType:"boolean",defaultValue:!1}),i.Toolbar.registerToolbarItem({loadItem:async()=>(await x()).InspectorMain.NodeIndicator.instance(),order:2,location:"main-toolbar-left"}),i.Toolbar.registerToolbarItem({loadItem:async()=>(await x()).OutermostTargetSelector.OutermostTargetSelector.instance(),order:98,location:"main-toolbar-right",experiment:"outermost-target-selector"}),i.Toolbar.registerToolbarItem({loadItem:async()=>(await x()).OutermostTargetSelector.OutermostTargetSelector.instance(),order:98,location:"main-toolbar-right",showLabel:void 0,condition:void 0,separator:void 0,actionId:void 0,experiment:"outermost-target-selector"});const I={issues:"Issues",showIssues:"Show Issues"},M=t.i18n.registerUIStrings("panels/issues/issues-meta.ts",I),D=t.i18n.getLazilyComputedLocalizedString.bind(void 0,M);let C;async function L(){return C||(C=await import("../../panels/issues/issues.js")),C}i.ViewManager.registerViewExtension({location:"drawer-view",id:"issues-pane",title:D(I.issues),commandPrompt:D(I.showIssues),order:100,persistence:"closeable",loadView:async()=>new((await L()).IssuesPane.IssuesPane)}),e.Revealer.registerRevealer({contextTypes:()=>[n.Issue.Issue],destination:e.Revealer.RevealerDestination.ISSUES_VIEW,loadRevealer:async()=>new((await L()).IssueRevealer.IssueRevealer)});const V={throttling:"Throttling",showThrottling:"Show Throttling",goOffline:"Go offline",device:"device",throttlingTag:"throttling",enableSlowGThrottling:"Enable slow `3G` throttling",enableFastGThrottling:"Enable fast `3G` throttling",goOnline:"Go online"},O=t.i18n.registerUIStrings("panels/mobile_throttling/mobile_throttling-meta.ts",V),F=t.i18n.getLazilyComputedLocalizedString.bind(void 0,O);let U;async function _(){return U||(U=await import("../../panels/mobile_throttling/mobile_throttling.js")),U}i.ViewManager.registerViewExtension({location:"settings-view",id:"throttling-conditions",title:F(V.throttling),commandPrompt:F(V.showThrottling),order:35,loadView:async()=>new((await _()).ThrottlingSettingsTab.ThrottlingSettingsTab),settings:["custom-network-conditions"]}),i.ActionRegistration.registerActionExtension({actionId:"network-conditions.network-offline",category:"NETWORK",title:F(V.goOffline),loadActionDelegate:async()=>new((await _()).ThrottlingManager.ActionDelegate),tags:[F(V.device),F(V.throttlingTag)]}),i.ActionRegistration.registerActionExtension({actionId:"network-conditions.network-low-end-mobile",category:"NETWORK",title:F(V.enableSlowGThrottling),loadActionDelegate:async()=>new((await _()).ThrottlingManager.ActionDelegate),tags:[F(V.device),F(V.throttlingTag)]}),i.ActionRegistration.registerActionExtension({actionId:"network-conditions.network-mid-tier-mobile",category:"NETWORK",title:F(V.enableFastGThrottling),loadActionDelegate:async()=>new((await _()).ThrottlingManager.ActionDelegate),tags:[F(V.device),F(V.throttlingTag)]}),i.ActionRegistration.registerActionExtension({actionId:"network-conditions.network-online",category:"NETWORK",title:F(V.goOnline),loadActionDelegate:async()=>new((await _()).ThrottlingManager.ActionDelegate),tags:[F(V.device),F(V.throttlingTag)]}),e.Settings.registerSettingExtension({storageType:"Synced",settingName:"custom-network-conditions",settingType:"array",defaultValue:[]});const B={showNetwork:"Show Network",network:"Network",showNetworkRequestBlocking:"Show Network request blocking",networkRequestBlocking:"Network request blocking",showNetworkConditions:"Show Network conditions",networkConditions:"Network conditions",diskCache:"disk cache",networkThrottling:"network throttling",showSearch:"Show Search",search:"Search",recordNetworkLog:"Record network log",stopRecordingNetworkLog:"Stop recording network log",hideRequestDetails:"Hide request details",colorcodeResourceTypes:"Color-code resource types",colorCode:"color code",resourceType:"resource type",colorCodeByResourceType:"Color code by resource type",useDefaultColors:"Use default colors",groupNetworkLogByFrame:"Group network log by frame",netWork:"network",frame:"frame",group:"group",groupNetworkLogItemsByFrame:"Group network log items by frame",dontGroupNetworkLogItemsByFrame:"Don't group network log items by frame",clear:"Clear network log",addNetworkRequestBlockingPattern:"Add network request blocking pattern",removeAllNetworkRequestBlockingPatterns:"Remove all network request blocking patterns"},z=t.i18n.registerUIStrings("panels/network/network-meta.ts",B),W=t.i18n.getLazilyComputedLocalizedString.bind(void 0,z);let q;async function j(){return q||(q=await import("../../panels/network/network.js")),q}function K(e){return void 0===q?[]:e(q)}i.ViewManager.registerViewExtension({location:"panel",id:"network",commandPrompt:W(B.showNetwork),title:W(B.network),order:40,condition:o.Runtime.conditions.reactNativeUnstableNetworkPanel,loadView:async()=>(await j()).NetworkPanel.NetworkPanel.instance()}),i.ViewManager.registerViewExtension({location:"drawer-view",id:"network.blocked-urls",commandPrompt:W(B.showNetworkRequestBlocking),title:W(B.networkRequestBlocking),persistence:"closeable",order:60,loadView:async()=>new((await j()).BlockedURLsPane.BlockedURLsPane)}),i.ViewManager.registerViewExtension({location:"drawer-view",id:"network.config",commandPrompt:W(B.showNetworkConditions),title:W(B.networkConditions),persistence:"closeable",order:40,tags:[W(B.diskCache),W(B.networkThrottling),t.i18n.lockedLazyString("useragent"),t.i18n.lockedLazyString("user agent"),t.i18n.lockedLazyString("user-agent")],loadView:async()=>(await j()).NetworkConfigView.NetworkConfigView.instance()}),i.ViewManager.registerViewExtension({location:"network-sidebar",id:"network.search-network-tab",commandPrompt:W(B.showSearch),title:W(B.search),persistence:"permanent",loadView:async()=>(await j()).NetworkPanel.SearchNetworkView.instance()}),i.ActionRegistration.registerActionExtension({actionId:"network.toggle-recording",category:"NETWORK",iconClass:"record-start",toggleable:!0,toggledIconClass:"record-stop",toggleWithRedColor:!0,contextTypes:()=>K((e=>[e.NetworkPanel.NetworkPanel])),loadActionDelegate:async()=>new((await j()).NetworkPanel.ActionDelegate),options:[{value:!0,title:W(B.recordNetworkLog)},{value:!1,title:W(B.stopRecordingNetworkLog)}],bindings:[{shortcut:"Ctrl+E",platform:"windows,linux"},{shortcut:"Meta+E",platform:"mac"}]}),i.ActionRegistration.registerActionExtension({actionId:"network.clear",category:"NETWORK",title:W(B.clear),iconClass:"clear",loadActionDelegate:async()=>new((await j()).NetworkPanel.ActionDelegate),contextTypes:()=>K((e=>[e.NetworkPanel.NetworkPanel])),bindings:[{shortcut:"Ctrl+L"},{shortcut:"Meta+K",platform:"mac"}]}),i.ActionRegistration.registerActionExtension({actionId:"network.hide-request-details",category:"NETWORK",title:W(B.hideRequestDetails),contextTypes:()=>K((e=>[e.NetworkPanel.NetworkPanel])),loadActionDelegate:async()=>new((await j()).NetworkPanel.ActionDelegate),bindings:[{shortcut:"Esc"}]}),i.ActionRegistration.registerActionExtension({actionId:"network.search",category:"NETWORK",title:W(B.search),contextTypes:()=>K((e=>[e.NetworkPanel.NetworkPanel])),loadActionDelegate:async()=>new((await j()).NetworkPanel.ActionDelegate),bindings:[{platform:"mac",shortcut:"Meta+F",keybindSets:["devToolsDefault","vsCode"]},{platform:"windows,linux",shortcut:"Ctrl+F",keybindSets:["devToolsDefault","vsCode"]}]}),i.ActionRegistration.registerActionExtension({actionId:"network.add-network-request-blocking-pattern",category:"NETWORK",title:W(B.addNetworkRequestBlockingPattern),iconClass:"plus",contextTypes:()=>K((e=>[e.BlockedURLsPane.BlockedURLsPane])),loadActionDelegate:async()=>new((await j()).BlockedURLsPane.ActionDelegate)}),i.ActionRegistration.registerActionExtension({actionId:"network.remove-all-network-request-blocking-patterns",category:"NETWORK",title:W(B.removeAllNetworkRequestBlockingPatterns),iconClass:"clear",contextTypes:()=>K((e=>[e.BlockedURLsPane.BlockedURLsPane])),loadActionDelegate:async()=>new((await j()).BlockedURLsPane.ActionDelegate)}),e.Settings.registerSettingExtension({category:"NETWORK",storageType:"Synced",title:W(B.colorcodeResourceTypes),settingName:"network-color-code-resource-types",settingType:"boolean",defaultValue:!1,tags:[W(B.colorCode),W(B.resourceType)],options:[{value:!0,title:W(B.colorCodeByResourceType)},{value:!1,title:W(B.useDefaultColors)}]}),e.Settings.registerSettingExtension({category:"NETWORK",storageType:"Synced",title:W(B.groupNetworkLogByFrame),settingName:"network.group-by-frame",settingType:"boolean",defaultValue:!1,tags:[W(B.netWork),W(B.frame),W(B.group)],options:[{value:!0,title:W(B.groupNetworkLogItemsByFrame)},{value:!1,title:W(B.dontGroupNetworkLogItemsByFrame)}]}),i.ViewManager.registerLocationResolver({name:"network-sidebar",category:"NETWORK",loadResolver:async()=>(await j()).NetworkPanel.NetworkPanel.instance()}),i.ContextMenu.registerProvider({contextTypes:()=>[a.NetworkRequest.NetworkRequest,a.Resource.Resource,r.UISourceCode.UISourceCode],loadProvider:async()=>(await j()).NetworkPanel.NetworkPanel.instance(),experiment:void 0}),e.Revealer.registerRevealer({contextTypes:()=>[a.NetworkRequest.NetworkRequest],destination:e.Revealer.RevealerDestination.NETWORK_PANEL,loadRevealer:async()=>new((await j()).NetworkPanel.RequestRevealer)}),e.Revealer.registerRevealer({contextTypes:()=>[s.UIRequestLocation.UIRequestLocation],destination:void 0,loadRevealer:async()=>new((await j()).NetworkPanel.RequestLocationRevealer)}),e.Revealer.registerRevealer({contextTypes:()=>[s.NetworkRequestId.NetworkRequestId],destination:e.Revealer.RevealerDestination.NETWORK_PANEL,loadRevealer:async()=>new((await j()).NetworkPanel.RequestIdRevealer)}),e.Revealer.registerRevealer({contextTypes:()=>[s.UIFilter.UIRequestFilter],destination:e.Revealer.RevealerDestination.NETWORK_PANEL,loadRevealer:async()=>new((await j()).NetworkPanel.NetworkLogWithFilterRevealer)});const G={title:"⚛️ Components",command:"Show React DevTools Components panel"},H=t.i18n.registerUIStrings("panels/react_devtools/react_devtools_components-meta.ts",G),J=t.i18n.getLazilyComputedLocalizedString.bind(void 0,H);let Q;i.ViewManager.registerViewExtension({location:"panel",id:"react-devtools-components",title:J(G.title),commandPrompt:J(G.command),persistence:"permanent",order:1e3,loadView:async()=>new((await async function(){return Q||(Q=await import("../../panels/react_devtools/react_devtools.js")),Q}()).ReactDevToolsComponentsView.ReactDevToolsComponentsViewImpl)});const Y={title:"⚛️ Profiler",command:"Show React DevTools Profiler panel"},$=t.i18n.registerUIStrings("panels/react_devtools/react_devtools_profiler-meta.ts",Y),X=t.i18n.getLazilyComputedLocalizedString.bind(void 0,$);let Z;i.ViewManager.registerViewExtension({location:"panel",id:"react-devtools-profiler",title:X(Y.title),commandPrompt:X(Y.command),persistence:"permanent",order:1e3,loadView:async()=>new((await async function(){return Z||(Z=await import("../../panels/react_devtools/react_devtools.js")),Z}()).ReactDevToolsProfilerView.ReactDevToolsProfilerViewImpl)});const ee={rnWelcome:"Welcome",showRnWelcome:"Show React Native Welcome panel",debuggerBrandName:"React Native DevTools"},te=t.i18n.registerUIStrings("panels/rn_welcome/rn_welcome-meta.ts",ee),oe=t.i18n.getLazilyComputedLocalizedString.bind(void 0,te);let ie;i.ViewManager.registerViewExtension({location:"panel",id:"rn-welcome",title:oe(ee.rnWelcome),commandPrompt:oe(ee.showRnWelcome),order:-10,persistence:"permanent",loadView:async()=>(await async function(){return ie||(ie=await import("../../panels/rn_welcome/rn_welcome.js")),ie}()).RNWelcome.RNWelcomeImpl.instance({debuggerBrandName:oe(ee.debuggerBrandName),showBetaLabel:!1,showDocs:!0}),experiment:"react-native-specific-ui"});const ne={performance:"Performance",showPerformance:"Show Performance",javascriptProfiler:"JavaScript Profiler",showJavascriptProfiler:"Show JavaScript Profiler",record:"Record",stop:"Stop",startProfilingAndReloadPage:"Start profiling and reload page",saveProfile:"Save profile…",loadProfile:"Load profile…",previousFrame:"Previous frame",nextFrame:"Next frame",showRecentTimelineSessions:"Show recent timeline sessions",previousRecording:"Previous recording",nextRecording:"Next recording",hideChromeFrameInLayersView:"Hide `chrome` frame in Layers view",startStopRecording:"Start/stop recording"},ae=t.i18n.registerUIStrings("panels/timeline/timeline-meta.ts",ne),re=t.i18n.getLazilyComputedLocalizedString.bind(void 0,ae);let se,le;async function ce(){return se||(se=await import("../../panels/timeline/timeline.js")),se}async function de(){return le||(le=await import("../../panels/profiler/profiler.js")),le}function ge(e){return void 0===se?[]:e(se)}i.ViewManager.registerViewExtension({location:"panel",id:"timeline",title:re(ne.performance),commandPrompt:re(ne.showPerformance),order:50,experiment:"enable-performance-panel",loadView:async()=>(await ce()).TimelinePanel.TimelinePanel.instance()}),i.ViewManager.registerViewExtension({location:"panel",id:"js-profiler",title:re(ne.javascriptProfiler),commandPrompt:re(ne.showJavascriptProfiler),persistence:"permanent",order:65,experiment:"js-profiler-temporarily-enable",loadView:async()=>(await de()).ProfilesPanel.JSProfilerPanel.instance()}),i.ActionRegistration.registerActionExtension({actionId:"timeline.toggle-recording",category:"PERFORMANCE",iconClass:"record-start",toggleable:!0,toggledIconClass:"record-stop",toggleWithRedColor:!0,contextTypes:()=>ge((e=>[e.TimelinePanel.TimelinePanel])),loadActionDelegate:async()=>new((await ce()).TimelinePanel.ActionDelegate),options:[{value:!0,title:re(ne.record)},{value:!1,title:re(ne.stop)}],bindings:[{platform:"windows,linux",shortcut:"Ctrl+E"},{platform:"mac",shortcut:"Meta+E"}]}),i.ActionRegistration.registerActionExtension({actionId:"timeline.record-reload",iconClass:"refresh",contextTypes:()=>ge((e=>[e.TimelinePanel.TimelinePanel])),category:"PERFORMANCE",title:re(ne.startProfilingAndReloadPage),loadActionDelegate:async()=>new((await ce()).TimelinePanel.ActionDelegate),bindings:[{platform:"windows,linux",shortcut:"Ctrl+Shift+E"},{platform:"mac",shortcut:"Meta+Shift+E"}]}),i.ActionRegistration.registerActionExtension({category:"PERFORMANCE",actionId:"timeline.save-to-file",contextTypes:()=>ge((e=>[e.TimelinePanel.TimelinePanel])),loadActionDelegate:async()=>new((await ce()).TimelinePanel.ActionDelegate),title:re(ne.saveProfile),bindings:[{platform:"windows,linux",shortcut:"Ctrl+S"},{platform:"mac",shortcut:"Meta+S"}]}),i.ActionRegistration.registerActionExtension({category:"PERFORMANCE",actionId:"timeline.load-from-file",contextTypes:()=>ge((e=>[e.TimelinePanel.TimelinePanel])),loadActionDelegate:async()=>new((await ce()).TimelinePanel.ActionDelegate),title:re(ne.loadProfile),bindings:[{platform:"windows,linux",shortcut:"Ctrl+O"},{platform:"mac",shortcut:"Meta+O"}]}),i.ActionRegistration.registerActionExtension({actionId:"timeline.jump-to-previous-frame",category:"PERFORMANCE",title:re(ne.previousFrame),contextTypes:()=>ge((e=>[e.TimelinePanel.TimelinePanel])),loadActionDelegate:async()=>new((await ce()).TimelinePanel.ActionDelegate),bindings:[{shortcut:"["}]}),i.ActionRegistration.registerActionExtension({actionId:"timeline.jump-to-next-frame",category:"PERFORMANCE",title:re(ne.nextFrame),contextTypes:()=>ge((e=>[e.TimelinePanel.TimelinePanel])),loadActionDelegate:async()=>new((await ce()).TimelinePanel.ActionDelegate),bindings:[{shortcut:"]"}]}),i.ActionRegistration.registerActionExtension({actionId:"timeline.show-history",loadActionDelegate:async()=>new((await ce()).TimelinePanel.ActionDelegate),category:"PERFORMANCE",title:re(ne.showRecentTimelineSessions),contextTypes:()=>ge((e=>[e.TimelinePanel.TimelinePanel])),bindings:[{platform:"windows,linux",shortcut:"Ctrl+H"},{platform:"mac",shortcut:"Meta+Y"}]}),i.ActionRegistration.registerActionExtension({actionId:"timeline.previous-recording",category:"PERFORMANCE",loadActionDelegate:async()=>new((await ce()).TimelinePanel.ActionDelegate),title:re(ne.previousRecording),contextTypes:()=>ge((e=>[e.TimelinePanel.TimelinePanel])),bindings:[{platform:"windows,linux",shortcut:"Alt+Left"},{platform:"mac",shortcut:"Meta+Left"}]}),i.ActionRegistration.registerActionExtension({actionId:"timeline.next-recording",category:"PERFORMANCE",loadActionDelegate:async()=>new((await ce()).TimelinePanel.ActionDelegate),title:re(ne.nextRecording),contextTypes:()=>ge((e=>[e.TimelinePanel.TimelinePanel])),bindings:[{platform:"windows,linux",shortcut:"Alt+Right"},{platform:"mac",shortcut:"Meta+Right"}]}),i.ActionRegistration.registerActionExtension({actionId:"profiler.js-toggle-recording",category:"JAVASCRIPT_PROFILER",title:re(ne.startStopRecording),iconClass:"record-start",toggleable:!0,toggledIconClass:"record-stop",toggleWithRedColor:!0,contextTypes:()=>void 0===le?[]:(e=>[e.ProfilesPanel.JSProfilerPanel])(le),loadActionDelegate:async()=>(await de()).ProfilesPanel.JSProfilerPanel.instance(),bindings:[{platform:"windows,linux",shortcut:"Ctrl+E"},{platform:"mac",shortcut:"Meta+E"}]}),e.Settings.registerSettingExtension({category:"PERFORMANCE",storageType:"Synced",title:re(ne.hideChromeFrameInLayersView),settingName:"frame-viewer-hide-chrome-window",settingType:"boolean",defaultValue:!1}),e.Linkifier.registerLinkifier({contextTypes:()=>ge((e=>[e.CLSLinkifier.CLSRect])),loadLinkifier:async()=>(await ce()).CLSLinkifier.Linkifier.instance()}),i.ContextMenu.registerItem({location:"timelineMenu/open",actionId:"timeline.load-from-file",order:10}),i.ContextMenu.registerItem({location:"timelineMenu/open",actionId:"timeline.save-to-file",order:15}),l.rnPerfMetrics.registerPerfMetricsGlobalPostMessageHandler(),l.rnPerfMetrics.registerGlobalErrorReporting(),l.rnPerfMetrics.setLaunchId(o.Runtime.Runtime.queryParam("launchId")),l.rnPerfMetrics.entryPointLoadingStarted("rn_fusebox");const me={networkTitle:"React Native",showReactNative:"Show React Native",sendFeedback:"[FB-only] Send feedback",connectionStatusDisconnectedTooltip:"Debugging connection was closed",connectionStatusDisconnectedLabel:"Reconnect DevTools"},we=t.i18n.registerUIStrings("entrypoints/rn_fusebox/rn_fusebox.ts",me),ue=t.i18n.getLazilyComputedLocalizedString.bind(void 0,we);i.ViewManager.maybeRemoveViewExtension("network.blocked-urls"),i.ViewManager.maybeRemoveViewExtension("network.config"),i.ViewManager.maybeRemoveViewExtension("coverage"),i.ViewManager.maybeRemoveViewExtension("linear-memory-inspector"),i.ViewManager.maybeRemoveViewExtension("rendering"),i.ViewManager.maybeRemoveViewExtension("issues-pane"),i.ViewManager.maybeRemoveViewExtension("sensors"),i.ViewManager.maybeRemoveViewExtension("devices"),i.ViewManager.maybeRemoveViewExtension("emulation-locations"),i.ViewManager.maybeRemoveViewExtension("throttling-conditions"),d.RNExperimentsImpl.setIsReactNativeEntryPoint(!0),d.RNExperimentsImpl.Instance.enableExperimentsByDefault(["js-heap-profiler-enable","react-native-specific-ui"]),document.addEventListener("visibilitychange",(()=>{l.rnPerfMetrics.browserVisibilityChanged(document.visibilityState)}));class pe extends a.SDKModel.SDKModel{constructor(e){super(e),l.rnPerfMetrics.fuseboxSetClientMetadataStarted(),e.fuseboxClientAgent().invoke_setClientMetadata().then((e=>{const t=e.getError(),o=!t;l.rnPerfMetrics.fuseboxSetClientMetadataFinished(o,t)})).catch((e=>{l.rnPerfMetrics.fuseboxSetClientMetadataFinished(!1,e)}))}}let ve;if(a.SDKModel.SDKModel.register(pe,{capabilities:0,autostart:!0,early:!0}),i.ViewManager.registerViewExtension({location:"navigator-view",id:"navigator-network",title:ue(me.networkTitle),commandPrompt:ue(me.showReactNative),order:2,persistence:"permanent",loadView:async()=>(await async function(){return ve||(ve=await import("../../panels/sources/sources.js")),ve}()).SourcesNavigator.NetworkNavigatorView.instance()}),self.runtime=o.Runtime.Runtime.instance({forceNew:!0}),new c.MainImpl.MainImpl,globalThis.FB_ONLY__reactNativeFeedbackLink){const e=globalThis.FB_ONLY__reactNativeFeedbackLink,t="react-native-send-feedback",o={handleAction:(o,i)=>i===t&&(l.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(e),!0)};i.ActionRegistration.registerActionExtension({category:"GLOBAL",actionId:t,title:ue(me.sendFeedback),loadActionDelegate:async()=>o,iconClass:"bug"}),i.Toolbar.registerToolbarItem({location:"main-toolbar-right",actionId:t,showLabel:!0})}class he extends a.TargetManager.Observer{#e=new i.Toolbar.ToolbarButton("");constructor(){super(),this.#e.setVisible(!1),this.#e.element.classList.add("fusebox-connection-status"),this.#e.addEventListener("Click",this.onClick.bind(this)),a.TargetManager.TargetManager.instance().observeTargets(this,{scoped:!0})}targetAdded(e){this.#t()}targetRemoved(e){this.#t()}#t(){const e=a.TargetManager.TargetManager.instance().rootTarget();this.#e.setTitle(ue(me.connectionStatusDisconnectedTooltip)()),this.#e.setText(ue(me.connectionStatusDisconnectedLabel)()),this.#e.setVisible(!e)}onClick(){window.location.reload()}item(){return this.#e}}const ye=new he;i.Toolbar.registerToolbarItem({location:"main-toolbar-right",loadItem:async()=>ye});new class{constructor(e){e.observeModels(a.ReactNativeApplicationModel.ReactNativeApplicationModel,this)}modelAdded(e){e.ensureEnabled(),e.addEventListener("MetadataUpdated",this.#o,this)}modelRemoved(e){e.removeEventListener("MetadataUpdated",this.#o,this)}#o(e){const{appDisplayName:t,deviceName:o}=e.data;null!=t&&(document.title=`${t}${null!=o?` (${o})`:""} - React Native DevTools`)}}(a.TargetManager.TargetManager.instance()),l.rnPerfMetrics.entryPointLoadingFinished("rn_fusebox");
