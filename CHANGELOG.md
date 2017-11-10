# Change Log

Also: [Deployment history](https://github.com/hippware/tr-wiki/wiki/Client-deployment-history)

Ticket numbers refer to the ticket tracker for this project if not specified.

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
  - react-native-router-flux 4.0.0-beta.12 + a few more commits
  - react-navigation 1.0.0-beta.11
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
  - Bug: Bot creator unable to see subscribers (#944)
  - Bot Creation: Next button slides the keyboard away (#949)
  - Mileage Button takes user to another users bot (#950)
  - Bot Profile: Add Photos doesn't add the images to photo grid (bot) (#951)
  - App Crash on Lazy Loading of Images (#952)
  - Bot Creation/Edit: Create Bot and Save Changes Button are not Static (#953)
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
  - Restructure BotDetails.js
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
  - react-native-router-native from 0.2.1 to 0.2.2
  - react-native-ios-controllers from 2.3.0 to 2.4.0
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
