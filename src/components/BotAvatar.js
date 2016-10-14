import React from 'react';
import Avatar from './Avatar';

export default class extends React.Component {
  render(){
    return <Avatar {...this.props} source={require('../../images/avatarNoPic.png')}/>;
  }
}
