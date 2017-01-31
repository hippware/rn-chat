# More documentation about how to customize your build
# can be found here:
# https://docs.fastlane.tools
fastlane_version "1.109.0"

# This value helps us track success metrics for Fastfiles
# we automatically generate. Feel free to remove this line
# once you get things running smoothly!
generated_fastfile_id "d11fe1f0-75c7-48b9-bd59-948029e1549b"

default_platform :ios

# Fastfile actions accept additional configuration, but
# don't worry, fastlane will prompt you for required
# info which you can add here later
lane :beta do
  # build your iOS app
  gym(
    scheme: "tinyrobot",
    workspace: "tinyrobot/ios/tinyrobot.xcworkspace",
      include_bitcode: true
  )

  # upload to Beta by Crashlytics
  crashlytics(
    api_token: "2c26edd537d6142e372672914153970108c65238",
    build_secret: "e56969f2fab13e4625d075e79ed061b596097a3ae7be8b6434ce3c698ecd356d"
  )
end
