testing

# Change Log

Also: [Deployment history](https://github.com/hippware/tr-wiki/wiki/Client-deployment-history)

Ticket numbers refer to the ticket tracker for this project if not specified.

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
