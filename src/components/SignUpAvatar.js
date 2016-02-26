import React, {Image, View, TouchableOpacity, NativeModules} from 'react-native';
import {k} from '../globals';

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {borderWidth:0, avatarSource:require("../../images/addPhoto.png")};
    }
    getSource(){
        return typeof this.state.avatarSource === 'object' && this.state.avatarSource;
    }
    onPhotoAdd(){
        const UIImagePickerManager = NativeModules.UIImagePickerManager;
        var options = {
            title: 'Select Avatar', // specify null or empty string to remove the title
            cancelButtonTitle: 'Cancel',
            takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
            chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
            //customButtons: {
            //    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
            //},
            cameraType: 'back', // 'front' or 'back'
            mediaType: 'photo', // 'photo' or 'video'
            videoQuality: 'high', // 'low', 'medium', or 'high'
            //maxWidth: 1000, // photos only
            //maxHeight: 1000, // photos only
            //aspectX: 1, // aspectX:aspectY, the cropping image's ratio of width to height
            //aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
            //quality: 0.2, // photos only
            angle: 0, // photos only
            allowsEditing: false, // Built in functionality to resize/reposition the image
            noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
            storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
                skipBackup: true, // image will NOT be backed up to icloud
                path: 'images' // will save image at /Documents/images rather than the root
            }
        };
        UIImagePickerManager.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                alert(response.error);
                console.log('UIImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data:
//                const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                this.setState({
                    avatarSource: source,
                    borderWidth:2
                });
            }
        });
    }

    render(){
        return <TouchableOpacity onPress={this.onPhotoAdd.bind(this)}>
            <Image style={{top:70*k,left:148*k,width:82*k,height:80*k, borderRadius:40*k, borderWidth:this.state.borderWidth*k, borderColor:'white'}} source={this.state.avatarSource}/>
        </TouchableOpacity>

    }
}