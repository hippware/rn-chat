# Change Log

This project uses MAJOR.MINOR.MICRO numbering but does not strictly adhere to [Semantic Versioning](http://semver.org/). 

Ticket numbers refer to the ticket tracker for this project if not specified. 

If there are many items, please split them into subheadings: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`

If there are not many items, just list them sequentially. 

# Unreleased

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
