# Change Log

Also: [Deployment history](https://github.com/hippware/tr-wiki/wiki/Client-deployment-history)

Ticket numbers refer to the ticket tracker for this project if not specified.


* Bug: Clicking on mileage button copies wrong address to clipboard #959)


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
