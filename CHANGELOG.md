# Change Log

Also: [Deployment history](https://github.com/hippware/tr-wiki/wiki/Client-deployment-history)

Ticket numbers refer to the ticket tracker for this project if not specified.

# 4.33.0 - 2019 Dec 5

**React Native upgrade to 0.61.5**

* Update: bugsnag-react-native (PR #4393), react-native-mixpanel (PR #4401)
  * @react-native-community/push-notification-ios (PR #4444), mobx (PR #4479)
  * @types/jest (PR #4493), @babel/plugin-proposal-decorators (PR #4494)
  * @babel/plugin-transform-flow-strip-types (PR #4495), husky (PR #4496)
  * libphonenumber-js (PR #4497), react-native-fbsdk (PR #4498)
  * jetifier (PR #4499), react-native (PR #4501)
  * react-native-gesture-handler (PR #4503), @types/lodash (PR #4504)
  * react-native-device-info (PR #4505), @types/react (PR #4506)
  * @babel/preset-typescript (PR #4513)
  * @react-native-community/async-storage (PR #4514)
  * react-native-permissions (PR #4516), iOS Pods (PR #4516)
* [dev] Use `updatedAt` in presence subscription (#3949)
* Ignore activity data points with low confidence (#4475)
  * Action avatar flashing off and on (#4353)
  * Swipe-kill and screen lock removes mode of transport (#3950)
* Tidy/rename profile location variables (PR #4520)
* Prevent 'Find Friends' prompt after every codepush (#3840)

# 4.32.4 - 2019 Nov 28

* Message screen is not loaded for some accounts (#4471)
* Location Profile: Tap and drag issues with bottom card (Rework #4459)
* Add 20 px margin to bottom of location profile (#4473)
* Update: @babel/runtime (PR #4477), @babel/node (PR #4478)
  * @react-native-community/netinfo (PR #4480)
  * react-test-renderer (PR #4482)
* Gap seen with dragging animation (#4432)
  * Remove animation overshoot (PR #4485)
* Remove no longed used `loadRelations`. (PR #4488)
* reconnect_fail: GraphQL error: already authenticated (#4452)
  * Don't authenticate if already logged in. (PR #4489)

# 4.32.3 - 2019 Nov 22

* Activity indicator appears smaller (#4429, PR #4456, PR #4466)
  * Revert LocationAvatar.tsx to 4.32.0 version. (PR #4470)
* Messaging CTA should exist on the user card. (#3962, PR #4468)
  * Reduce the size of the message badge on ProfileDetail (PR #4461)
* App crash when navigating to Updates (#4458)
* [android] Back button should exit app (#3994)
* Back button doesn't work for bot details (#4464)
* Remove some yellowbox warnings (PR #4463)
* Location Profile: Tap and drag issues with bottom card (#4459)

# 4.32.2 - 2019 Nov 20

* Messaging CTA should exist on the user card. (#3962)
  * Don't show the message count on MessageButton (PR #4433)
  * Pan improvements (PR #4449)
* Initialise singleton earlier. Always call configure(). (PR #4435)
  * Clean install results in an infinite loader on map (#4428)
* Invisible mode might prematurely end after codepush or upgrade (#3753)
  * Store user preferences that remain after upgrade or codepush (#4410)
* Argument "id" has invalid value "YouCard". (#4434)
* [dev] Can't perform a React state update on an unmounted component. (#4438)
* Activity indicator appears smaller (#4429)
* Update: https-proxy-agent (PR #4439), prettier (PR #4441)
  * mobx-react (PR #4442), react-dom (PR #4445), ts-node (PR #4446)
* Finally fixing the bottom card swipe logic... (#4212)
  * Pan improvements (PR #4449)
* Defaults for location info on ProfileDetails preview (#4413)
* Implement own MST logger which prints args. (PR #4453)
* Gap seen with dragging animation (#4432)
* Notifications: Infinite loader on Requests tab (#4191)

# 4.32.1 - 2019 Nov 14

* Clear search store on logout. (PR #4387)
  * Fix: Failed to resolve reference '...' to type 'Profile' (#4322)
* Disambiguate auth/code-expired in bugsnags. (PR #4386)
* Messaging CTA should exist on the user card. (#3962, multiple PRs)
* Update: @babel/node (PR #4390), @babel/core (PR #4391)
  * @types/react (PR #4392), @storybook/react-native (PR #4394)
  * mobx-state-tree and typescript (PR #4395), @types/lodash (PR #4397)
  * phoenix (PR #4398), ts-node (PR #4399)
  * react-test-renderer (PR #4403), @types/jest (PR #4405),
  * react-dom (PR #4406)
* Error in Connectivity.tsx:140: Only promises can be yielded to `async` (#4385)
* Finally fixing the bottom card swipe logic (#4212, multiple PRs)
  * New UI preview -> full view drag animation (#4420)
* Dynamic location upload rate (#4274)
  * RNBGL android headless js mode (PR #4377, PR #4416)
  * headless_task_fail in LocationStore - Singleton not initialised (#4415)
* TypeError in third-party/wocky-client/src/model/Profile.ts:162 (#4422)
* Don't continually persist location if backgrounded-ed. (PR #4424)
  * [dev] Don't rebuild and persist MST tree every 3 seconds (#4324)
* Don't create store if already exists. (PR #4425)

# 4.32.0 - 2019 Nov 7

**React Native upgrade to 0.61.4**

* TypeError in src/components/common/Avatar.tsx:97 (#4354)
* Remove LocationStore debug, debugSounds options. (PR #4356)
* New UI screen to list all friends (#4325)
* Update: react-native (#4371)
  * react-native-background-geolocation (PR #4360)
  * metro-react-native-babel-preset (PR #4362), @types/jest (PR #4363)
  * @types/react-test-renderer (PR #4364)
  * @react-native-community/netinfo (PR #4366)
  * react-native-gesture-handler (PR #4367)
  * bugsnag-sourcemaps (PR #4368), react-native-device-info (PR #4369)
* Action avatar flashing off and on (#4353)
* [dev] Avoid double RNBGL service and other code execution (#4263)
* Fix tests: Define `__DEV__` (as true) (PR #4380)
* Work-in-progress: Finally fixing the bottom card swipe logic (#4212)
* Tidy LocationStore (PR #4381, PR #4382)

# 4.31.0 - 2019 Oct 31

* Update: react-navigation-stack (PR #4332), assert (PR #4335)
  * @babel/runtime (PR #4336), pretty-quick (PR #4337)
  * react-native-contacts (PR #4328), ts-unused-exports (removed, PR #4330)
  * async-storage (PR #4344), react-native-image-crop-picker (PR #4345)
  * react-native-config (PR #4343)
* List all friends in Header Widget (#3960)
* Replace deprecated `SendMessageInput` (PR #4347)
* New UI screen to list all friends (#4325)
* TypeError in Profile.ts:192: null is not an object (#4351)
* Including unread message count in header widget. (#3959)

# 4.30.2 - 2019 Nov 7

* Update: react-native-background-geolocation 3.3.2
  * Fix an android NullPointerException.

# 4.30.1 - 2019 Oct 29

* [dev] Make ownProfile.location as computed from locationStore (#4264)
* Messages: Unable to scroll to bottom of message list (#4321)
* Fixes for: Map Options CTA (#4185)
* Log special "complete registration" event (PR #4339)
  * Implementing Facebook SDK For Facebook Ad Tracking (#4278)

# 4.30.0 - 2019 Oct 24

* Revert: Enable debugging features for PROD.
* Speculative fix: IllegalViewOperationException in Layout.java (#4262)
* Update: @babel/core (PR #4303), @babel/node (PR #4297)
  * @babel/plugin-proposal-object-rest-spread (PR #4311)
  * @babel/plugin-transform-flow-strip-types (PR #4299)
  * @types/lodash (PR #4292), @types/phoenix (PR #4273)
  * graphql (PR #4295), husky (PR #4291), libphonenumber-js (PR #4306)
  * mobx (PR #4298), react-dom (PR #4310)
  * react-navigation-stack (PR #4305)
  * react-native-background-geolocation (PR #4296)
  * react-native-country-picker-modal (PR #4300)
  * react-native-device-info (PR #4308)
  * react-native-localize (PR #4269, PR #4307, PR #4317)
  * react-native-maps (PR #4293), react-native-swiper (PR #4272)
  * react-test-renderer (PR #4270), tslint-react (PR #4294)
* Remove "Current Location" CTA (#4213)
* Map Options CTA (#4185)
* Error: src/components/SignIn.tsx:45 Unknown country: AQ (#4287)
* First app launch removes location sharers for some users (#4313)
* Misc locationstore tweaks (PR #4316)
* Add 'Updates' to BottomMenu (#4289)
* Implementing Facebook SDK For Facebook Ad Tracking (#4278, PR #4318)
  * Add facebook SDK (PR #4279, PR #4290)

# 4.29.2 - 2019 Oct 24

Special debug version for Prod.

* Enable debugging features for PROD.
* Work-around for Origin Connection Time-out (jitpack/jitpack.io#3973)

# 4.29.1 - 2019 Oct 17

* Who's Here: List only displays 1 visitor (#4276)
* iOS status bar has white text (#4281)

# 4.29.0 - 2019 Oct 15

* [android] Live Location: Select Friends button doesn't function (#4209)
* [android] Gap on an empty Who's Here list (#4129)
* Temporarily opt out of iOS dark mode (#4258)
* Fix: App crash with each successful login (#4251)

# 4.28.0 - 2019 Oct 10

**React Native upgrade to 0.61.2**

* Update: react-native-router-flux, react-native-swiper (PR #4235)
  * @storybook/react-native (PR #4238), @types/lodash (PR #4239)
  * @types/react (PR #4240), rn-reanimated (PR #4244)
  * react-native-country-picker-modal (PR #4243)
* [dev] remove ViewPagerAndroid usage (#4226, PR #4235)
* Cards with no information (#3961)
* Fix AppCenter builds on XCode 11.1 (PR #4247)
* Upgrade to React Native 0.61.2 (#4248)
  * [android] Online status needs to be in front of avatar (#4228)
  * [android] Cards are transparent (#4229)
  * [android] Notification screen: Selected tab does not display (#4230)
  * [android] Add boxes around the invisible mode options (#4231)
  * [android] Missing toggle on share live location screen (#4232)
* [android] Flags missing on country picker (#4227)
* Invalid UIBackgroundFetchResult 'UIBackgroundFetchResultNoData' (#4169)

# 4.27.1 - 2019 Oct 4

* Fix broken permissions (PR #4225)
* "Open Settings" doesn't go away once user changes settings (#4224)

# 4.27.0 - 2019 Oct 3

**React Native upgrade to 0.61.1**

* [dev] Upgrade RN to 0.61 (#4184)
* java.lang.SecurityException: android.permission.READ_PROFILE (#4194)
* "Something went wrong" when user posts on a location (#4200)
* [ios] Note & Photo buttons are missing on ios (#4164)
* Update: react-native-swiper (PR #4206), netinfo (PR #4205)
  * react-dom (PR #4204), husky (PR #4203),
  * react-native-permissions (#4163, PR #4208)
  * react-native-swiper (PR #4221)
  * mobx, mobx-state-tree, mobx-react-lite (PR #4223)
* Remove unnecessary test dependencies (PR #4210)
  * Remove: form-data, node-fetch, promise
* Speculative fixes:
  * reconnect_fail: null is not an object (#3946)
  * TypeError in .../wocky-client/src/model/OwnProfile.ts:194 (#4215)
  * reconnect_fail in .../wocky-client/src/model/OwnProfile.ts:204 (#4216)
* Fix: Sometimes using stale data (#4183)
* Fix: [dev] bluetooth permissions? (#4163)
* Added more injector hooks and refactored more components (PR #4211)
* Update pods (PR #4219) / [iOS] Convert UIWebView -> WKWebView (#4074)
* scrollToIndex should be used with onScrollToIndexFailed (#4195)

# 4.26.1 - 2019 Sep 26

* Add back `observer` (PR #4189). Fixes PR #4174
  * Switching from Updates to the Request tap crashes the app (#4188)

# 4.26.0 - 2019 Sep 26

* Remove detox (PR #4158)
* [dev] React hooks + mobx-react v6 (#3779, PR #4159)
  * Use RNRF right button setup instead of react-navigation API (PR #4171)
  * Put ReportBot header nav config in Router.tsx (PR #4172)
* Crash on unknown in-app notification type (#4161)
* Fix: Throwing errors without catchers (#4162)
* Error in src/components/LiveLocation/LiveLocationCompose.tsx:95 (#4166)
* Fix false alarms of: Unable to login to the app (#3750)
* Creation Flow: 
  * Emoji screen visible when user taps Pin Location button (#4115)
  * Users are unable to scroll to bottom of emoji selector (#4135)
* Update: react-native-keyboard-aware-scroll-view (PR #4180)
  * graphql (PR #4179), @react-native-community/netinfo (PR #4178)
  * react-native-background-geolocation (PR #4176)
* EXC_BAD_ACCESS in TSHttpService.m:253 (#4029)
* New simplified, strongly typed inject (PR #4174)

* [android] Emoji's on selector are faded (#3534)
  * (Unsure when this was fixed)

# 4.25.0 - 2019 Sep 19

* WIP: [dev] React hooks + mobx-react v6 (#3779)
  * PR #4137, PR #4147, PR #4155
* Update: mobx-react-lite (PR #4145), libphonenumber-js (PR #4144)
  * husky, pretty-quick (PR #4146), plugin-proposal-decorators (PR #4142)
  * @storybook/react-native (PR #4143)
* [dev] wocky-client test improvements (#2839, PR #4149, PR #4153, PR #4154)
* Upgrade RNRF and many other dependencies (#4151)

# 4.24.0 - 2019 Sep 12

* Update: react-native-code-push (PR #4098), react-native-netinfo
  * react-native-pure-jwt (PR #4100), lodash (PR #4097)
  * appcenter-cli (PR #4110), Various pods (PR #4107)
  * @babel/node (PR #4123), apollo-client (PR #4122), 
  * babel-jest (PR #4120), ts-node (PR #4121)
* [android] Remove auto-generated files from patches (PR #4103)
* Error in pushNotifications.ts:27: Native module cannot be null (#4104)
* [RN 0.60] Invisible mode does not work (#4076)
* Get rid of dev warnings after RN 0.60 upgrade (PR #4108)
* [android] Find Friends: When empty, name is showing null (#4096)
* Find Friends: Current friends not showing the Friends button (#3880)
* [dev] [iOS] Convert UIWebView -> WKWebView (#4074)
  * Upgrade react-native-device-info (PR #4107)
  * Use async DeviceInfo methods. (PR #4126)
* Switch to new AsyncStorage (PR #4118)
* Work in progress: [dev] React hooks + mobx-react v6 (#3779, PR #4117)
* "Upload error: Error. Socket is closed" when uploading photo (#4114)
  * Reworks: [dev] image uploads fail with RN0.60 upgrade (#4061)

# 4.23.0 - 2019 Sep 5

**React Native upgrade to 0.60.5**

* React Native 0.60.5 upgrade (#3886, PR #4005)
* [dev] image uploads fail with RN0.60 upgrade (#4061)
* Update lots of components.
* [android] Owners avatar is a google pin (#4018)

# 4.22.1 - 2019 Sep 4

* Speculative fixes:
  * TypeError in src/components/map/AddressBar.tsx:84 (#4078)
  * TypeError in src/store/GeocodingStore.ts:94 (#4077)
* [android] RNBGL `foregroundService` to be true (#4087)
* Error in MainActivity (#3957)
* e in src/components/event-cards/EventCard.tsx:39 (#4079)

# 4.22.0 - 2019 Aug 29

* Tweak memoryWarning listener. (PR #4056)
* [dev] React hooks + mobx-react v6 (#3779, PR #4054, PR #4062)
* RNBGL debugging for invisible/standalone mode. (PR #4059, PR #4063)
* Images sent from Android are rotated when received on iPhone (#3941)
* [android] Open from the Play Store seems to crash on initial tap (#4070)
* More accurate geolocation watching. (PR #4072)
  * [android] Owners pin moves to new location with invisible mode (#4050)
  * [android] Foreground location tracking (invisible mode) is poor (#4065)
* [android] Like the app? screen does not function (#4068)

# 4.21.0 - 2019 Aug 22

* Lag with back caret & pin location (#3991)
* Add AppState memoryWarning listener. (PR #4038)
* [Android] Add drop shadow (#3784)
* [dev] Update to RNBGL 3.2.0 (#4030)
* TypeError in src/components/BotCompose/BotCompose.tsx:111 (#4027)
* Disable detox tests (PR #4047)
* [android] Configure RNBGL notification channel (#4044)
* Loading screen visible when user taps "Sharing Location" (#4022)

# 4.20.1 - 2019 Aug 16

* Activity indicator is incorrectly positioned. (#4007)
* Hookify BotDetails, AddBotPost (PR #4010)
* [dev] Detox failures should fail the appcenter build (#3905)
* [android] [prod] RNBGL location tracking might be broken (#4011)

# 4.20.0 - 2019 Aug 15

* Support for aspect-preserved images (PR #3979)
  * [dev] [wocky-client] Refactor image downloads (#3955)
* Keep selected avatar at the top/in focus (#3800)
* [android] Remove android build files from patches. (PR #3980)
* Messages: Allow the sharing of non-square images (#3814)
* [android] Configure multidex for API level less than 21. (PR #3992)
* [android] Include manufacturer,model in UA string. (PR #3993)
* Upgrade: react-native-router-flux (RNRF) (PR #3986)
  * Loading screen missing (#3743)
* `yarn policies set-version 1.17.3` (PR #3989)
* [android] Add res/raw/silence.ogg. (PR #3996)
* Pink Shadow needs added to avatar (Rework #3772)
* [android] Splash screen doesn't cover screen (#3887)
* [android] Back caret does not work from visitors area (#3981)
* [android] Menu screen is displaying when user has no friends (#3933)
* Minimalise Location Debug screen (#3965)
* [android] Notification channels (#3995)

# 4.19.2 - 2019 Aug 7

* [ios] [dev] Upload dSYMs to bugsnag (Rework #3929)
* Pink Shadow needs added to avatar (#3772)
* [android] Vertically center "Allow Location Access" screen (#3938)
* [android] Note creation adjustments (#3780)
* Deep link to Who's Here keeps repeating/switching screens (#3967)
* "Something went wrong" when posting image to location profile (#3968)
* Location Profile: Users are unable to edit the Note section (#3970)

# 4.19.1 - 2019 Aug 1

* BlockedUser type doesn't have presence (#3963)

# 4.19.0 - 2019 Aug 1

* Refactor: "Hookify" class-based React components part 2 (PR #3939)
* Presence dot is always 'offline' for self (#3874)
* [ios] Upload dSYMs to bugsnag (#3929)
* Loading screen missing (#3743)
  * [ios] Prettify .xib launch screen (#3951)
* Upload location upon receiving push notification with flag (#3066)

# 4.18.2 - 2019 Jul 26

Speculative experimental release. Not suitable for public use.

* [ios] RNBGL randomly stops uploading location data points (#3926)
  * [ios] rn-splash-screen triggers background crash (#3943)

# 4.18.1 - 2019 Jul 25

* Tweak to location creation - Auto populate the location name (#3094)
* Identify bugsnag user (PR #3932)
* Fix setParams race condition on Android. (PR #3936)
  * [android] Back Caret and/or tapping on map does not function (#3587)
* Conditional footer on friendSearch (PR #3937)
  * [android] Friends Screen: (#3520)
* Mark messages as read (#3866)

# 4.18.0 - 2019 Jul 18

* Firebase testing number was previously logged account (#3873)
* Tweak to location creation - Auto populate the location name (#3094)
* [android] Revert back to single APK. (PR #3912)
* Codepush brick update (PR #3913)
* [android] Firebase dynamic links/invitations (#3567)
* Some more logging and debugging (PR #3919, PR #3922, PR #3923)
* Messages: Allow the sharing of non-square images (#3814)
* [android] Push Notifications & Deep Linking (#3830)

# 4.17.0 - 2019 Jul 11

* Replace react-native-camera-kit (#3836)
* [dev] improve absinthe-socket error messages (#3888)
* Message List: Map visible on user field (#3877)
* Don't upload bugsnag sourcemaps on Prod builds. (PR #3891)
* Auto-follow should work for self (#3766)
* [android] Loader doesn't spin when adding an image (#3620)
* Use StyleSheet.absoluteFill and remove redundancy (PR #3898)
* Offline Banner with logout and app froze (#3819)
* 64-bit android builds (PR #3904)
* Update: bugsnag (PR #3899)
  * react-native-background-geolocation, react-native-contacts
  * react-native-device-info, react-native-localize
  * react-native-mixpanel, react-native-push-notification (PR #3906)

# 4.16.0 - 2019 Jul 5

* [dev] Supress excessive circular dependency warnings (#3885)
* Scrolling on the Notification/Updates screen crashes the app (#3765)
* Update contacts permission text
* Revert disabling "find friends" (Revert #3894)

# 4.15.1 - 2019 Jul 5

* Re-enable bugsnag sourcemaps (PR #3875)
* Re-enable detox (PR #3860)
* Temporarily remove onboarding Find Friends screen (#3894)

# 4.15.0 - 2019 Jul 1

* Fix "Image not sent. Tap to retry." (#3839)
* Temporarily disable bugsnag
* Remove 'latest locations' from location debug screen (#3825)
* 'Codepush brick' plumbing (PR #3864)
* Missing Location: UI changes for "Oops" screen (#3846)
* Clear out old references for prod iOS builds (PR #3871)

4.15.0 (25) - Production only build

* Include rn-config binary in build phases of prod app.
* Add rn-touch-through-view linked binary.

# 4.14.2 - 2019 Jun 27

* [ios] Push Notifications & Deep Linking (#3829)

# 4.14.1 - 2019 Jun 26

* Messages Title should be removed if the user has no messages (#3808)
* Map visible with scroll on Message List (#3809)
* Messages: Message preview needs to be limited to 1 line (#3813)
* Make "until I turn this off" the default option for LL. (#3768)
* Image message uploads lost after nav'ing to other screen (#3810)
* Fix scrolling after bot post (#3754, PR #3849)
* Remove 'server' from deeplink paths (PR #3850)
* Logger is null (#3844)
* Live location - share back (#3769)
* Messages: Message UI tweaks (#3820)
* Temporarily disable detox. (PR #3857)
* Live Location: Tapping on +/- should move marker to duration (#3853)
* Missing Location: UI changes for "Oops" screen (#3846)

# 4.14.0 - 2019 Jun 20

* Messaging: Refresh conversation screen (#3690)
* Image message uploads lost after nav'ing to other screen (#3810)
* Incorporate mobx-react-lite (PR #3812)
* Messaging: Loader for messages (#3807)
* Update detox, applesimutils (PR #3821)
* Connecting/Offline Banner (#3744)
  * Properly disconnect if socket is closed (PR #3823, PR #3826)
* App crash with live location share (#3798)
* Message status displaying (#3818)
* [android] Fix AndroidX build issue (#3832)
* Messages: Text running off the screen for receiving user (#3811)
* Back caret missing on friends search (#3738)
* Header doesn't go away with back caret (#3797)
* Mode of transport should be visible for self. (#3767)
* [android] Pin changes to google pin when invisible (#3777)

# 4.13.2 - 2019 Jun 13

* Adjust padding for activity icons (PR #3796)
* Messaging Business logic (#3691, PR #3781)
* Update Messages screen to new design (#3689, PR #3799, PR #3803)
* Actual location should be at the point of the pin (#3763)

# 4.13.1 - 2019 Jun 6

* Expressing user activity via color/faded avatar (Rework #3658)
  * (PR #3788, PR #3791)
* Better fade header nav config (PR #3787)
  * Back caret missing on friends search (#3738)
  * Missing Header on Location Profile (#3748)
* Split out bicycle and running for user activity (#3756)
* Traffic dumps for client side tests (PR #3790)
* HOTFIX: forDuration calculation

# 4.13.0 - 2019 May 30

* Red boxes in top left corner of map (#3757)
* [dev] Re-enable detox (#2597, PR #3759, PR #3764)
* Splash screen with react-native-splash-screen (PR #3762)
  * Related: Loading screen missing (#3743)
* Expressing user activity via color/faded avatar (#3658)
  * Set "master" timer (PR #3770)

# 4.12.0 - 2019 May 23

* Only try login() if canLogin is true. (PR #3741)
  * Fixes: error_connection in src/store/AuthStore.ts:30 (#3724)
* [dev] Obfuscate wocky magic key (#3104)
* [ios] Take Photo flow has extra step, user stuck in screen (#3717)
* [ios] New push token not generated with login (#3737)
* Scroll to image uploaded on location profile (#3300)
* Showing user activity via user activity indicator (#3672)

# 4.11.0 - 2019 May 16

* 'GraphQL error: User not found' (#3370)
* Implement new available/unavailable presence behaviour (#3663)
  * Bringing back 'blue dot' online presence indicator (#3657)
* Use native tweaked react-native-pure-jwt for JWT signing (PR #3730)
* Auto-center with auto-follow feature isn't staying centered (#3692)

# 4.10.0 - 2019 May 14

* Point Staging app back to `staging.dev.tinyrobot.com`

# 4.9.3 - 2019 May 13

* Migrate users from 3.9.3 to 4.x.x without forced relogin (#3266)
* "Know when friends arrive and depart" should only appear once (#3432)
* Fix geocodingStore access (PR #3719)
  * City, State field is blank after creation flow (Rework #3221)
* Logout doesn't return to the start screen (Rework #3709)
* Who's Here list and count on location does not exceed 10 users (#3683)
* Back caret doesn't work on Who's Here screen (#3721)

# 4.9.2 - 2019 May 9

* Generic router and onboarding improvements (PR #3714)
  * [dev] Remove onboarded from clientData (#3713)
  * Logout doesn't return to the start screen (#3709)
  * User taken to the "Let's get started!" screen with back caret (#3653)
* HOTFIX: Check for motion and notification perms only on ios

# 4.9.1 - 2019 May 9

* [android] Add post-crop of camera photos (Android only) (PR #3695)
  * [android] Photos taken from camera aren't cropped (#3635)
* Better bot display logic using `isSubscribed` (PR #3694)
  * 'Follow Location' on an owners location profile (Rework #3682)
  * User can still see bot after unfollowing a location (Rework #3146)
* Insert JWT token, host in Transport.login() exceptions (PR #3710)
* Refactor persistence (#3637, PR #3708)
* Rework onboarding logic and variables (PR #3680)
  * Show Invite Friends page to existing users (#3358)
  * Onboarding screens appear upon kill/reload (#3685)
* Fix cache persistence for fresh installs
* Post some errors to bugsnag (PR #3712)

# 4.9.0 - 2019 May 2

* [android] Find Friends does not work (#3564)
* Wrong text? Presence shared with 1 friend (#3644, PR #3678, PR #3688)
* [android] Onboarding: Username screen tweaks (#3558)
* 'Follow Location' on an owners location profile (#3682)
* Improve VS Code + Typescript interaction on console.log (PR #3693)
* [android] Get react-native-touch-through-view to work (PR #3629)
  * [android] FriendSearch back button in front of the list (#3607)
  * [android] FriendSearch dragging up on map scrolls the list (#3608)
  * [android] Back Caret or tapping on map does not function ... (#3587)
* HOTFIX: dismiss keyboard on nav to ProfileDetails from FriendSearch

# 4.8.0 - 2019 Apr 25

* Debounced disconnect (PR #3648)
  * [android] Disconnect/reconnect on separate Activity (#3634)
* [android] Lock portrait orientation (Rework #3581)
* Throttle excessive calls to HomeStore (PR #3660)
* [dev] Support storage of client-side props on the server (#3645)
* [android] Report User screen tweaks (#3529)
* [dev] `NotificationAvatar` (#3365)
* Change message to 'Invited ... to follow the location' (#3644)
* Remove unnecessary primer modals (#3666)
* User is seeing multiple lines below the Follow Location button (#3586)
* [dev] Error: Mixpanel instance was not initialized yet. (#3375)
* User can still see bot after unfollowing a location (#3146)
* WIP: Show Invite Friends page to existing users (#3358)

# 4.7.1 - 2019 Apr 18

* Offline Banner does not go away; Logged out with kill/reload (#3647)
  * Regression from PR #3641.

# 4.7.0 - 2019 Apr 18

* Don't download existing file, check cache (PR #3623)
  * Flashing Avatar when coming from background (#3258)
  * Avatars blink during start and can't be loaded sometimes (#3617)
* Improve: [android] open app location settings (#3585, PR #3624)
* [android] Firebase dynamic links/invitations (#3567)
* [dev] Refactor wocky-client - move AppInfo away (#3631)
  * appInfo/codepush reactivity (PR #3640)
  * CodePushStore.updateInfo is incorrect during app startup (#3636)
* [android] Take Photo does not function (#3619)
* Missing popups (#3630)
* User can still see bot after unfollowing a location (#3146)
* Remove double Actions.pop and adjust UI (PR #3638)
  * Add Note takes the user back to Pin Location screen (#3049)
* User receives incorrect notification with following a location (#3260)
* [android] Lock portrait orientation (#3581)
* [dev] `env` cleanup (PR #3641)

# 4.6.0 - 2019 Apr 11

* UI and refactoring for #3584, #3585 (PR #3595)
  * [android] [dev] Reconnection for disabled location settings (#3584)
  * [android] open app location settings (#3585)
* [android] Fix build errors (#3598)
* [dev] fix unit tests after geofence notifications tweaks (#3600)
* [android] 'Add comment' box is not tappable (#3513)
* Fix: Bugsnag sourcemaps still broken (#3594)
  * [android] [dev] Bugsnag release stage is always 'Production' (#3590)
* [android] Improvements for Friends Screen (#3520)
* [android] Notification Screen margin (#3527)
* [android] Action sheet alternative (ie. for ImagePicker) (#3601)
* Presence Widget: Avatars appear and quickly go away after login (#3257)
* Live Location: Increase hit slop for X (#3503)
* [android] Visitors on the header widget needs to be a circle (#3532)
* [android] Pin marker is missing bottom and right border (#3533)
* [android] allow choosing images from library (#3609)
* [android] Avatar should be a circle (#3515)
* [android] Android push notifications support (#3550)

# 4.5.0 - 2019 Apr 4

* [android] Open app location settings (#3585)
  * [android] Open Settings does not work if user taps "Deny" (#3561)
* [android] fix rn-blur issue, double pop-ups (#3447, PR #3583)
* Update: CodePush, react-native-background-geolocation (PR #3592)

# 4.4.0 - 2019 Apr 2

* Don't cancel location shares upon being invisible (#3556)
* Long Press and then the X and Next buttons do not function (#3535)
* [dev] Use version, os to identify sourcemaps (Rework #3498, PR #3568)
* [android] Persistent "Location Service activated" notification (#3469)
  * Upgrade RNBGL to 3.0.0-rc.4 (PR #3572)
* Update google-services.json (PR #3575)
  * [android] firebase SMS auth bug (#3554)
* Enable RNBGL batch uploading of data points (PR #3578)
  * Live Location: Occasional lag or history of users travel (#3412)

# 4.3.0 - 2019 Mar 28

**React Native upgrade to 0.59.2**

* Fix white shadow/blur issue when zoomed into satellite view (#3518)
* Firebase auth (PR #3526)
  * [android] set up Firebase SMS auth for .staging app (#3505)
  * [android] Firebase auth auto verify (#3522)
* 'Client side' invisible mode (#3426)
  * LL: Invisible mode does not work for Live Location (#3402)
  * Replaces usage of server-side invisible mode (#3538, PR #3540)
  * Adjustments for share location (PR #3542)
* Better fix for message sending crash (PR #3531)
  * Logout/login, navigate to Messages screen, receive app crash (#3517)
* [android] Native view settings for top and bottom nav bars (#3461)
* [android] No bottom margin for horizontal cards (#3514)
* Replace StagingRollback with CodePush.clearUpdates() (#3435, PR #3539)
* "Next" button on Select Friends screen does not function (#3519, PR #3542)
* Adjust unit tests; Disable order check (#3369 and others)
* [android] Pin Location Screen address not populating, black dot (#3516)
* Prevent loadMinimal on local codepush channel (PR #3549)
* [android] App icons (#3547)
* Codepush fixes (due to android), updates (#3496, PR #3541)
  * [dev] Use version, build and os to identify sourcemaps (#3498)
* React Native 0.59.2 upgrade (PR #3551)

# 4.2.1 - 2019 Mar 21

* [android] Fix rn-blur error (#3447)
* hot-fix: fix ErrorHandler to work with React Native 0.59
* Update: react-navigation 3.x, react-native-router-flux (PR #3238)
  * RNRF typings (PR #3495)
* Don't request unnecessary sharedLocation fields (#3479)
* Use rn-localize to set metric system in LocationStore (#3434)
* [android] [rn-maps] fix for UIManager warning from MapHome.tsx (#3448)
* Android build system work / Finish build variants (#3433)
  * Configure android builds (PR #3474)
    * [dev] combine staging and prod AppCenter apps into one (#3471)
  * Better solution for determing appcenter env (PR #3487)
  * Tweaks to run android build (PR #3492); Env fix (PR #3490)
  * Add default gradle properties (PR #3504)
    * Could not get unknown property 'STAGING_RELEASE_STORE_FILE' (#3482)
* [android] RNBGL staging license (PR #3494); Fixes crash (#3489)
* Fixes for messaging UI (PR #3493, PR #3502)
  * Image messages don't show until app reload (#3226)
  * User unable to scroll to see previous messages sent/received (#3262)
  * Messages are in wrong order (#3263)
  * Message order changes with full screen (#3294)
  * Messages: sent message is not displayed (#3491)
  * Images not displayed for Messages UI list of conversations (#3500)
  * Messages UI always displays "New Messages" after fresh login (#3501)
* Update google maps style to include stroke (#3508)
* New `versionBump` script to manage version code (#3507)

# 4.2.0 - 2019 Mar 14

**React Native upgrade to 0.59.0**: See below

Android
* Baseline for Android app with RN0.58.RC2 (PR #3423, PR #3429)
  * [android] [dev] Build codebase under Android (#3420)
  * [dev] Downgrade to React Native 0.58.rc2 (#3422)
  * Update: typescript to 3.3.3333, cocoa pods, lots of other components
  * Minor source code changes (MapHome.tsx, bugsnagConfig.js)
  * [dev] Upgrade Bugsnag (#3144)
* Android UI tweaks (PR #3445)
  * [dev] [android] Fix layout for bypass login (#3436)
  * [android] Remove iOS-only screens (#3438)
  * [android] Google maps is empty (#3440)
* [android] Fix react-native-touch-through-view exceptions (#3439)
* [android] state.activityType is null for Android (#3441)
* [android] Re-define custom setTimeout for android (#3437, PR #3458)
* Adjust UI and remote image loading (PR #3457)
  * [android] Images from our server are not displayed (#3442)
* [android] Add RNBGL android license (#3463)
* [android] Tapping on bottom column of map buttons doesn't work (#3449)
* HOTFIX: update yarn.lock after removing jsc-android
* [android] app crashes shortly after load (#3467)

Other
* Live Location: Notifications integration (Rework #3330)
  * Use calculated properties (PR #3430), More fixes (PR #3443, PR #3465)
* Replace rn-native-env with rn-config (#3421, PR #3428, PR #3454)
  * Some changes to app configuration variables.
* Stop following user on map (PR #3450)
  * Live Location: Auto-follow tweaks (#3415)
* React Native 0.59.0 upgrade (#3464)
* Set maxRecordsToPersist=10, Send location at every launch (PR #3472)
  * Live Location: Occasional lag or history of users travel (#3412)

# 4.1.5 - 2019 Mar 7

* Live location on/off toggle tweaks (PR #3394)
* [dev] don't ignore GraphQL errors on `watchQuery` (#3353)
* Updated 'Sharing Location' Button to gradient button (PR #3397)
  * Live Location: Notifications integration (Rework #3330)
* Replace "initial card" on the HS/Map. (#3382)
* [dev] make HomeStore cards list a computed value (#3390)
* 'GraphQL error: User not found' (#3370)
* Live location duration picker date format (#3403)
* Map should "auto center/focus" when tracking a target (#3400)
  * Live Location: Auto-follow tweaks (#3415)
* Bug fixes and improvements (PR #3414)
  * LL: Sharing Location button/notification should go away (#3401)
  * LL: Time remaining increases on "Sharing your live location" (#3405)
  * Own marker is not bordered after own location is shared (#3411)
* Prevent excessive reconnect tries after logout (#3299, PR #3396)
* Improvements and fixes (PR #3418)
  * Tweak 'fromNow' calculation for bots and locations.
  * Prevent crash after logout (if there is at least one local bot)
* [dev] Write new unit tests for refactored HomeStore (PR #3410)

# 4.1.4 - 2019 Feb 27

* Remove `ownBots` and other dead code (PR #3367, PR #3368, PR #3383)
* Live Location: Presence widget integration (#3331, PR #3364, PR #3366)
  * Live Location Avatar variation UI (#3378, PR #3380)
* Display different button for enabled sharing (PR #3376)
  * Live Location: Notifications integration (Rework #3330)
* Setup Reactotron (PR #3384)
* Restart app after clearing cache (PR #3386) / Fix: Reset Cache (#2805)
* Live Location: Sharer user's profile card (#3371, PR #3377, PR #3381)
* Various Live Location work, fixes and improvements (PR #3387, PR #3392)
  * Live Location: View users on the map (#3332)
  * LL: App to send one data point when location sharing starts (#3385)
  * Various fixes and improvements
* Live Location: ~Pulsing~ Share Live Location CTA (#3329)
* Share location user list to be above the Select Friends button (#3372)
* Notification/Updates screen results in blank white screen (#3373)
* Hot-fix: Don't display profile markers with null location (see #wocky/2304)

# 4.1.3 - 2019 Feb 21

* Rollback recent sourcemap related changes (PR #3349)
* Live Location: Share location - no existing shares (#3327, PR #3340)
* Live Location: Notifications integration (#3330, PR #3352)
* Fix regression: PeopleRow styling (#3347)
* Remove custom @jumpn/utils-graphql (PR #3356)
  * [dev] use babel overrides for absinthe-socket dependency (#3247)
* [dev] Remove front-end require cycles (PR #3357)
* [dev] Don't include `iat` field in jwt. (PR #3359)
* Invite Friends fixes (PR #3345)
  * Contacts do not load, loader spins one revolution and stops (#3344)
* Location Debugger: Unable to turn debug mode off (white screen) (#3336)
* Live Location: Share location - existing shares (#3328)

# 4.1.2 - 2019 Feb 14

* Update initial welcome slides for Live Location (#3316, PR #3319)
* TestFlight sourcemaps to use build number in identifer (#3317)
* Live Location Sharing - Baseline / API (#3312)
* Remove autobind dependency (PR #3326)
* Load presence status for profiles (PR #3335)
  * Fixes: [GraphQL] Online presence (#3270)
* Fix up Blocked Users functionality (#3254)
* [UI only] Live Location Share Button (PR #3339)
* Onboarding 4: Invite Friends (#3045)

# 4.1.1 - 2019 Feb 7

* [bugsnag] Non-codepush builds set appVersion instead. (PR #3298)
* Sourcemaps cannot be generated for codepush (#3304)
* Updates/Requests (PR #3303, PR #3311, PR #3313)
  * (Baseline) Updates / Requests Screen Enhancement (#3037)
  * Location Name should be on second line (#3305)
  * User should have X or check mark to accept/decline requests (#3306)
  * Yellow indicator should be on Updates with new update (#3307)
  * Slider does not completely cover white area (#3308)

# 4.1.0 - 2019 Jan 29

**React Native upgrade** See below.

* Restore file.test.ts (PR #3285), then reverted (PR #3290)
* Fixes to appcenter-post-build (PR #3282)
  * [dev] Check BugSnag sourcemaps (#3002)
* Codepush bundleID tweaks (PR #3291)
* Reconnection rework (PR #3286)
  * Fix firebase login (with real phone number) (Regression #3172)
  * User is logged out when the app is in background too long (#3223)
  * Connecting Banner that does not go away (#3275)
* React native 0.58 upgrade and related fixes (#3287, PR #3288)
  * Add react-native-contacts
  * Enable bitcode (PR #3293)
  * Update typescript to 3.2.4, lots of other dependencies

# 4.0.4 - 2019 Jan 24

* Revert: Implement graphql relogin (PR #3283)
* Hotfix: allow initial sms login

# 4.0.3 - 2019 Jan 24

* Refactor authentication logic (PR #3250, PR #3267, PR #3272)
  * User is logged out when the app is in background too long (#3223)
  * Always call getIdToken() in case Firebase has a new token (PR #3279)
* "Here" missing on widget. Replaced with an image (#2933, PR #3269)
* Download image by TROS url (PR #3273)
  * Image messages don't show until app reload (#3226)
* [GraphQL] Online presence (#3270)
* [dev] modify `tryMigrate` (#3266)
* Some messages are not correctly marked as unread (#3227)
  * Use message IDs (PR #3277)
* Onboarding 3: Notifications Permissions (#3030)
* Implement graphql relogin (PR #3283)

# 4.0.2 - 2019 Jan 17

* Comments are visible before the user followed the location (#3211)
* [dev] wocky-client typing improvements, cleanup (PR #3215, PR #3217)
* Fix chat message images (PR #3214)
* Bottom Button Style Update (PR #3225)
  * "Invite to Follow" button too low; gradient added to button (#3220)
* "Next" on the keyboard locks the app up and does not function (#3222)
* Missing Avatar on Chat Messages (#3224)
* Pass environment for new objects (PR #3233)
  * City, State field is blank after creation flow (#3221)
* Update: absinthe/socket-apollo-link, appcenter nodejs (PR #3237)
  * utils-graphql, mobx, mobx-react, mobx-state-tree (PR #3242)
* Presence widget fixes (PR #3236)
  * New! Presence widget reappears after each kill/reload (#3219)
  * "Here" missing on widget (You're Here) (#2933)
* [dev] upgrade CircleCI node version to 11 (#3244)
* Bot creation missing autofocus to enter place or address (#3116)
* New user relationship model (#3252)

# 4.0.1 - 2018 Dec 20

* User profile, user avatar bugfixes (PR #3168)
* Onboarding style tweaks (PR #3169)
* [GraphQL] conversations/chats/messages (#3135, PR #3162, PR #3175)
* Edit User Profile - Redesign (#3174)
* New Sign Up Profile Page (#3178)
* Fix file test (PR #3180)
* GraphQL auth refactoring, firebase/bypass fixes (PR #3183, PR #3188)
  * Fix firebase login (with real phone number) with 4.0.0 version (#3172)
  * Expand `iss` field in JWT auth token (#3097)
* Update LocationStore to use new location token (#3170, PR #3189, PR #3195)
* Properly process token exception
* Point tests back to Testing. Some clean-up (PR #3193)
* Change localBots API to be able to get 'too many bots' error (#3062)
* Missing New! pin for new users #3026
* Remove deprecated GraphQL calls and fix tests (PR #3198)
* [dev] refactor Chats and Chat to use PaginableList (#3176, PR #3186)
* New Pin is cropped on some devices (#3203)
* Finish RNBGL upgrade to 2.14.x (#3153)
* Factory refactoring and image processing fixes (PR #3207)
  * [dev] Refactor Factory class (#3201)
  * wocky-client and messaging improvements (PR #3208, PR #3209)
  * Various improvements for images, bot posts (PR #3210)
  * Fix missed avatar for new profiles (#3200)

# 4.0.0 - 2018 Dec 10

* Rework version info string. Swap native and js parts. (#3009, PR #3098)
* Make messaging UI components stateless for (PR #3100)
  * Messages: Text & Images sent are not appearing correctly (#3060)
* PR #3102, PR #3124
  * Onboarding 1: Location Permissions (#3028)
  * Onboarding 2: Accelerometer Permissions (#3029)
* UI tweaks for bot profile (PR #3106)
* [GraphQL] login; Other changes (#3059, PR #3101)
* [GraphQL] user follow; Other changes (PR #3108, #3112)
* More UI Tweaks (PR #3114)
  * Border is rounder on pins in the presence bar than mocks (#3105)
* Set up Codepush channel for Alan (#3115)
* [GraphQL] Bot posts; removeBot; Other stuff (#3109, PR #3110)
* [GraphQL] unfollow (#3119, PR #3120)
* [GraphQL] block/unblock (#3121, PR #3120)
* Add device ID to client JWTs (#3111)
* [GraphQL] Optimize bot details loading (#3126)
* Friends List Adjustments (#2876)
* Missing empty friend list messaging and layout (#3118)
* [GraphQL] Remove loadRelations; Other stuff (PR #3131)
* [GraphQL] remove bot subscribe/unsubscribe code and UI (#3132)
* [GraphQL] enable/disable push notifications (#3134)
* Rework Location Store and RNBGL (#3071, PR #3107)
  * Speculative fix: App not updating users location with app closed (#2508)
* Remove google logo, other ui changes (#3130, PR #3136)
* [dev] use new Bot Post GraphQL API (#3147)
* [GraphQL] Image download/upload via GraphQL, code cleanup (#3138)
* Replace images with emojis on presence bar (#3143)
* Notifications tests refactor (PR #3150)
* [GraphQL] Change GraphQL image naming (#3160)
* New User Profile (#3148)
* Submit bugsnag for any mixpanel tracking failures (PR #3145)
* Remove XMPP from iOS app (#3163)
  * Switch our app to NextGraphQLTransport (PR #3164)

# 3.10.1 - 2018 Nov 26

* Use two GraphQL connections (PR #3053)
  * Fix: Next button missing during creation flow (#3005)
* [dev] Fix prettier handling of decorators and line breaks (#3054)
* Wocky client test improvements (PR #3055)
* [dev] implement requestRoster API with GraphQL (#3058)
* Increase timeout for tests
* Display more version info for codepushes (#3009)
* Add storybook tool (PR #3079)
  * Added onboarding Accelerometer / Location page UI (PR #3080)
* Presence widget is visible when user is in invisible mode (#3016)
* Users incorrectly showing at locations (#3007)
  * Showing visitors list with no visitors causes infinite spinner (#3043)
* Add "new" login flow to GraphQLTransport with tests (PR #3077)
* Polish Emoji Selector (#3027)
* Crash while deleting bots (#3069, PR #3089)

# 3.10.0 - 2018 Nov 5

* Images do not load on cards, location profile or on user profile (Rework #3018)
* Update other outdated 3rd party modules (#3035)
* Creation Flow: Keyboard does not slide down (#2953)
* [dev] Avoid double Actions.pop calls, replace to popTo (#2987)
* [dev] fix mockWocky and re-enable Jest snapshot tests (#3001)

# 3.9.4 - 2018 Oct 30

* Show firebase errors on Verify Phone screen (#2988)
* MobX, MST, TypeScript, Jest, TSLint upgrade (PR #2995)
  * [dev] Upgrade to mobx 5 and mobx-state-tree 3 (#2811)
  * [dev] upgrade typescript to latest version (#2971)
* Various fixes for crashes after MST3 upgrade (PR #3012)
  * App Crash: Deleted Location and pin marker reappeared (#3013)
  * [dev] Avoid crash for local user search with MST3 (#3014)
* [dev] Clear out old screens and dependencies (#2840)
* Presence widget is visible when user is in invisible mode (#3016)
* Follow Location: Missing Avatar (#3017)
* Images do not load on cards, location profile or on user profile (#3018)
* [dev] prevent memory leak on bot create (#3020)
* Configure RNBGL startOnBoot,stopOnTerminate more robustly (PR #3025)
  * App not updating users location with app closed (#2508)

# 3.9.3.1 - 2018 Dec 10

* Show firebase errors on Verify Phone screen (#2988)
* Backport as many LocationStore.ts changes as possible.
  * Configure RNBGL startOnBoot,stopOnTerminate more robustly (PR #3025)
* Rework Location Store and RNBGL (#3071, PR #3107)
* Display more version info for codepushes (#3009, PR #3072, PR #3098)
* Submit bugsnag for any mixpanel tracking failures (PR #3145)

# 3.9.3 - 2018 Oct 23

* Users are failing to properly onboard after SMS verify. (#2982)
* Fix a bugsnag which triggers on empty roster.

# 3.9.2 - 2018 Oct 22

* Add assets from codepush brick screen (PR #2967)
* Add ability to email rnbgl logs (PR #2959)
* [dev] Enable typescript strict mode for the app (#2970)
* Add App Store app id to dynamic link (PR #2981) /
  * [prod] Dynamic links not working as expected (#2978)

# 3.9.1 - 2018 Oct 17

* Images not appearing (#2962)
* Quick fix: Who's Here list changes with Background/Foreground (#2963)

# 3.9.0 - 2018 Oct 16

* Remove re-centering map after background/foreground (PR #2951)
  * Map focus timing (Rework #2929)
* Disable Long Press within the creation & edit flow (#2946)
* Current Location button only works once (#2948)
* Lazy loading of user avatar images (PR #2955, PR #2956)
  * Missing Avatar (#2511)
* User should appear in presence widget when accepting invite (#2939)
  * ... (when they are at that location).
* Fix bot removal from homeStore, refactoring and unit tests (PR #2960)
  * App Crash after deleting location after creation flow (#2945)
* Update RNBG, add getCurrentPosition at the start (PR #2961)
  * App brought from the background receives "Background location is not enabled" (#2023)

# 3.8.1 - 2018 Oct 11

(3.8.0 is an uncontrolled release)

* Location Profile - tappable "Who's Here" CTA (Rework #2564, PR #2911, PR #2923)
* Changes to friend search (PR #2912)
  * Friends Search: Design Enhancement (#2852)
  * Missing Placeholder Text (#2877)
* Adjust/Enhance location profile map view (Rework #2849, PR #2914)
* Speculative fix for: Emoji's missing from emoji selector (#2870, PR #2915)
* Improve nav structure for chat screens (PR #2918, PR #2921)
  * Chat icon from User Profile does not function (#2916)
* App crash after user deletes location after creation flow (Rework #2873)
* Attribution Button & Screen (#2534)
* Update NSLocation description strings (#2906)
* Chat icon from User Profile does not function (#2916)
* [dev] Remove geofenceSubscribe/unsubscribe (#2926)
* Disable crash after bot delete (#2920, PR #2925)
* Disable map tilt (#2931)
* Map focus timing (#2929)
  * Selected Pin does not stay in focus (#2913)
* [dev] Send user location on bot create/update (#2856)
* When a user creates a geofence bot while they are in the bot,
  they should immediately see the presence bot in the widget (#2383)
* Changes for new app store listing (PR #2942)

# 3.7.0 - 2018 Oct 4

* More of: Support iOS Universal Links (Rework #2865)
* Notifications not in chronological order (Rework #2800)
* Notification bell CTA should reflect new updates on app start (#2823)
* [dev] Send user location on bot create/update (#2856)
* When a user creates a geofence bot, immediately see the presence bot (#2383)
* Comment out explore-nearby code (PR #2889)
* Remove bot subscribe and image press code (PR #2890)
* Another fix (PR #2891) for:
  * Location Profile - tappable "Who's Here" CTA (Rework #2564)
* Do not update to current location with background/foreground (#2853)
* In-App Share Presence notification is cut in half (#2843)
* HS Map Tweaks - Removal of map overlay (#2857)
  * Upgrade react-native-maps and remove opacity and UrlTile (PR #2905)
* Adjust/Enhance location profile map view (#2849)
* City, State tag incorrect (#2869) / Georeverse before bot save (PR #2903)
* Speculative fix for: Emoji's missing from emoji selector (#2870)
* App crash after user deletes location after creation flow (#2873)
* Location Profile map is showing current location (#2868)
* Search field requires 2 taps (#2898)
* Dynamic link flow (PR #2899)
  * Invite Friend flow (w/ dynamic links) (#2879)
  * Dynamic Link flow (for invited user) (#2880)

# 3.6.1 - 2018 Sep 28

* [dev] Prevent crash (#2882)

# 3.6.0 - 2018 Sep 28

* Bugsnag: Deep linking from push notification (#2860)
* Set unread on "live" notification (PR #2863, Rework #2801)
* Support iOS Universal Links (#2865)
* HOTFIX: inject log to prevent crash

# 3.5.0 - 2018 Sep 27

* Please update the current login/signup screen. (#2803)
* Cropped image does not display on post (Rework #2741)
  * Update: react-native-image-crop-picker, RNImageCropPicker pod
* Properly handle missing Avatar (#2511)
* Update: RNRF, react-navigation and some other components
* [dev] Remove version string from MyAccount snapshot test (#2833)
* Hot-fix: Avoid setting null geofence during bot update
* SplitRenderer and other improvements (PR #2851)
  * Laggy transition from location profile to Who's Here screen (#2825)
* Notifications fixes (PR #2816)
  * Notification Screen: Notifications not in chronological order (#2800)
  * Notifications Screen: Notifications not catching up. (#2801)
  * Notification bell CTA should reflect new updates on app start (#2823)

# 3.4.2 - 2018 Sep 21

* Blocked list broken (#2802)
* [dev] Disable/comment out background fetch (#2715)
* Fix production 3.4.1 crash (#2831)
* Remove 'explore nearby' XMPP related code (#2828)
* Prune code that references bot public and geofence flags (#2827)
* Revert app compatibility list (#2841, Reverts #2730)

# 3.4.1 - 2018 Sep 20

* Unable to change user avatar (#2706)
  * Fix crash during logout (PR #2798)
* Location Detail Adjustments (#2693)
* Presence Widget: Widget should also refocus the map to location (#2723)
* Take Photo does not add image to Post (#2732)
* Add notification screen loader (#2733)
* Change app compatibility listing to 'only iPhones' (Rework #2730)
* Map View is not current location (Rework #2697, PR #2797)
* Top left caret + header (#2731)
* Make version number visible somewhere (#2748)
* Location Edit: User taken back to HS with tap on the map (#2792)
* Notification Screen: Missing Punctuation (#2751)
* Location Edit Adjustments (#2787)
  * Fix emoji popup (PR #2820)
* Speculative fix for: Cropped image does not display on post (#2741)
* Replace algolia user search with graphql user search (#2766)
* Prevent crash if no avatar (PR #2815)
* Lazy loading of conversations (#2826)
* User details: Please fix phone number formatting. (#2810)
* Alert when turning off invisible mode (#2809)

# 3.4.0 - 2018 Sep 14

* User Profile: Done on Take Photo flow creates user profile (#2717)
* Pin alignment changes (#2646)
* App crash with Debugger (#2727)
* Change app compatibility listing to 'only iPhones' (#2730)
* App Crash with "Address copied to the clipboard" (#2752)
* Map View is not current location (#2697)

# 3.3.5 - 2018 Sep 13

* Fixes for null notifications and invalid data.
* Speculative fix for: Addresses do not populate (#2654)
* Location Creation: Map does not move to location with address search (#2681)
* Error logging (dev mode only) (PR #2753)
* Disabled "Pin Location" and "Save Changes" (#2685)
* Homescreen is Fullscreen and should be non fullscreen (#2691)
* Collapse Whitespace (#2692)
* Notifications update UI (#2726)
* Remove buttons on full map mode (#2716)
* Home screen: Pin in focus should be on top (#2696)
* Location Create: Tweaks to the icon/emoticon selector (#2679)
* Tweaks: Location Profile - tappable "Who's Here" CTA (Rework #2564)
* Replace Presence Share Popup (#2688)
* Location Detail Adjustments (#2693)
* Note Add Adjustments (#2695)
* Bug: User cannot change pin location (#2704)
  * restore zindex on YouPin (PR #2778)
* Location Invitation Accept UI (#2729)
* Loading posts on shared/invited bots causes 403 auth error (#2747)
* Creation/Share Flow: Back caret on share flow breaks creation flow (#2718)

# 3.3.4 - 2018 Sep 6

* Improve unit/xmpp tests
* Revert getLocationsVisited change (Rework/Revert #2701)
* [dev] wocky-client notification subscriptions (#2725, PR #2737, PR #2743)
  * ... and some wocky-client sync, fixes etc.
* Bot invite for multiple users (PR #2742)
* Location Invitation Accept UI (#2729, PR #2744, PR #2745)

# 3.3.3 - 2018 Aug 31

* Change request for location profile ellipsis submenu (#2677)
* [dev] re-enable back button on Notifications slider (#2711)
* Avatar/Icons un-tappable on the presence widget (#2668)
* Post on location: Keyboard stuck on Take Photo screen (#2678)
* Top Left Back Caret (Rework #2676)
* Notifications Screen (#2583)
  * [dev] Notifications wocky-client API (#2708)

# 3.3.2 - 2018 Aug 23

* Slight improvement on keyboard interactivity (PR #2683)
* General nav with back button (PR #2684) / Top Left Back Caret (#2676)
* Deep linking with location/bot share broken (Rework #2637)
* Location Profile - tappable "Who's Here" CTA (Rework #2564)
* Don't pop by default (PR #2698)
  * Friends List nav bug (#2690)
  * Friends screen slides up and then drops down and back up (#2687)
* Bug: Location Debug not reporting back last uploaded locations (#2701)
* Update of "Who's Here" screen (#2659)

# 3.3.1 - 2018 Aug 16

* Location Profile - tappable "Who's Here" CTA (#2564)
* Bot/Location Posts (#2630)
* Upgrade to latest RNRF and react-navigation
* Changes to unit tests. Add timestamps, split tests, etc.
* [dev] fix "Visitors" nav (#2638)
* Changes to menu (#2582)
* Fix crash on cache reset (PR #2655)
* Notifications list placeholder (PR #2656)
  * Notifications Screen - UI only (#2652)
  * Remove toggle, update to latest mock (#2647)
* HS Redesign - Presence Widget (Rework #2468)
* Horizontal list fixes (PR #2661)
  * Card Alignment shifts (#2635), Card view adjustments (#2649)
  * Disappearing Cards (#2650), Addresses do not populate (#2654)
* User is able to create user profile without an email address (#2634)
* Deep linking with location/bot share broken (#2637)
* Pins without cover image should have icon (#2644)
* Bottom menu doesn't take all width for Plus model (#2599)
* "Pin Location" is not disabled when title is blank (#2653)
* Bot Edit: Replace "Pin Location" with "Save Changes" (#2658)
* User is able to remove Title (#2657)
* Map marker icons (#2674)
* Updated design: Friends screen (#2665)

# 3.3.0 - 2018 Aug 9

* Location Create - add photo (#2503)
* Many navigation changes and improvements (#2588)
  * (PR #2605, PR #2611, PR #2617, PR #2618, PR #2622)
  * [dev] restore LocationPrimer functionality (#2624)
* Emoji and icon selector with correct keyboard handling (#2505, PR #2601)
* Crash after "Next" tap during bot creation (#2600, PR #2610, PR #2620)
* Crash after logout and bot creation (#2615)
* [dev] re-add ErrorHandler (#2623)
* Long press to create Location (bot) (#2578)
* Address processing error for some bots (#2489)
* Location Create - add note (#2502)

# 3.2.0 - 2018 July 30

* [dev] Upgrade RNRF to React Navigation v2 (#2448)
* Work-in-progress: Location Create - initial design (#2501, PR #2590)
* Location Create - custom emoji entry (#2505)

# 3.1.3 - 2018 July 23

* Small fixes (PR #2581)
  * Prevent crashes on Connectivity null references
  * Prevent location red screen
  * Prevent cpu spike on map marker (#2580)
  * "uber"-style create pin
  * Correct hiding on "Use Current Location" bar
  * Re-enable bot create from CreationHeader
  * Clean up reactions on AddressBar

# 3.1.2 - 2018 July 20

* No more FirstLoadOverlay (Rework #2468)
* Bot Pin Changes (#2536)
* Drop Shadow missing on Pins (#2535)
* Header Changes (#2538)
* Card Changes (#2539)
* "You" card should be tappable on entire card (#2550)
* Current Location Button (#2540)
* Center the map (#2545)
* What to do with overscroll on Map + bottom popup (#2523)
* Pin in focus is too far up (#2543)
* Widget title changes (#2533)
* Cards Disappear (#2544)
* Broken Pin Image on Widget (#2554)
* Fix online presence glitches (PR #2579)
  * App indicates online presence when uploading location (#2510)
* New location create API (PR #2577)
  * Redesign - Location Create biz logic (#2509)
* Navigation to create new Location (bot) (#2498, PR #2574)
  * Possibly incomplete

# 3.1.1 - 2018 July 13

* Horizontal list improvements (PR #2529)
  * Implement paging on Home horizontal list (#2524)
  * Maintain horizontal list state (#2526)
  * Horizontal list: Only show Avatar for focused bot (#2527)
* Option to run wocky-client tests against local wocky instance (PR #2532)
* Prevent flow warnings on react native bundle (PR #2546)
* improve bot tests (PR #2552)
* [dev] Improved cache management (#2071)
* HS Redesign - Invisible Mode (#2473, PR #2558)
  * Invisible mode and toggle (#2514, #2542)
* [dev] create Codepush channel for Beng (#2556)
* HS Redesign - Presence Widget (#2468)
* HS Redesign - The YOU pin. (#2476)
  * "You" pin should change to avatar image (#2541)

wocky-client

* Add Dockerfile for running tests in a container (PR #51)
* Fix compilation errors

# 3.1.0 - 2018 July 5

* Re-enabled push notification (entitlements)

# 3.0.3 - 2018 July 5

* Re-create ios app project to make HMR working (#2520)
* Location card expand on tap (#2482)
* Use new localBots graphql query to retrieve own and subscribed bots
  * ... for given region (#2515, PR #2517)
* Refactoring:
  * Remove Homestore and refactor (PR #2521)
  * Home.tsx with localBots query (PR #2522)
* Home map: maintain 'standard' view + overlay on zoom (#2525)

# 3.0.2 - 2018 June 27

* HOTFIX: nav for bot create and view

# 3.0.1 - 2018 June 27

* HOTFIX: prevent infinite spinner on initial login

# 3.0.0 - 2018 June 27

* Cleanup (PR #2462)
* [dev] codepush - ability to revert to "default" bundle on Staging (#2337)

New redesign

* Redesign part 1 (PR #2474) / HS Redesign - Map focused HS. (#2464)
  * Map fine tuning (#2487)
* Redesign Part 2: Bot cards (PR #2480) / Location card design (#2479)
* Map/cards interaction (PR #2485)
  * HS Redesign - How map pins & location cards interact (#2466)
  * HomeScreen pins (#2477)
* HS Redesign - Full screen mode. (#2467)
* HS Redesign - accessing the menu. (#2472)
  * Bottom menu with new avatar (PR #2488, PR #2491)
  * Map <-> menu interaction (#2490)
    * Map tuning (PR #2493), Bottom menu (PR #2496)

# 2.8.1 - 2018 June 7

* Fix font-weight for react-navigation (PR #2449, related to #1874)
* New Appcenter app changes (PR #2453, PR #2459)
* Upgrade mobx, mobx-state-tree and others (PR #2460)

# 2.8.0 - 2018 June 5

* Move to AppCenter for CodePush (new configuration) (#2414)
* Fix up GoogleService-Info.plist to XCode target (PR #2429)
  * Onboarding: Not receiving sms code on 2.7.0 (unable to login) (#2427)
* Insert a flag for background-fetch location updates (#2404)
* Upgrade react-native-router-flux, react-navigation (#1874, PR #2435)

# 2.7.0 - 2018 May 31

Many many changes

* Update cocoapods to run with XCode 9.3 (#2073, PR #2377)
* Distance string display tweak for: Polish mileage calculation (#1303)
* hot-fix: formatting and avoid bugsnag report for getImageSize
  * Error in src/store/ProfileValidationStore.ts:25 (#2355)
* Better image upload errors handling (PR #2389)
  * Unhandled exception is raised for failed image upload (#2387)
  * Handle failed image upload for conversation UI (#2394)
* Refactor entity update (PR #2395)
  * A user onboarded but no user information stored on the server (#2385)
* Map clustering (#2112, PR #2320)
* Fix detox on CI (#2380, PR #2382)
* Convert the rest of the React Components to tsx (#2270, PR #2397)
* Make bg-fetch result configurable (PR #2398, related to #2230)
* Change name of relationship to 'SUBSCRIBED_NOT_OWNED' (PR #2399)
  * Newly created bots should not appear in the saved bot list (#1701)
* Allow Location Access not displaying with location set to Never (#2371)
* Bugsnag crash (#2388)
* New requirement for welcome header from (PR #2405)
  * Geofence Widget State: When user has NOT enabled footprint and has location setting: Always (#2327)
* Update React Native to 0.55.4 (#2279, PR #2411)
* hot-fix: load own profile into storage
* AppCenter integration (PR #2400, #2403, #2413)
* [dev] refactoring of image download/upload within wocky-client (#2416)
* [dev] Remove TROS id after failed image upload (#2407)
  * New API to delete TROS URLs (PR #2423)

# 2.6.8 - 2018 May 18

* Re-add more logic to handle 'while in use' mode for RNBGL (PR #2368)
  * While Using: App brought from the background receives "Background location is not enabled" (#2023)
* Simplify bot list load, fix depart subscriptions (PR #2369)
  * No Avatar on Widget with exit of presence bot (#2366)

# 2.6.7 - 2018 May 17

* Re-enable geofence UI for Production.

# 2.6.6 - 2018 May 17

* Reverted: Deleted bot is not removed from HS (#2364)

# 2.6.5 - 2018 May 17

* Analytics (#1905, #2105, #2351, PR #2359)
* Re-activate background fetch on Staging (PR #2361)
  * ...and throttle overly verbose mixpanel calls
* iPhoneX tweaks (PR #2362)
  * Main Nav: UI Tweaks (#2301)
  * Iphone X, add more margin to Geofence Widget (#2353)
* Better image handling (PR #2363)
  * Non device owners see default cover photo in created notifications #2356

# 2.6.4 - 2018 May 16

* SideMenu improvements (PR #2314), for Main Nav: UI Tweaks (#2301)
* Lock typescript version (PR #2317)
* HTML Bot Link Shares: Bot Profile, Action Sheet, Owner View (#2308)
* HTML Bot Links: Bot Profile, Action Sheet, Non-Owner View (#2309)
* HTML Bot Link Shares: Action Sheet, Share Via (#2310)
* Added cursor, onEndReached handler (PR #2322)
  * for Infinite loader on Saves List (#2213)
* Enable empty UI for Saves (now Favorites) screen (#2078)
* Use URL format `https://tinyro.bot/bot/<bot-id>` for Prod html bot shares (#2334)
  * Staging URL format: `https://html.dev.tinyrobot.com/bot/<bot-id>`
* Deleted bot with no connectivity and opened app later to app crash (#2333)
* Run RNBGL 1st session (PR #2345)
  * Get accelerometer permission on 1st session (#2294)
* Validation fixes:
  * Profile validation fix (PR #2329)
  * A user was able to onboard with a null username (#2263)
  * Process server-side errors (PR #2346)
  * Any server-side error during user profile registration/update is ignored by the app (#2343)
* Disable background fetch (#2342, PR #2347)
  * Staging and Prod
* Bot cover photo related bugsnag crash (#2344)
* Detox tests
  * Enabled (PR #2315) and then disabled.

wocky-client (PR #2323, PR #2330, PR #2348)

* Formatting, fix unit tests, import as git subtree

# 2.6.3 - 2018 May 10

* Geofence widget improvements (PR #2286, #2243)
* [dev] Use graphql to retrieve user profile data (#2281)
* DRY up Avatar (PR #2292)
  * Widget: Visitor count avatar is hidden behind avatar (#2269)
* Attempt to improve buggy google markers (PR #2299)
  * Reworks: Pink blank cover images (#2225)
* Background location improvements (PR #2302)
  * Upload a location data point regularly using background fetch (#2230)
* Include wocky-client (temporary) (PR #2303)
* Handling of null reponse for profile and bot lists (PR #2304)
  * App may ... crash when the app requests non-existed user (#2295)
  * TypeError in node_modules/.../GraphQLTransport.js:351 (#2296)
* Speculative fix: [dev] MST bot conversion warning (hippware/rn-chat#2285)
* Remove bot from geofenceBot (PR #46, hippware/rn-chat#2248)
* Invite Friends: UI Tweaks (#2246)
* Detox tests for user creation and deletion (#1977)
  * Adds a "Delete Profile" button to the bottom of MyAccount screen (Staging only)
  * Temporarily disabled
* New side menu UI (PR #2312), for Main Nav: UI Tweaks (#2301)

# 2.6.2 - 2018 May 4

* More typescript conversion (PR #2250)
* Set correct resource id on rnbgl http calls (PR #2261)
  * Related: Display list of recent location data points (debug) (#2223)
* Hide the horizontal scroller on the geofence header (widget) (#2227)
* Only show 'alive' bots in geofence header (PR #2266)
  * Widget: Deleted bot not completely removed (#2247)
* SearchStore: fix MST actions (PR #2260, PR #2273)
  * Error in /.../main.jsbundle:560 (#2226)
  * Typing in search field results in app freeze/crash (#2255)
  * App crash with onboarding new user with blank username (#2268)
  * New bypass account can't be created due to username (#2271)
* Geofence: Pop-up for first time users (#2195)
* Add bot image id to the bot marker key/hash (PR #2275)
  * Bot Edit: Changing the cover image does not show new image until leaving the bot (#2202)
* Correct conditional logic of PR #2251 (PR #2276)
  * Reworks: Bot Creation: Search field and Keyboard slide away (#2138)
  * Fixes: Bot Edit: Unable to change bot location (#2272)
* Use new 'active bots' query from wocky-client (PR #2282)
  * Bug: Order of the bots on widget is incorrect (#2244)
  * Some changes for: Geofence Widget: Improvements (#2243)
* Pink blank cover images (#2225)

wocky-client

* New 'currentUser' query
* Don't use amazon urls as file uri
* New 'active bots' query

# 2.6.1 - 2018 Apr 29

* Send background location via http (PR #2258)
  * Upload a location data point regularly using background fetch (#2230)
* wocky-client changes
  * Simplify graphql login logic (because internal reconnect is disabled)
  * Increase timeout to work with EDGE network
  * Adjust tests

# 2.6.0 - 2018 Apr 27

* Adjust isGeo prop (PR #2212)
  * Share Notifications do not have presence overlay (#2157)
* Add tros url to key (PR #2211)
  * Bot Edit: Changing the cover image does not show new image until leaving the bot (#2202)
* Reset badge counter only for non-zero count (PR #2110)
  * Related: Push notifications disappear when user opens app (#2155)
* Make latest visitor always on the top (PRs #2209, hippware/wocky-client#29)
  * Avatar displaying on geofence widget should be `most recent` visitor. (#2199)
* More javascript to typescript conversion (PR #2207)
* Connectivity changes (reverted)
  * Connectivity improvements (PR #2224)
  * Revert connectivity to old react-based implementation (PR #2232)
  * Rework: Offline Banner that does not go away (#2163)
* Show 50 most recent locations on debug view (PR #2237)
  * Display list of recent location data points (debug) (#2223)
* Deleted bot resulted in bugsnag (#2204)
* Add more dynamic data to marker key to re-render (PR #2241)
  * Pink blank cover images (#2225)
* Infinite loader on Saves List (#2213)
* Update wocky-client (PR #2242)
* Bot Creation: Search field and Keyboard slide away (#2138)
* Upload a location data point regularly using background fetch (#2230)
  * Incomplete
  * Supersedes: Upload a location data point at least once every 3-4 minutes (#2171)

# 2.5.5 - 2018 Apr 19

* Fix up mixpanel identify (PR #2167)
  * Event `ios app release` is not reflecting on mixpanel (#2158)
* Annotate mobx actions (PR #2168, PR #2169)
* More offline banner fixes (PR #2187)
  * Offline Banner that does not go away (#2163)
* [dev] error on image-only bot post (#2188)
* Geofence Widget not updating (#2177)
* Include address to bot marker key (PR #2193)
  * Bot Edit: User changes location after choosing location and metadata doesn't change (#2145)
* Fix this.controls.focus is not defined and upload error handling (PR #2192)
  * Upload error: undefined when uploading an image to an existing cover photo (#2181)
* Geofence Widget: You're Here bot should stick to the left (#2179)

# 2.5.4 - 2018 Apr 17

Same as 2.5.3 but with an incremented version.

# 2.5.3 - 2018 Apr 17

* Refactoring Connectivity (continues #1936)
  * Error in .../store/ConnectivityStore.ts:98 (#2132)
* Geofence Header not displaying after a clean install (#2135)
* Enable empty UI for Visitors "Who's Here" screen (#2077)
* User required to leave screen and return to see cover image (#2137)
* Location fixes
  * Users location not being updated for @miranda (#2100)
* Infinite loader on Who's Here screen below visitors list (#2136)
* Prettify on commit (PR #2154)
* Run detox tests on nevercode
  * [dev] Re-organize detox tests (#2097)
* [dev] Bugsnag symbols for codepush (#2128)
* Update wocky-client to work with latest server
* S3 URL support (hippware/wocky-client#24)

# 2.5.2 - 2018 Apr 13

* hot-fix: temporary disable retrieval of suscribed bots via graphql
* hot-fix: broken firebase login fix

# 2.5.1 - 2018 Apr 13

* [dev][refactor] make Connectivity.js "reactive" (#1936)
* You're Here UI shows for all geofence bots on geo header (#2092)
* Bot Title is not tappable on geofence header (#2091)
* HS: Tapping New Updates CTA scrolls geo header out of view (#2093)
* Enable empty UI for Visitors "Who's Here" screen (#2077)
* Implement bot retrieval via GraphQL (#2046)
* Some conversion to typescript
* [dev] Change GraphQL mutations because of new server format (#2113)
* Bot live updates via GraphQL subscriptions (#2047)
* Graphql subscriptions
* Other graphql work. Fix crashes. Fix pagination for cursors.
* Location debug view (#2081)
* hot-fix: fix login/logout crash because of dead profile ref
* hot-fix: Google maps performance improvement
* Fix bugsnag crashes

# 2.5.0 - 2018 Apr 6

(Not sequential with 2.4.1)

* More typescript
* GEOFENCE v1: Location Access Request in HS Geofence Header (#1914)
* Incorrect sms auth code is creating a bugsnag (#2062)
* `New Updates` Delete Tweak (#2030)
* Pull Down Updates Loader (#1991)
* Switch to Google Maps (#1932, PR #2080)
  * High CPU fix
  * Import map style (#2070)
* Infinite loader on HS (#2066)
* Image picker text should be removed (#2065)
* Logout should say 'Are you sure you want to Logout' (#1297)
* GEOFENCE v1: HS Static Banner Active Geofence Bots (#1903)
* Change the geofence created notification to match the shared notification (#2034)
* GraphQL support (work in progress)

# 2.4.1-1 - 2018 Apr 19

(codepush only)

* Fix up mixpanel identify (PR #2185, backports PR #2167)
  * Event `ios app release` is not reflecting on mixpanel (#2158)

# 2.4.1 - 2018 Apr 4

* `New Updates` Delete Tweak (#2030)
* Infinite loader on HS (#2066)

# 2.4.0 - 2018 Apr 2

* Don't propagate foreground push notifications.
* GEOFENCE v1: HS Geofence Share Notification (Rework #1921)
* Interim solution for Who's Here (while we wait for live updates) (#2035)
* Convert source files to TypeScript (work in progress).
* new BottomButton component (better animation)
* Presence Bot Share Flow: Share Presence CTA is behind the keyboard and remove back caret (#2051)
* Location uploading 'debug' mode (Staging only) (Related #2029)
* Various other small changes and improvements.

# 2.3.1 - 2018 March 27

* Display alert when user attempts to disable footprint CTA (#2033)
* Explore Nearby Overlay "Always Primer" when user has setting set to "Always" (#2037)
* Deeplink for bot visitors screen (#2038)
* Deep linking doesn't work for background mode (#2041)
* Footprint CTA should be removed with Un-Saving/Un-Subscribing from a bot (#2027)

# 2.3.0 - 2018 March 23

* Upload location only for connected client
* Update location url
* Change modal description for camera & photo library access permission request (#2015)
* Background location update error (#2021)
* Some changes to location handling
* GEOFENCE v1: HS Geofence Share Notification (Rework #1921)
* GEOFENCE v1: Who's Here (Visitors Screen) (Rework #1897)
* Automate Onboarding slides to transition after 3 seconds (#2013)
* GEOFENCE v1: Geofence Bot Profile (Owner View) (Rework #1911)
  * Tweak default cover photo logic
* App brought from the background receives "Background location is not enabled" (#2023)

# 2.2.0 - 2018 March 22

* BotDetails: dead bot (#1994)
* GEOFENCE v1: Geofence Bot Profile (Non-Owner View) (#1896)
* GEOFENCE v1: Geofence Bot Profile (Owner View) (#1911)
* GEOFENCE v1: HS Geofence Share Notification (#1921)
* Upgrade react-native-xmpp to 1.1.2
* Different banner results when opening the app in WiFi vs. LTE (#2002)
* Post Banner appearing in middle of the screen with missing keyboard (#1664)
* GEOFENCE v1: Who's Here (Visitors Screen) (#1897)
* Update tests
* ONBOARDING: Enable NEW 1-3 Sliders for GEOFENCE (#1963)
* Investigate/Re-enable location uploading (#2007)
* GEOFENCE v1: Who's Here (Visitors Screen) (#1897)
* Fix bugsnags
  * TypeError in src/components/map/BotAddress.js:36 (#2010)
  * #2009
  * Error in main.jsbundle:314 (#2017)
* Update rn-firebase to 3.3.1, cocoapods
* Automate Onboarding slides to transition after 3 seconds (#2013)
* Spinner on bot deep link until gps loads (#1995)
* Change modal description for camera & photo library access permission request (#2015)

# 2.1.7, 2.1.8 - 2018 March 19

* Fix bugsnags:
  * Dead bot reference in EventCard (#1999)
  * Same dead bot (#2000)

# 2.1.6 - 2018 March 16

* Handle bot geofence boolean field.
* Add mixpanel calls in Connectivity component
* Another speculative change for: New User: Constant Offline State (#1946)
* Deep linking to bot results in App Crash (#1986)

# 2.1.5 - 2018 March 15

* Speculative fixes/changes for:
  * Deleted a bot and received app crash (#1980)
  * Login resulted in App Crash (#1982)
  * New User: Constant Offline State (#1946)
* Analytics: `migration_fail` firing on clean installs (#1984)

# 2.1.4 - 2018 March 13

**Geofence UI disabled for Production**

* Light refactoring on BotDetails (PR #1970)
* GEOFENCE v1: Geofence Bot Profile (Non-Owner View) (#1896)
* GEOFENCE v1: Add Geofence Bots to Explore Nearby (#1899)
* [dev] migrate to CircleCI 2.0
  * Detox
* Post Added Notifications display incorrect username (#1943)
* Save Changes/Post should take user to bot profile (#1961)
* Keyboard disappears with Next button on My Account/Settings (#1942)
* INVITE FRIENDS: CTA on Share Bot screen (#1766)
* Unblocked Users: Kill/reload puts unblocked users back in Blocked Users list (#1960)
* Temporarily disable geofence UI for Production (#1976)
* New User: Constant Offline State (#1946)
* Kill/reload required to remove deleted bot from the Saved Bot list (#1962)
* Bot List Redesign: Decluttering (#1972)

# 2.1.3 - 2018 March 8

* Build scripts, Nevercode scripts and tests.
* App was updated to version 2.1.1 (197) and user received bugsnag/app crash with logout (#1947)
* Adjust form validation error messages (Part of #1503)
* Add gps, magnetometer to UIRequiredDeviceCapabilities (Revert #1934)
* GEOFENCE v1: New Create Bot UI (to include Geofence option) (#1892)
* GEOFENCE v1: Share Visits Flow (#1894)
* GEOFENCE v1: Normal Bot Profile Changes (Owner View: All bots) (#1895)
* GEOFENCE v1: Geofence Bot Profile (Non-Owner View) (#1896)
* GEOFENCE v1: Explore Nearby Overlay "Always Primer" (#1898)
* GEOFENCE v1: Edit Location for Geofence Bots (#1906)
* GEOFENCE v1: Location Access Always Required (Toggling Geofence: ON) (#1907)
  * GEOFENCE: Text Changes for #1907 (#1953)
* GEOFENCE v1: Enable Geofence Bot UI when reqs are completed (#1909)
  * GEOFENCE: Text Changes for #1909 (#1952)
* Update and simplify codepush script.
* Some preliminary work for #1911

# 2.1.2 - 2018 March 5

* Remove gps, magnetometer from UIRequiredDeviceCapabilities (Rework #1934)

# 2.1.1 - 2018 March 5

* Tests cleanup.
* Stop observing GPS when a user is offline.
* Remove incorrect 3 character minimum for names (Rework #1503)
* New Message Button causes bugsnag (app crash) (#1930)
* INVITE FRIENDS: CTA on Share Bot screen (#1766)
* INVITE FRIENDS: Flow (#1767)
* Invite Friends: Replace dl link, with apple campaign tracking link (#1935)
* Handle errors on Prod (Rework #1811)
* Change app compatibility (#1934)
* Deleted Bots break the HS (#1864)
* Bots switched from Public to Private are not removed from users HS (#1819)
* Error in .../src/components/event-cards/EventBotCard.js:21 (#1940)

# 2.1.0 - 2018 February 28

* Onboarding: Disable Auto-correct when user creates user profile (#1889)
* Bot Edit: Cover Photo not displaying in bot edit view (Rework #1881)
* [dev] automate Bugsnag symbolication (#1910)
* Handle errors on Prod (#1811)
* Some code cleanup and tests cleanup
* Implement new user validation rules (client side) (#1503)
* New Follower not at the top of the Followers List (#1912)
* Missing the Discover, Share,(1-3 slides) screen with Logout (Rework #1882)
* Friends Screen: Online Friends Tweak (#1762)
* USER SEARCH & INVITE FRIENDS CTA: Friends Screen (#1759)
* USER SEARCH & INVITE FRIENDS CTA: Followers Screen (#1760)
* USER SEARCH & INVITE FRIENDS CTA: Following Screen (#1761)
* Geofence Related Research for Location Access Request (#1925)
  * and some location improvements
* INVITE FRIENDS: CTA on Share Bot screen (#1766)
* INVITE FRIENDS: Flow (#1767)

# 2.0.16 - 2018 February 26

* Missing the Discover, Share,(1-3 slides) screen with Logout (#1882)
* Bypass: Logout without killing the app results in new bypass account being pre-populated with last users data and undiscoverable (#1883)
* One-time migration of users from 1.x.x -> 2.x.x on prod (#1863)
* "Clear all" icon on Account Settings and Onboarding should be at the end of the field (#1835)
* Bot Edit: Cover Photo not displaying in bot edit view (#1881)
* Fix regression for deep linking

# 2.0.15 - 2018 February 23

* Update bugsnag script

# 2.0.14 - 2018 February 23

* Update bugsnag, testing, and unit tests
* Maintain user session token after internet disconnection (#1741)
* Incorrect avatar loader and user settings gear icon missing on user profile after a clean install (#1875)
* Un-saving a bot results in infinite spinner on Saved/My Bots List after a kill/reload (#1876)
* Error in /Users/aksonov/Documents/rn-chat/src/components/SideMenu.js:30 (#1879)

# 2.0.13 - 2018 February 22

* NEW UPDATE CTA: Logout required to receive HS notifications (#1871)
* Object has died: own profile (#1872)
* Object is dead (EventBotCard) (#1873)

# 2.0.12 - 2018 February 22

* Implement the rest of the analytics calls (#1812)
* Replace `Save` and `Share` with icons only (#1752)
* Messages: Images do not display (#1868)
* New Users with Welcome Banner do not see New Updates CTA (#1867)
* Various other changes

# 2.0.11 - 2018 February 21

* App loaded to bugsnag (#1851, #1852)
* This object has died and is no longer part of a state tree... (Rework #1810)
* User Profile settings: Preexisting avatar does not populate (#1862)
* Resend Code results in error verifying phone number (#1853)
* User Profile: Chat icon does not function (#1857)
* Extra Padding on the Saves List (#1834)
* User tapped on Push Notification and received white/blank screen (#1672)
* Home Stream: New bypass account has infinite loader, `End of Feed` UI missing (#1859)

# 2.0.10 - 2018 February 20

* hot-fix: HS/bot scroll issue fix

# 2.0.9 - 2018 February 20

* Create Bot: Bot metadata incorrectly listed as current location metadata when panning (#1821)
* This object has died and is no longer part of a state tree... (Rework #1810)
* Bot Profile: Post count is off by 1 when adding and deleting post (Rework #1828)
* Bot Profile: Location Icon does not function (#1829)
* Save Count remains 0 after users save (#1838)
* Bot Share: HS share notification not received when user shares bot during creation flow (#1831)
* HS share notifications are not received with push notifications (app closed or in the background) (#1846)
* Deleted bots remain on HS and are tappable for subscribers. (#1830)

# 2.0.8 - 2018 February 19

* Offline banner when coming from the background (#1843)
* App restarts when a user blocks another user (#1840)
* Bot List: Infinite Spinner on My Bots & Saved Bots (#1833)
* Bot Profile: Post count is off by 1 when adding and deleting post (#1828)
* Home Stream: Post Added Notifications do not display image or text (#1826)
* This object has died and is no longer part of a state tree... (#1810)
* Save Count remains 0 after users save (#1838)
* Newly created bots are not appearing in the My Bots list or User Profile (#1837)
* Bypass Accounts are unable to find each other vs. regular accounts when searching for users (#1822)
* Bot Profile: Bot Posts images display as grey assets (#1825)
* Unfollow results in both users unfollowing (#1836)

# 2.0.7 - 2018 February 16

* Bot Create: A space enables the post CTA (#1820)
* Logout never leaves loading screen (#1817)
* Re-enable push notifications (#1809)
* Implement the rest of the analytics calls (#1812)

# 2.0.6 - 2018 February 15

* Fix messages/chats (#1806)
* Re-add welcome banner to homestream for new user's first session (#1807)
* Re-enable push notifications (#1809)
* Show avatar on profile lists (#1813)
* Homestream: Default cover image on creation notifications. Cover images are not displaying. (#1814)

# 2.0.5 - 2018 February 14

* Re-activate chat button (#1798)
* Re-enable location warning screen (#1799)
* Re-enable bot post photo uploads (#1800)
* Re-enable bot post deletes (#1801)
* Fix filtering of friends on Bot Share (#1803)
* Fix MyAccount screen (#1804)

# 2.0.4 - 2018 February 13

* Update wocky-client
* Fix crashes
  * TypeError: null is not an object (#1792)
  * e.search is not a function. (#1793)
* Nav: Rename `Bots` to `Favorites` (#1750)
* Rename Bots header to Favorites (#1751)

# 2.0.3 - 2018 February 12

* Fixes for building on Nevercode
* Update react-native-xmpp to 1.0.0-beta.3
* Update React Native to 0.53.0
* Quick fix - bot image
* Recalibrate unit test snapshots

# 2.0.2 - 2018 February 12

* Move reactotron to separate file
* Update bugsnag
* Speculative fix: Cannot call a class as a function (from Router) (#1791)
* Other small changes

# 2.0.1 - 2018 February 09

* Re-enable bugsnag.

# 2.0.0 - 2018 February 09

Major rewrite.

* Refactor app to use custom elements for bot and user objects (#1724)
* Modify app to take advantage of pre-generated image URLs (#1737)

# 1.65.3 - 2017 December 20

* Don't crash on `scrollToEnd` (#1705, PR #1706)
* Correct timing on bot list loading (PR #1710)
  * Part of 3 Loaders: Bot List loader (#1645)
* Fix `model.user` is not defined error
* Explore Nearby: Bot Preview Banner does not appear after user has previously tapped bot pin then scrolls/pans/zooms (#1703)
* Bot Post: Deleted post not handled properly (#1707)
* Images never load for some bots on the app (#1708)
* Saved Bot List: Bots list order changes with loader (#1713)
* Add 'private icon' to Bot List (Saved, My Bots) and User Profile (#1455)
* Mixpanel events for diagnosing deep linking (#1714)
* Onboarding: Refine the keyboard cta per field (#1677)

# 1.65.2 - 2017 December 19

* Rework: 3 Loaders: Bot List loader (#1645)
* Rework: 4 Loaders: User Profile loader (#1646)
* Investigate `New Updates` not properly batching (#1651)
* make `list` available on Bots.js
* Persist address (on bots)
* 10 Loaders: Missing loaders on Following/Followers list (#1639)
* Fix deep linking (#1625)
  * Fix deep linking for bots
  * Enable deep linking to new "Follow" push notification (#1628)
  * Fix deep linking when app is newly started
* Duplicate bots in My Bots List when visibility is changed (#1678)
* Remove badge from Friend UI (#1676)
* Bot Profile: Images on bot posts do not display until user leaves and returns to bot profile (#1682)
* Mixpanel fixes (#1669, PR #1700)
  * Improve bot_view analytics (#1699)
  * [dev] include phone and/or sms code in mixpanel `_fails` (#1690)
* Fix an Explore Nearby crash (PR #1691)
* Fix Bugsnag: null location in BotDetails (#1702)

# 1.65.1 - 2017 December 16

* Display `bot unavailable` for compromised bots (#1576)
* User can't scroll through search results, should be able to (#1615)
* Bug: Tapping return submits a message instead of line break (#1636)
* Disable predictive keyboard functionality during geosearch state (#1624)
* User unable to save locations due to "undefined" bug (#1155)
* App crash when user taps current location button (#1623)
* Don't focus address bar for edit mode (Part of #1543)
* HS: Save (Subscriber) resets to 0 with app kill (#1611)
* Restore a unit test related to conversation ordering
* Bot Creation: Implement Static Bot Pin, allow "uber-like" panning (#1618)
* Save button for private bots that are shared have no spacing between the ellipsis (#1467)
* Bot Edit: Bot pin & cover photo do not center after panning on full map view (#1662)
* 1 Loaders: Avatar Image Loader (#1643)
* 2 Loaders: Uploading post w/image (#1644)
* 3 Loaders: Bot List loader (#1645)
* 4 Loaders: User Profile loader (#1646)
* 7 Loaders: Post loader (#1649)
* Enable error tracking on mixpanel/bugsnag for complete profile signup flow error (#1674)

# 1.65.0 - 2017 December 11

* Update native firebase cocoapods
* Increase mixpanel tracking of auth errors/failures (PR #1600, PR #1610)
* Change deep linking path to `conversation/:server/:item`
* Fix Country Picker, looks weird with RN update (#1603)
* Display geosearch result with highlighted two-row format (#1602)
* Bot Creation 1: Enter a place/location (#1522)
* Bot Creation 2: Geosearch field functionality: Place or Address (#1538)
* Bot Creation 3: Search Functionality (NOT a new screen) (#1540)
* Bot Creation 4: Autopopulate Place Name (2 flows) (#1541)
* Bot Creation 5: Post Bot (#1542)
* Bot Creation 7: Private toggle alert (#1544)
* Explore Nearby: Bot banner disappears after tapping bot pin (#1587)
* Miscellaneous fixes:
  * Preserve map tapped location and adjust marker positioning
  * this.bot is null until it is downloaded
* Bot Post: Return on the keyboard submits image upload (#1598)
* Rework Friends, Followers and Following screens (Rework #1472)
* Disable a unit test due to incorrect conversation ordering
* Bot Creation: Post Implementation Design Tweaks (#1614)
* Bot Edit 8: Tapping "<" & approving alert = Discard Changes (#1563)

# 1.64.0 - 2017 December 1

* Upgrade react-native-firebase to 3.1.1.
* HS: Loading wheel on HS when coming from the background (#1439)
* User required to Log In after each app kill with fresh install of the app (#1591)
* Loaders: Downloaders and Uploaders w/fail states (#1492)
* Add support for iPhone X.
* Clear friends presence status before entering to background (Rework #1558)
* Temporarily disable test 'retrieve list of own/following bots'.

# 1.63.2 - 2017 November 29

* Rework handling and ordering of HS async updates (#1557, PR #1570)
* New Updates overall functionality (as well as handling deletes) (#1473)
* Remove unnecessary logic in Map.js.
* Display bot header for newly created bot.
* Dynamically calculate radius for geosearch request. Interim fix only.
  * Fixes: Explore Nearby: Bot Pins don't load until user zooms out #1446
* Return empty array for empty subscriber list (saw bugsnag report)
* App does not retrieve roster nor refresh presence display on non-app-kill foreground (#1558)

# 1.63.1 - 2017 November 28

1.63.0 had build errors and was never released.

* Remove 'followers' from bot protocol and sources (#1450)
* Introduce 'ordering' field to work correctly with latest staging
* Fix codepush script
* Fix: White screen when tapping on New Updates (#1551)
* Cache management
  * Ability to reset old versions of local storage and preserve login data (#775)
* Update codepush script to use 'appcenter' (PR #1565)
* Unlock delayed geosearch. Fixes reoccurrence of:
  * Explore Nearby: Bot Pins don't load until user zooms out (#1446)
* Iterate on bot zoom levels for bot profile and map view (#1477)
* [dev] Remedy conversation query protocol (#886)
* Explore Nearby: New Bot Pins (UI only) (#1509)
* Android build compatibility (PR #1578)
* [dev] Refactor BotDetailsHeader (PR #1580)
* Improve Bugsnag integration (#1581)

# 1.62.2 - 2017 November 17

* Improve code style (PR #1548)
* HS: Use additional bot info/update to improve caching and performance (#1386)
* Change the client to use the 'new' geosearch API & refactoring (#1430)
* Minor fixes: Null bot handling. Removed unused buggy code.
* Use `tinyrobotStaging://` for deep linking for Staging.
* Don't process null events and null locations.

# 1.62.1 - 2017 November 15

* Onboarding: Keyboard doesn't slide away (#1529)
* Copy Address crashes the app (#1531)
* Also tweak keyboard dismissal code

# 1.62.0 - 2017 November 15

* Revert to tabs navigation because 'update' is not correctly processed
* Related to React Native 0.50.0 upgrade (#1419)
* Code cleanup (PR #1518)
* Better error handling (PR #1525, PR #1526)
* Change deep linking uri scheme (part of #1458)

# 1.61.0 - 2017 November 14

* Upgrade bugsnag
* Fix some bugsnag (crash) reports

# 1.60.2 - 2017 November 14

* Reporting: User stuck in Reporting screen (proper fix for #1512)
  * Revert previous workaround released in 1.60.1.
* Bot Profile: Pink border around Post Field (#1517)
* Update and clean up some dependencies
  * Fork react-native-camera-kit to fix #1516
* Blank White Screen with Take Photo option (#1516)
* Avoid exception when `_map` is not set yet

# 1.60.1 - 2017 November 13

* Analytics (#1459): Track follows from followers/following screens
* Fix new cause of: App opens to a blank screen (#1499)
* Fix styling of bottom row on BotDetails
* Reporting: User stuck in Reporting screen (#1512)

# 1.60.0 - 2017 November 13

**React Native upgrade** See below.

* Rework Friends, Followers and Following screens (#1472)
* Cleanup some packages (PR #1514)
* Upgrade React Native to 0.50.0 (#1419)

# 1.59.1 - 2017 November 10

* Disable xmpp location uploading
* Avoid exception for bypass users
* Avoid white screen for null sign-up profiles
* Throw exceptions for profile errors
* Use 'replace' and Stack instead of tabs for root container
  * Fixes: App opens to a blank screen (#1499)
* Tweak push notifications, support deep linking for push notifications
* Tweak presence sending

# 1.59.0 - 2017 November 9

* Hotfix: re-add Firebase phone auth reCAPTCHA link (allow non-bypass login)
  * Accidentally overwritten by support for deep linking.

# 1.58.1 - 2017 November 9

* Re-enable location updates (#1500)

# 1.58.0 - 2017 November 9

* Ensure enable/disable of push notifications on app start and logout (#1461, #1347)
* Bot creation default visibility to public (#1489)
* Explore Nearby zoom tweaks (#1441)
* Note: Post/Save Changes CTA should be above the keyboard (#1387)
* Message icon should be pink not grey (#1470)
* Clean up unused images.
* Disable tap on current location-indicator marker
  * Fixes: Explore Nearby: Current location (blue dot) gives error "Cannot find bot with id:" (#1491)
* In App Notifications (#1484)
* Preliminary support for Jest.
* Preliminary support for deep linking (first stage of #1458).
* Update mobx to 3.3.1.

# 1.57.0 - 2017 November 4

* Bug: When users share with more than one person using the 'user lookup' only the last person is shared (#1293)
* Quick Fix: Update: Blocking Pop Up Dialog Box (#1210)
* Use a canonical hostname for staging (PR #1233)

# 1.56.4 - 2017 November 3

* Reformatting
* BOT PROFILE: Enabling address metadata on bot pin (#1409)
  * Refactor geocoding
* Enable location metadata breakdown in the HS (#1433)
* HS UI/UX Cleanup (#1373)
  * Some Homestream caching work
* Various fixes for linting and unit tests
* Bot Creation: Current Location Undefined (#1466)
* Explore Nearby: Users not able to zoom in on clusters of bot pins (#1441)
* Make default more zoomed out on bot profile and full size map view (#1453)
* Bot Edit: Address metadata is blank when user changes the bot location to a different country (#1468)
* Bot Profile: No posts yet displays on map view with scroll on bot profile (#1444)
* Explore Nearby: Bot Pins don't load until user zooms out (#1446)
* Enable new tracking events with Mixpanel (#1459)
* Verified icon: download extended user data once on friends/followers/following list (PR #1476, Rework #922)
* Research and Implement Lock Default Font Size (#1310)
* When users post a private bot, CTA should say Post (Private) (#1358)
* Apply post text entry rules to 1:1 chat message entry box (#1207)

# 1.56.3 - 2017 October 27

Re-released 1.56.2 with debugging disabled.

# 1.56.2 - 2017 October 26

Botched release because it was built with debugging enabled.

(1.56.1 was never released.)

* Enable a verified icon for the following list (Rework #922)
* Initial implementation for new Bot UI
  * BOT PROFILE: Enable static image of the map behind the bot pin (#1405)
  * BOT PROFILE: Bot Pin Baseline (Placement) (#1406)
  * BOT PROFILE: Map View (#1412)
  * BOT PROFILE: Full Cover Image View (#1413)
* Implement paging for third party list of followers and following (#1418)
* Enable location metadata breakdown in the HS (#1433)
  * Fix: [dev] addressData error (#1454)
* BOT PROFILE: Header (#1404)
* BOT PROFILE: New asset for double tap save UI (#1408)
* BOT PROFILE: Enabling address metadata on bot pin (#1409)
* BOT PROFILE: Tweak previous "unsubscribe" alert to "unsave" alert (#1410)
* BOT PROFILE: Quick UI Tweaks (#1411)
* Split app.js into multiple files (PR #1451)

# 1.56.0 - 2017 October 20

* Process user roles correctly
* Various miscellaneous fixes
* Fix: Onboarding flashes to blank screen (#1428)
* Switch to Google Maps (#1422)
  * Then reverted back to Apple Mapkit
* Tapping on the "New Message" CTA kills the app (#1429)

# 1.55.1 - 2017 October 20

* Activate codepush from app start.
* Simplify onboarding screen.

# 1.55.0 - 2017 October 19

* MIGRATE to react-native-maps (iOS native maps) (#1422)
* Request latest friend list always during app startup
* Enable a verified icon for the following list (#922)
* Small UI tweaks (PR #1399)
* Update all "people: subscriber" icons with "hearts: saves" (#1351)
* Search users UI shows the wrong CTAs, should show "Follow" CTA (#1389)
* Reenable notifications dot for new messages (#1394)
* Implement address processing for separating address fields in app (#1190)
* Refactor: split BotInfo into sub-components. (PR #1420)
* Changes on the note disappear when coming back from background (#1400)

# 1.54.2 - 2017 October 15

* Make VerifyCode screen scrollable (PR #1398)
  * Related to: 1.54.1 rejected: Resolve App Store Rejection Issues (#1397)

# 1.54.1 - 2017 October 13

* Tweaks to Bot Posts (#1302)
* Update marketing icon, app icon (#1290)
* Explore Nearby does not load the bot profile (#1317)
* User Profile not populating with info from onboarding flow (#1360)
* Follow button doesn't update when user taps on follow (#1331)
* Remove flickering from HS card.
* Upgrade to latest RNRF and mixpanel.
* Note Added Notification not showing on HS (#1321)
* Correct disconnection from server after registering and backgrounding.

# 1.54.0 - 2017 October 11

* Remove push-registration-related infinite callback loop.

# 1.53.1 - 2017 October 10

* remove progress bar from Launch screen to avoid huge CPU overload

# 1.53.0 - 2017 October 9

* update location permission language
* re-enable mixpanel (#1328)

# 1.52.1 - 2017 October 6

* Fix sign-up flow (discovered on App store beta review)

# 1.52.0 - 2017 October 6

* Enable subscribers screen within Bot Profile (#1320)
* Tweaks to Bot Profile CTAs (#1304)
* Update to Firebase/Auth 4.3.0
* Remove Twitter Digits entirely
* Remporarily remove remote-notification and background fetch permissions (get us through the app store)
* Re-enable "swizzling"

# 1.51.0 - 2017 October 4

* Update react-native-firebase to v3.0.0.
* Enable reCAPTCHA auth flow for push notification disabled devices (#1338)

# 1.50.2 - 2017 October 3

* re-remove Firebase/Messaging
* cleaner error message on failed firebase phone number verification

# 1.50.1 - 2017 October 3

* Unstick firebase registration bug that affects first time registration

# 1.50.0 - 2017 October 3

* UI-less codepush updates (PR #1340)
  * Enable CodePushes on Production (#1169)
* Dismiss keyboard on nav transition (PR #1341)
  * Bug: Friends > Search: When user taps to search, then decides to navigate away, keyboard sticks (#1132)
* User is able to submit post multiple times (#1315)
* Re-add Firebase/Messaging.
* Remove Twitter digits.

# 1.49.0 - 2017 September 29

* Update marketing icon for prod app (#1290)

# 1.48.1 - 2017 September 29

* Tweaks for: Create/Edit Bot: NEW UI (#1202)
* Enable app EULA and privacy policy to links to website (#1286)
  * ... and update text on Create Profile
* Bug: Explore Nearby does not load the bot profile (but loads bot pin & preview) (#1317)

# 1.48.0 - 2017 September 27

* Bug: Header has been removed from all bots (#1299)
* Bug: Explore Nearby bot pins not loading (#1312)
* Rework: HS: Baseline Card Adjustments (#1182)
* Exclude deleted items from homestream pulls
* Rework: Create/Edit Bot: NEW UI (#1202)
* Battery Drain (#1245)
  * Clean up properly on app background
  * Disable uploading of location to server
* Update Firebase and Mixpanel libraries
  * Remove Firebase/Messaging
* Disable Mixpanel analytics

# 1.47.3 - 2017 September 22

(Skipped a version)

* Add 1024x1024 marketing icon (#1290)
* Revert react-native-firebase to 3.0.0-alpha.2
* Upgrade Background Geolocation library for iOS 11
* Tweak XCode location settings for iOS 11

# 1.47.1 - 2017 September 21

Broken release. Crashes upon login.

* Tweaks for #1182, #1183, #1184, #1223
* A fix for iOS 11
* Update firebase library

# 1.47.0 - 2017 September 21

A bit of a broken release due to iOS 11 API changes.

* Improve HS and tweaks, prevent accumulateItems from ineffective call (Related to #1234)
* Saved Bot List having loading issues (#1228)
* User is unable to unsubscribe from bot (#1156)
* Improve lazy loading across the app.
* Speculative fix: Firebase: Blank Discover Screen after logging out (#1242)
* Speculative fix: Onboarding Flow should have white background (#1150)
* Bug: Edit Bot > Tapping on text private or public crashes app (#1223)
* NEW Bot Profile: Enable New CTAs (#1185)
* Cover Photo Images Flashing when entering Bot Profile (#1212)
* App should not crash when posting to a non-accessible bot (#1198)
* HS: Baseline Card Adjustments (#1182)
* HS: Bot Post Added Card (#1183)
* Reporting: Bots (#1184)
* Upgrade React Native to 0.48.3 (#1269)
  * ... and then revert it
* fix NetInfo call

# 1.46.1 - 2017 September 15

* Keyboard disappears when user goes to Messages for verification code (#1240)
* Firebase: Stuck on Verifying with Signup (#1241)
* Update react-native-swiper to 1.5.12
* Refactor Home Stream
  * Addresses: homestream robustness (#1234)
  * Help with: Battery drain (hopefully) (#1245)

# 1.46.0 - 2017 September 14

* Firebase integration
* Onboarding w/Firebase: Verify your phone number screen (#1173)
* Onboarding w/Firebase: Enable a Country Code Library (#1177)
* Onboarding w/Firebase: Confirmation Code Screen (#1178)
* Onboarding w/Firebase: Resend Confirmation (#1179)

# 1.45.4 - 2017 September 8

* Disallow toggling Post order.

# 1.45.3 - 2017 September 8

* More homestream optimization (#1216)
* Add toggle to change bot posts order.

# 1.45.2 - 2017 September 7

* Improve homestream robustness
  * Fixes: HS won't load, spinning circle of doom (#1216)
* Don't save bots with zero radius (after rounding down)
  * Fixes: lert when editing a bot, title, visibility, and note (#1211)

# 1.45.1 - 2017 September 1

* Quick UI fixes for Posts per Codepush feedback (#1172)
* Bug: Entering a large amount of text pushes image from below scroll view (#1192)
* App Crash: Post on Created Bot Profile (#1194)
* Enter submits post (#1195)
* back to HS after blocking a user (Part of #1205)
* Don't block text with keyboard (Rework #1079)
* Avatar and username not tappable in Blocked List (Rework #1087)
* Enable checkboxes in share list (#1160)
* Only allow tapping once on Send Report (#1197)

# 1.45.0 - 2017 August 31

* Bot Posts: Legacy Issue: Disable image count (#1103)
* Refactor PeopleList.js component (PR #1158)
* Blocked Users Icon and NEW SCREEN Enable Block List UI (WIP #1087)
* Bot Posts: Deleting a post (#1110)
* Blocking: Add Ellipsis to User Profiles & Enable Action Sheet Flow (#1161)
* Bot Posts: Post Baseline UI within Bot Profile (#1109)
* Bot Posts: Post Bar: Creating a Post (#1107)
* Upgrade react native to 0.47.2.
* Reporting: Add Ellipsis to User Profiles & Enable Action Sheet Flow (#1079)
* Bot Posts Epic (#1102)
* Quick post fixes (#1172)
* "All Bots" -> "Saved Bots" (#1120)
* Add image to post (#1108)
* Bot Posts: Legacy Issue: Disable Add Photo UI (#1101)

# 1.44.4 - 2017 August 22

* Offline Indicator is showing user Offline when the user is Online (#1062)

# 1.44.3 - 2017 August 21

* Minor Explore Nearby improvement (Related to #1129).
* Following List: User Profile does not load when tapping Username (#1142)
* Automatic logouts for both normal and bypass users with app kills (#1143)

# 1.44.2 - 2017 August 18

* Rework #1130
* Fix crash during search when firstName or lastName is empty

# 1.44.1 - 2017 August 18

* People Screen: Blank user profile when bringing app from background (#1073)
* Rework: People Redesign: NEW Screen Followers (#936)
* Bug: Only Friends should appear in Friends list (#1130)
* First and last name is not updated for friends (#1135)
* Remove Create Bot icon from Following or Followers screens (#1098)
* Non/Owner User Profile: Remove/Hide Follow when user is Following (#1111)
* Bug: Hit slop for entire user field allows user to unfollow vs. just the 'Unfollow' CTA (#1133)
* Quick double tap on HS opens several same screens (#1136)

# 1.44.0 - 2017 August 17

* Add Photo: User should be taken to Photo Grid after adding an image (#1088)
* Optimize HS loading (Related to #1085)
* People Redesign (#932, #933, #935, #936, #938, #941)
* Codepush Improvements (#769)
* Enable xmpp-over-ssl encryption if reconnecting.
  * Fixes: Offline Issue: App goes Offline when user is connected (#1092)
* Persist bot information and manage it better.
  * Fixes: HS Optimization Latest Pavel Codepush 08/11 (#1093)
* Upgrade react-native-router-flux to 4.0.0-beta.18.
  * Fixes: Fix navbar buttons hitSlop (#1099)
* switch to customized react-native-camera-kit (#1064)
* Restore 'scroll to top' functionality for HS title tap (#1115)

# 1.43.1 - 2017 August 8

* Remove extra Camera/Photo Library pop (#1084, #1074)

# 1.43.0 - 2017 August 8

* Use a customised react-native-camera-kit. Replaces react-native-camera.
  * Related to: Estimate effort needed for custom image picker (#1064)
* Homestream optimizations and caching
  * Related to: Research Caching Optimization & Prioritization Strategies (legacy HS issue) (#1063)
* Side Menu redesign (#931)
* Speculative fix: Cover Photo: App becomes unresponsive (frozen) with Cancel on Take Photo (#1074)
* Upgrade react native to 0.47.1.
* Upgrade react-native-router-flux to 4.0.0-beta.17.

# 1.42.1 - 2017 August 3

* Show Launch screen during processing
  * Most efficient solution to remove delay once user signs up or logs in (#1044)
* Prioritise Home Stream loading
  * Home Stream: Legacy Issues with HS Loading (#1050)

# 1.42.0 - 2017 August 2

* Upgrade react-native-router-flux to 4.0.0-beta.15.
* Enhancement: Increase hit slop for new nav (#1022)
* Log in: Welcome banner should not display for Previous Users that Log In (#1011)
* Use encryption for XMPP (#973)
* Update codepush. Some refactoring.
* Bot Creation: Tapping next on the keyboard does not take user to the next screen. (#949)
* Some image optimizations.
* Note: Keyboard disappears slowly after saving a bot note (#1049)
* Messaging: Loading circle spinning but will not load previous thread (#1047)
* Messaging: New Message Banner received when leaving a message thread (#1046)

# 1.41.0 - 2017 July 28

* Messaging: App is shown as "connecting" when coming from background and offline/connecting Banner is not below the header (Rework #1019)
* Message Icon from Subscriber User Profile crashes app (#1033)
* Onboarding: Numeric Keyboard should not appear (#1010)
* Better infinite scroll/lazy loading for chat screen (#1012)

# 1.40.2 - 2017 July 27

* Bot Edit/Creation/Profile: Take Photo only adds 1st image (#1018)
* Messaging: App is shown as "connecting" when coming from background and offline/connecting Banner is not below the header (#1019)
* Messaging: 1:1 thread is blank when sending a message to a new user (#1023)
* Relative to Production, "Take Photo" quality is extremely low on Experimental (#1025)
* Note: Save button deletes Note (#1030)
* Bot Creation: The back caret from Bot Title screen gives current location (#1027)
* User is unable to change address on bot (#1032)
* 1:1 Chat improvements (#1012)

# 1.40.1 - 2017 July 26

Many changes. This is an incomplete list.

* Create Bot Flow: Photo Grid: Photos Header is missing from Photo Grid (#988)
* Bot Creation: Add Photo: The text Photo should be removed with buttons pushed down (#989)
* Photo Grid: Tapping on image does not take you to Carousel (#990)
* Bot Edit: Keyboard should not be visible when tapping edit on bot profile (#991)
* Add Photos: Chat Icon is on top of Skip (#992)
* Bot Creation: Photo Grid: Only 2 latest images added display (#993)
* Photo grid: adding image from carousel takes you to carousel instead of photo grid (#994)
* Bot share: share confirmation is shown over blank background (#995)
* Bug: When user receives follower notification and they follow back, they are unable to see people screen (#996)
* Bot share: share optional message disappears after adding another user to share flow (#997)
* Bug: When user taps on "Create Bot" and then decides to exit, they see a blue screen (#998)
* Bug: Within subscribers view, tapping on the message icon kills the app (#999)
* Bug: Within Photo Grid view (from an Edit Bot view), tapping on the message icon kills the app (#1000)
* Bug: Create Bot: A space input counts as an entry for Bot Name (#1002)
* UI Issues: User is unable to see the "Change Photo" cta via Bot Edit View & small UI issue (#1003)
* Alert error shown when attempting to delete an image from the carousel of a Bot Profile #1004
* Bug: Bot Address omitted from map view (#1005)
* Bug: Unable to send messages (#1008)
* Messaging: Messaging thread is top to bottom (#1014)
* Create Bot Flow: When user enters an address, the address field changes, however, the map does not pan to the address entered. (#1015)
* Bot Creation: Previous Bot Viewed location shows as current location for new bot (#1020)
* Explore Nearby: New User sees multiple bot pins with no friends/followers/following (#1021)
* Previously Logged In User receives Log in/Sign up screen with each close and reopening of app (#1026)
* App sent to the background breaks app (#1028)
* Other unlisted changes.

# 1.40.0 - 2017 July 20

**'NEW NAVIGATION'**

This is an unstable work-in-progress and everything is potentially broken.

* Upgrade to React Native 0.46.4
* Change navigation to:
  * react-native-router-flux 4.0.0-beta.12 + a few more commits
  * react-navigation 1.0.0-beta.11
* Lots and lots of other changes.

# 1.33.2 - 2017 July 6

* Fix: Clicking on mileage button copies wrong address to clipboard (#959)
* Fix: Mileage Button (Copy to Clipboard) button throws the app in the background (#955)
* Fix: Create Bot: App goes to background when adding photo from library (#965)
* Fix: Bot Profile: Add Photos doesn't add the images to photo grid (bot) (#951)

# 1.33.1 - 2017 July 3

* Replace icon.gif to remove beta (Rework #893)
* Fix: Bug: Bot Edit: Unable to edit bot and change privacy settings (#930)
* Change definition of 'new' follower so it expires after 1 week (#885)
* Bot details param refactoring. Fixes:
  * Bug: Bot creator unable to see subscribers (#944)
  * Bot Creation: Next button slides the keyboard away (#949)
  * Mileage Button takes user to another users bot (#950)
  * Bot Profile: Add Photos doesn't add the images to photo grid (bot) (#951)
  * App Crash on Lazy Loading of Images (#952)
  * Bot Creation/Edit: Create Bot and Save Changes Button are not Static (#953)
* Fix: Bot Subscriber does not see images on bot profile until kill/reload (#898)
* Remove alert on cancelled image (Rework #875)
* Change bot share filter opacity to 40% (Rework #882)

# 1.33.0 - 2017 June 29

* Limit Home Stream note creation item to 15 lines (Rework #587)
* Avoid request because user could be not connected yet (Rework #806)
* Image Cropping Part 1 (#873, #874, #875, #876, #877, #878)
* Image Cropping Part 2 (#879, #880, #881, #882)
* Better location pop-up handling (#927, #934)
  * Addresses: Onboarding: Enable "Location" ios permission request (#815)
* Fix: Compilation error ('location is not defined')
* Fix: Can't log in on 1.32.x with iOS 8 (#928)
* Reenable location update (#865)
* Remove "beta" language across app (#893)
* Move bot instance from singleton to BotDetails (#884)
* Temporary work-around to 'allow newly created bots on BotDetails'.

# 1.32.1 - 2017 June 20

* Show welcome UI, session counter, improving HS UI layout (#832)
* Show address UI when user taps address (#777)
* Add description change event to HS (#587)
* Onboarding: Location Access Priming Pop Up (#814)
* Onboarding: Enable "Push Notifications" ios permission request (#816)
* Onboarding functionality. Refactored validation. (#806, #807, #808, #904, #905)
* Onboarding style tweaks for smaller devices (Rework #803)

# 1.32.0 - 2017 June 15

* Onboarding: Loading Screen (#802)
* Onboarding: Configure Twitter Digits Design Flow (#813)
* Tweak launch screen
* Fix: Onboarding: Old User Profile info prepopulates on new User Profile. (#859)
* Fix: Onboarding: Logged out users still receive push notifications. (#860)
* Partial fix: Home Stream will not load on prod (#851)
* Refactor logging (#721)
* Fix: Cover Photo's Blank on Edit Screen (#766)
* Onboarding: Implement Helper Slides 1-3 (#803)
* Onboarding: Sign Up Flow (#806)
* Fix: Bot Share won't load in HS when app is in background (#847)

# 1.31.9#2 - 2017 June 14

* Fix: Bot Pins not loading (#857)

# 1.31.9 - 2017 June 8

* Refactor current Bots UI (#818)
* Reformatting (2-space tabs)
* Switch mapbox to hippware account (#785)
* Fix: Incorrect user profile displays when users share other bots when tapping on USERNAME within hs (#798)
* Message Banner Count, change language to say "New Messages" instead of a count (#751)
* Refactor and rework: Home: Timecode (#532)
* Filter out events without ids (#826)
* Rework Centered follow/unfollow button (#842)
* Fix navbar height for iphone 5s/iphone se (#844)
* Fix: User is unable to tap on their own avatar to see their own profile (#711)
* Fix: Within Bot Profile, username is not tappable (#799)
* Fix: User gets stuck on Explore Nearby while playing on Explore Nearby (#825)
* User Profile: Metadata Bar & other user details (#667)

# 1.31.8 - 2017 June 2

* Tweaks to rework: Home: Design Review (#660)
* UI Clean Up: Tapping on Bot Title scrolls user to the top for Bot Profiles (#629)
* Implement new time format parsing for Message feed timestamps (#770)
* Home: Timecode (#532)
* Fix: My Bot tab: Bots will not load, only displaying 4 bots (#791)
* Add follow button. Part of User Profile: Public View: Bots (#673)

# 1.31.7 - 2017 May 31

* Rework: User Presence Badge Indicator (#665)
* Update statem from 0.5.5 to 0.6.0.
* Better CodePush UI (#728)
* Home: Design Review (#660)
* [codepush] occasional crashes after update (#780)
* User Profile: Owner View: Bots (#668)
* User Profile: Bots: On Scroll Animation & End of List UI (#670)
* User Profile: Follower View: Bots (#672)
* Partial User Profile work
* Automated deploy scripts

# 1.31.6 - 2017 May 25

* Display boarding only for empty storage
  * Fixes: Onboarding, helper UI card appears consistently (#716)
* Bot Profile: Photo grid doesn't display full images on bottom row (#733)
* Selectively show presence badge. Fixes: User Presence Badge Indicator (#665)
* Change timestamp handling to handle timestamp format of new server (#753)
* Explore Nearby: Display "Create Bot" Icon in Explore Nearby (#659)

# 1.31.5 - 2017 May 23

* Fix: Add Photo Screen: Take a Photo button's is incorrect (#722)
* Fix: People screen UI changed after RN ugprade (#727)
* Differentiate 'name' and 'displayName' for codepush deployments

# 1.31.4 - 2017 May 22

* CodePush UI (#655, #656, #657, #658)

# 1.31.3 - 2017 May 19

* Fixed app crash again (old fix worked fine on simulator only)
* Update statem from 0.5.4 to 0.5.5.

# 1.31.2 - 2017 May 19

* Fixed app crash again (old fix worked fine on simulator only)
* Update statem from 0.5.3 to 0.5.4.

# 1.31.1 - 2017 May 19

* Change registration flow to allow bypassing twitter digits (Staging only) (#694)
* Fix '+' sign on bottom of cards introduced by upgrade to RN 0.44.0.
* Remove alert for codepush status code.
* Avoid app crash for many button touch event

# 1.31.0 - 2017 May 18

**React Native upgrade** See below.

* Refactoring
* Tweak handling of network changes.
  * Related to: Offline banner visible for a long time after going online (#638)
* Independent scrolling for Bot tabs.
  * Fixes: "All" tab and "My" tab should have independent scrolling (#581)
* Rework: Home: event: Bot Shared - 4 (#585)
* Upgrade to React Native 0.44.0 (#620)
  * Switch to temporary fork of react-native-mapbox-gl.
* Disable Night Mode (#621)
* Preliminary support for CodePush (part of #658).

# 1.30.0 - 2017 May 11

* Restructure BotCard for different size usernames
  * Fixes: Bot List: Quick redesign to fit longer usernames (#502)
* Tweak BotImage.js.
* Rework: UI Clean Up: Remove pressed state for Cover Image within Bot Profile (#615)
  * Restructure BotDetails.js
* Fix: Bot Profile: Alert when trying to delete images off old bots (#647)
* UI Clean Up: Tighten Bot Share w/1 user (#613)
* State flow refactoring (#680)
  * Also addresses:
    * Registration flow is broken after state refactoring (#676)
    * After testflight upgrade the app cannot connect to xmpp server (#677)
* Add optional message, colour filter to bot shares (Rework #585)
* Display original images on HS (#682)
* Make Explore Nearby a separate screen (#636)
* Remove Map View from HS & restore scrolling to top w/header (#637)
* Attempt to fix: Messages visible then disappear (#663)
* Avoid disconnect during iphone idle mode.

# 1.29.2 - 2017 May 5

* Fix: Home Stream: Incorrect Username on Bot Shares (#653)
* Source code formatting changes
* Fix: Can't delete bots (#645)

# 1.29.1 - 2017 May 4

* Fix incorrect DARK_GREY javascript reference (#644)

# 1.29.0 - 2017 May 4

* UI Clean Up: "Add Tags" should not be tappable (#610)
* UI Clean Up: Remove pressed state for Cover Image within Bot Profile (#615)
* UI Clean Up: Implement an "x" during Share Flow when user types (#614)
* UI Clean Up: Remove "Follow Me" CTA (#612)
* UI Clean Up: Remove "Add Cover Image" Icon from part of the Bot Create flow (#611)
* More descriptive error messages for image upload (to help with #558)
* Fix: App creates multiple active IDs again (#633)
* Home: Metadata Bar - 2 (#534)
* Home: event: Bot Created, Published Public - 3 (#584)
* Home: event: Bot Shared - 4 (#585)
* Home: event: Creation Update: Photo Added - 5 (#586)

# 1.28.1 - 2017 April 28

* Source code formatting changes
* Revert to static iOS images for map pins. (Rework #559)
* Fix: Keyboard doesn't pull up and cursor isn't on bot name (#605)
* Fix: App not responding during bot creation (#606)
* Fix: Blank image on carousel on first load after update (#603)
* Fix: Create Bot after Delete Bot pulls deleted bot details (#607)
* Fix: Lazy loading doesn't work on bot edit photo grid (#609)

# 1.28.0 - 2017 April 27

* Fix: Share Flow: Users chosen via search should stay chosen during share flow (#578)
* Bot Edit: Enable new Subscribers UI and implement batch load (#538)
* Avoid usage of incorrect cached images.
  * Fixes: Production: Blank images (#545).
* Avoid loading of newly created bot.
  * Fixes: Processing on thumbnail images takes too long (#575)
* Bot Creation: Change two icons for bot details (#540)
* Fix: User should not be able to see options on their own User Profile (#473)
* Remove shadow from Explore Nearby map icon (#559)
  * Fixes: Explore Nearby: Tapped Avatar is not selected Avatar (#556)
* Refactoring and code cleanup (#594)
* Improve app loading time
* Bot Edit: Tapping on Existing Photos should display Photo Grid (#543)

# 1.27.6 - 2017 April 21

* Add spacing and exclamation mark (Rework #505)
* Fix: New Message: Select Friend takes you to message feed (#568)
* Fix: Bot List Thumbnail doesn't reflect Cover Photo Change (#569)

# 1.27.5 - 2017 April 20

* Increase note character limit to 1500 (Rework #418)
* Remove custom retake image/use image screen from "Take Photo" flow (#555)
  * Reverts #491
* Implement image thumbnails (#493)
* Bot Profile: Sharing: Remove "Select" Options and instead skip to "Friends" selection screen (#525)
* Bot Profile: Sharing Flow 1 - Baseline UI, No user selected (#503)
* Bot Profile: Sharing Flow 2 - User selected (#504)
* Bot Profile: Sharing Flow 3 - Bot Shared (#505)

# 1.27.4 - 2017 April 14

* Fix: Unable to create bot (#551)

# 1.27.3 - 2017 April 13

* Upgrade:
  * react-native-router-native from 0.2.1 to 0.2.2
  * react-native-ios-controllers from 2.3.0 to 2.4.0
* Bot Creation: NEW Enable Note Upload Flow (#418)
* Bot Creation #6: Add Photo (Inactive State) > Choose from Photo Library (#490)
* Bot Creation #6: Add Photo (Inactive State) > Take Photo (#491)
* Fix: Private/Public Toggle not saving (#546)
* Fix: Bots have inconsistent subscribed status (#547)
  * Fixes: Bots sometimes are not added to subscribed list for all users via HS (#542)

# 1.27.2 - 2017 April 8

* Fix: When adding an image to a bot, user receives var url error (#529)

# 1.27.1 - 2017 April 7

* Fit cover photos to screen (Rework #420)
* Align bot name to center (Rework #515)
* Change "Edit" Ellipsis to Edit (#516)
* Fix: Tapping on the text doesn't toggle button. (Rework #444)
* Upgrade react-native-ios-controllers to 2.4.0.
* Tapping on name goes to Subscriber's User Profile (Rework #416)

# 1.27.0 - 2017 April 6

* Fix: Create Icon leads to Location Bot Screen (#412)
* Fix: Clear images during bot load (to avoid showing images of previous bot)
  * Fixes: Bot Profile Bug w/Images from different Bots (#483)

Many changes to the bot creation screen(s):

* Bot Creation: #2 After choosing location, user must name bot (#413)
* Bot Creation #4: Inactive State to Active States for Note, Photo and Tag (#489)
* Bot Creation: Share Toggle (#444)
* Bot Creation: Create Bot CTA is disabled when main two bot reqs. are empty (#445)
* Bot Creation #3: After choosing location and name, user enters full form screen (#414)
* Bot Edit: Edit View for Bot Profile (#421)

Then:

* Bot Profile: Hide Share Icon for Private Bots (#442)
* Remove Select/Deselect All from Select Friends List.
* Wrap long bot names.
* Bot Profile: Map CTA Tap and Hold Copies Bot Address (#408)
* Bot Profile > View Full Map: Tap and Hold on Bot Address, Copies to Clipboard (#409)
* Some code clean-up relating to bots.
* Bot Creation: NEW Enable subscribers list (#416)

# 1.26.2 - 2017 March 21

* Fix: Remove overlay shadow when cover photo is NOT present (#480)

# 1.26.1 - 2017 March 20

* Fix: Deleting Blank Image on bot: Alert received (#451)
* Don't recenter bot location when bot location is not changed
  * Fixes: Staging: Edit Bot: Bot Title can't be edited/changed. (#472)
* Don't remove already loaded bots from the map
  * Fixes: Staging: Bot Profile Map: Bot Icon Disappears (#471)

# 1.26.0 - 2017 March 17

* Display End of Feed UI for feeds (#389)
* Update mobx-react from 4.1.0 to 4.1.3.
* Explore Nearby: Separate API for Bot List loading (#397)
  * Add geosearch for bots API.
* Bot List: Implement Bot List Redesign (#438)

# 1.25.3 - 2017 March 13

* Rework processing of photo download.
  * Fixes: Check status code for downloaded image, remove file if any error to avoid corrupted caching (#456)

# 1.25.2 - 2017 March 10

* Rework bot photo processing.
  * Fixes: Bot Creation: Image not added to bot during creation (#458)
  * Fixes: Bot Creation: Subscriber count is 1 after bot creation (#459)
* Add 'X' as close button, change 'Select Friends' to 'Select Friend' (Rework #387)
* Remove bot button from Explore near by screen (Rework #439)
* Replace current share icon with NEW Share Icon (#440)

# 1.25.1 - 2017 March 9

* Return setting default radius to 30000

# 1.25.0 - 2017 March 9

* Rename files to be unique. Remove unneeded files (#419).
* Fix: Bot Profile: Randomize Default Cover Photo (#406)
* Use 'new-id' method when creating bots. Set image permissions correctly.
  * Fixes: Images not appearing on Bot (#323).
* Fix: Implement NEW Create Message CTA within Message Screen (#387)
* Implement NEW Create Bot CTA (#439)
* Bot images not appearing after server deploy (#456)
* Bot radius set to 0.
* Right side navigation removed.

# 1.24.3 - 2017 March 3

* Fix: Bot creation: Image order is incorrect w/in photo grid of Bot Profile (#423)
* Disable navbar hiding during scroll (#427).
* Disable logging for published apps to speed up loading
* Fix: Preserve aspect ratio for images (#386 'cropped' sub-issue).

# 1.24.2 - 2017 Feb 27

* Upgrade react-native-image-picker to version 0.25.7.

# 1.24.1 - 2017 Feb 27

Botched release: react-native-image-picker 0.25.6 resulted in iOS image permission issues.

* Avoid changing of image_items - this breaks lazy loading
  * Fixes: Image count changes and unable to view pass 6 images (#426)
* Not all 'reset' functions were removed. (Rework #404)
* Reverse order of HS items. Fixes: Scrolling or reorder of events (#428)
* Upgrade react-native-image-picker to custom version #0.25.6.
* Set image maximum upload size to 5000x5000, jpeg quality 0.95 (#386).

# 1.24.0 - 2017 Feb 23

* Fixed: Fix order for 'my bots' (Rework #393)
* Upgrade to React Native 0.41.2. Upgrade other modules to latest versions. (#373)
* Fixed: Avoid different padding for add/added buttons (Rework #362)
* Fixed: Display bot title dynamically when it is changed
  * Fixes Bot Profile: Title missing on banner #399
* Fixed: Change/check number of photos after new photo adding (#400)
* Fixed: Show "Add Photo" for an owner when his bot doesn't have images (Rework #372)
* Upgrade Mapbox and Digits modules. Move Mapbox to CocoaPods.
* Use Yarn for package management instead of npm.
* Removed: react-native-background-geolocation (previously used for location tracking) and associated location tracking code. (#411)
  * iOS 'background location tracking' alert should stop appearing.
* Upgraded component react-native-router-native to 0.2.1.
* Use new bot profile UI for 'explore near by' screen (#402)
* Clean up debugging code. Improve logging and error handling.
* Bot Profile: Remove Hamburger and Message Icon (#404)
* Fixed: Bot Creation: Not able to add Note + Photo during Bot Creation Flow (#388)
* Set image maximum upload size to 3000x3000 (#386)

# 1.23.1 - 2017 Feb 16

* Fixed: Add By Username: Omit entries with empty handle.
* Fixed: Uninitialised isStaging, isTesting variables.
  * Indirectly fixes New TR Account not visible in Add by Username #365.
* Fixed: #393 Kill Lazy Load on Bot List or Refine Lazy Load

Many changes to the bot profile:

* #344 Bot Profile: Enable sharing and editing ctas
* #360 Bot Profile: Enable default Cover Photo Asset
* #361 Bot Profile: Enable persistent banner
* #362 Bot Profile: Double tap on cover image enables "Bot Added"
* #363 Bot Profile: Public View
* #368 Bot Profile: Display Bot Owner Avatar and Username
* #369 Bot Profile: Note display
* #370 Bot Profile: Enable photo grid and Add Photo CTA for bot owners
* #371 Bot Profile: Enable Map CTA and Distance Calculation
* #372 Bot Profile: Bot Owner View
* #383 Bot Profile: Enable Full Screen Map View
* #390 Bot Owner View: Bot Profile: Display when only title and location are the only fields populated

# 1.22 Build 21 - 2017 Feb 09

Fixed: App creates multiple active ids for one device #249. Requires re-install.

# 1.22 Build 17 - 2017 Feb 09

Baseline
