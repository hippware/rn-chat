import React from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity, ListView} from 'react-native';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {k, width} from './Global';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const imageWidth = 125*k;
@autobind
@observer
export default class extends React.Component {
  renderData(data, sectionID, rowID) {
    const index = parseInt(rowID);
    return (
      <View style={styles.box}>
        {data.source && <TouchableOpacity onPress={()=>this.props.onView && this.props.onView(this.props.isOwn ? index - 1 : index)}>
          <Image source={data.source} style={styles.boxImage} />
        </TouchableOpacity>}
        {data.add && <TouchableOpacity onPress={this.props.onAdd} style={{backgroundColor:'rgb(254,92,108)',flex:1, alignItems:'center',justifyContent:'center'}}>
          <Image source={require('../../images/iconAddPhotos.png')}/>
          <Text style={{fontFamily:'Roboto-Regular',color:'white', fontSize:14*k}}>Add Photos</Text>
        </TouchableOpacity>}
      </View>
    );
  }

  render(){
    const res = this.props.images.filter(x=>!!x.source).map(x=>x);
    console.log("PhotoGrid render:", this.props.images.length);
    if (this.props.isOwn){
      res.splice(0, 0, {add: true});
    }
    const dataSource = ds.cloneWithRows(res);
    return <ListView contentContainerStyle={styles.list}
                     enableEmptySections={true}
                     dataSource={dataSource} {...this.props}
                     renderRow={this.renderData} />;
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: imageWidth,
    height: imageWidth,
    alignItems: 'stretch',
  },
  boxImage: {
    flexGrow: 1,
    borderRadius:0,
    width:imageWidth,
    height:imageWidth,
  },
});