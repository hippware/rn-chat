import React from 'react-native';
const {View, ScrollView, ListView, Text, Navigator} = React;
import { connect } from 'react-redux/native';
import {processLogin} from '../actions/xmpp/xmpp';
import {removeConversation} from '../actions/conversations';
import {Actions} from 'react-native-redux-router';
var ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>(r1!==r2)});
var styles = require('./styles');
import Cell from './Cell';
import NavBar from './NavBar';
import Swipeout from 'react-native-swipeout';

class Conversations extends React.Component {
    constructor(props){
        super(props);
        this.state = this.getData(props);
    }
    componentDidMount(){
        this.props.dispatch(processLogin("user2", "user2"));
    }

    getData({list, conversations}){
        return list ?  {datasource: ds.cloneWithRows(list.map((username)=>conversations[username]))} : {};
    }

    componentWillReceiveProps(props){
        this.setState(this.getData(props));
    }

    render(){
        return (
            <View style={styles.container}>
                <NavBar {...this.props} nextTitle="Add" onNext={Actions.addConversation}/>
                <ScrollView style={styles.container}>
                    {this.state.datasource && <ListView
                        initialListSize={0}
                        dataSource={this.state.datasource}
                        renderRow={(el) =>
                            <Swipeout backgroundColor='white' autoClose={true} right={[{text:'Delete', backgroundColor:'red', color:'white', onPress:()=>this.props.dispatch(removeConversation(el.username))}]}>
                                <Cell key={el.username} label={el.username} />
                            </Swipeout>
                            }
                    />}

                </ScrollView>
            </View>
        );
    }
}

export default connect(state=>state.conversation)(Conversations)