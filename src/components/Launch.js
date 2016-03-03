import React, {View} from 'react-native';
import BackgroundVideo from './BackgroundVideo';
import {k} from '../globals';
import Promo from './Promo';
import SignUp from './SignUp';
import {Actions} from 'react-native-router-flux';

export default class extends React.Component {
    checkLogged(props){
        if (props.profile && props.profile.sessionID && props.profile.handle) {
            setTimeout(()=>Actions.main());
        }

    }
    componentDidMount(){
        this.checkLogged(this.props);
    }
    componentWillUpdate(props){
        this.checkLogged(props);
        if (props.profile && props.profile.error){
            alert("ERROR:"+JSON.stringify(props.profile.error));
        }
    }
    render(){
        console.log("DATA:", this.props.profile);
        const reduxLoaded = this.props.profile && !this.props.profile.handle;
        return (
            <View style={{flex:1, alignItems: 'center', backgroundColor:'transparent'}}>
                <BackgroundVideo/>
                {reduxLoaded && (this.props.profile.phoneNumber? <SignUp/>: <Promo/>) }
            </View>
        );
    }
}

