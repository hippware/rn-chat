import {types} from 'mobx-state-tree';
import connect from './connect';
import iq from './iq';
import profile from './profile';
import register from './register';
import message from './message';
import roster from './roster';

export default types.compose(connect, register, message, iq, roster, profile).named('XmppService');
