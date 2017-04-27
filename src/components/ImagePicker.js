import React, { Component } from 'react';
import { Image, View, TouchableOpacity, NativeModules } from 'react-native';

const options = {
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
    chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
    //customButtons: {
    //    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
    //},
    cameraType: 'back', // 'front' or 'back'
    mediaType: 'photo', // 'photo' or 'video'
    videoQuality: 'high', // 'low', 'medium', or 'high'
    maxWidth: 5000, // photos only
    maxHeight: 5000, // photos only
    //aspectX: 1, // aspectX:aspectY, the cropping image's ratio of width to height
    //aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
    quality: 0.95, // photos only
    angle: 0, // photos only
    allowsEditing: false, // Built in functionality to resize/reposition the image
    noData: true, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
    storageOptions: {
        // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
    }
};

function createHandler(callback) {
    return response => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            alert(response.error);
            console.log('UIImagePickerManager Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            // You can display the image using either data:
            console.log('SIZE:', response.fileSize, response.origURL);
            const fileName = response.uri.replace('file://', '');
            const source = {
                uri: fileName,
                type: fileName.indexOf('.png') === -1 ? 'image/jpeg' : 'image/png',
                name: fileName.substring(fileName.lastIndexOf('/') + 1),
                isStatic: true
            };
            callback(source, response);
        }
    };
}

export default function showImagePicker(title, callback) {
    const UIImagePickerManager = NativeModules.ImagePickerManager;
    UIImagePickerManager.showImagePicker({ ...options, title }, createHandler(callback));
}

export function launchImageLibrary(callback) {
    const UIImagePickerManager = NativeModules.ImagePickerManager;
    UIImagePickerManager.launchImageLibrary(options, createHandler(callback));
}

export function launchCamera(callback) {
    const UIImagePickerManager = NativeModules.ImagePickerManager;
    UIImagePickerManager.launchCamera(options, createHandler(callback));
}
