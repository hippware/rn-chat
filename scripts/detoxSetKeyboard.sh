#!/bin/sh

#grab the UDID from the plist
UDID=$(defaults read com.apple.iphonesimulator CurrentDeviceUDID)

#overwrite the existing value with false
#OR if the plist doesn't have that value add it in
/usr/libexec/PlistBuddy -c "Set :DevicePreferences:$UDID:ConnectHardwareKeyboard false" ~/Library/Preferences/com.apple.iphonesimulator.plist || /usr/libexec/PlistBuddy -c  "Add :DevicePreferences:$UDID:ConnectHardwareKeyboard bool false" ~/Library/Preferences/com.apple.iphonesimulator.plist