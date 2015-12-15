'use strict';
var React = require('react-native');
var {StyleSheet, PixelRatio} = React;
var styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 64,
        paddingBottom:50,
        backgroundColor: '#F7F7F7'
    },
    row: {
        flexDirection: 'row',
        backgroundColor:'white',
        borderRadius: 0,
        borderWidth: 0,
        borderColor: '#d6d7da',
        padding:10,
        alignItems: 'center'
    },
    categoryLabel: {
        backgroundColor:'transparent',
        fontSize: 15,
        textAlign: 'left',
        padding:10,
        fontWeight:'bold'
    },
    lastRow: {
        flexDirection: 'row',
        backgroundColor:'white',
        borderRadius: 0,
        borderWidth: 0,
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#d6d7da',
        padding:10,
        alignItems: 'center'
    },
    rowLabel: {
        left:10,
        flex:1,
        fontSize:15
    },
    rowText: {
        width:250,
        paddingRight: 10,
        paddingLeft: 10
    },
    rowBorder: {
        padding: 6,
        backgroundColor: 'white',
        borderBottomColor: '#f1f1f3',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowValue: {
        width:100,
        paddingRight: 10,
        flexDirection:'row'
    },
    rowInput: {
        left:10,
        right:10,
        fontSize:15,
        flex:1,
        height:30
    },
    messageItem: {
        padding:10,
        paddingRight:20,
        fontSize:15
    },
    messageBar: {
        backgroundColor:'white',
        flexDirection:'row',
        top:0,
        left:0,
        right:0,
        height:55
    },
    message: {
        left:10,
        right:10,
        fontSize:15,
        flex:1,
        height:30
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderColor: '#eeeeee',
        borderWidth:1,
        borderBottomWidth: 1 / PixelRatio.get(),
        marginTop:20,
        borderRadius:10,
        width:250,
        marginRight:20,
        marginLeft:20,
        alignSelf: 'center'
    },
    sendButton: {
        justifyContent: 'center',
        width:80
    },
    navBar: {
        backgroundColor: '#0db0d9'
    },
    loadingContainer: {
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'black',
        opacity:0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        width:70,
        borderRadius: 6,
        height:70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
    }

});


module.exports = styles;