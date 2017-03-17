# Change Log

This project uses MAJOR.MINOR.MICRO numbering but does not strictly adhere to [Semantic Versioning](http://semver.org/). 

Ticket numbers refer to the ticket tracker for this project if not specified. 

Suggested subheadings: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`

If there are not many items, just list them sequentially. 


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
