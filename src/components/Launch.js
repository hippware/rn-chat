import React, {View} from 'react-native';
import BackgroundVideo from './BackgroundVideo';
import {k} from '../globals';
import Promo from './Promo';
import SignUp from './SignUp';
import {Actions} from 'react-native-router-flux';

export default class extends React.Component {
    checkLogged(props){
        if (props.profile && props.profile.session){
            setTimeout(()=>Actions.main());
        }
    }
    componentDidMount(){
        this.checkLogged(this.props);
    }
    componentWillUpdate(props){
        this.checkLogged(props);
    }
    render(){
        const reduxLoaded = this.props.profile && !this.props.profile.session;
        return (
            <View style={{flex:1, alignItems: 'center', backgroundColor:'transparent'}}>
                <BackgroundVideo/>
                {reduxLoaded && (this.props.profile.digits ? <SignUp/>: <Promo/>) }
            </View>
        );
    }
}

