import React, {Image, View, TouchableOpacity, NativeModules} from 'react-native';
import {k} from '../globals';
import { connect } from 'react-redux';
import {processRequestUpload} from '../actions/xmpp/file';

class SignUpAvatar extends React.Component {
    constructor(props){
        super(props);
        this.state = {borderWidth:0, avatarSource:this.props.image || require("../../images/addPhotoLight.png")};
    }
    getSource(){
        return typeof this.state.avatarSource === 'object' && this.state.avatarSource;
    }
    onPhotoAdd(){
        const UIImagePickerManager = NativeModules.ImagePickerManager;
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
            maxWidth: 1000, // photos only
            maxHeight: 1000, // photos only
            //aspectX: 1, // aspectX:aspectY, the cropping image's ratio of width to height
            //aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
            //quality: 0.2, // photos only
            angle: 0, // photos only
            allowsEditing: false, // Built in functionality to resize/reposition the image
            noData: true, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
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
                console.log("SIZE:", response.size);
                const fileName = response.uri.replace('file://', '');
                const source = {
                    uri: fileName,
                    type: fileName.indexOf(".png")===-1 ? "image/jpeg" : "image/png",
                    name: fileName.substring(fileName.lastIndexOf("/")+1),
                    isStatic: true
                };

                console.log("UPLOAD:", {file: source, width: response.width, height: response.height, size: response.size});

                this.props.dispatch(processRequestUpload({file: source, width: response.width, height: response.height, size: response.size}));

                this.setState({
                    avatarSource: source,
                    borderWidth:2
                });
            }
        });
    }

    render(){
        return <TouchableOpacity style={{alignItems:'center'}} onPress={this.onPhotoAdd.bind(this)}>
            <Image style={[{top:70*k,width:82*k,height:80*k, borderRadius:40*k, borderWidth:this.state.borderWidth*k, borderColor:'white'}, this.props.style]} source={this.state.avatarSource}/>
        </TouchableOpacity>

    }
}

export default connect(state=>state)(SignUpAvatar)