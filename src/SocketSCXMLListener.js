var net = require('net');

import autobind from 'autobind-decorator';
import * as log from './utils/log';

@autobind
export default class SocketSCXMLListener {
  socket;
  allStates = [];
  activeTransitions = [];

  constructor(port = 8124) {
    try {
      this.socket = net.createConnection(port);
      this.socket.on('error', (error) => {
        log.log(`SocketSCXMLListener: Port ${port} is not active, enable server and restart the app, ${error}`);
        this.socket = null;
      });
    } catch (error) {
      log.log(`SocketSCXMLListener: Port ${port} is not active, enable server and restart the app, ${error}`);
    }
    // setTimeout(()=>{
    //   this.markInactiveTransitions();
    //   for (let state of this.allStates){
    //     this.sendInactiveState(state);
    //   }
    // }, 5000);
  }

  write(str) {
    if (this.socket) {
      try {
        this.socket.write(str);
      } catch (error) {
        log.log(`SocketSCXMLListener error: ${error} enable server and restart the app`);
        this.socket = null;
      }
    }
  }

  sendActiveState(stateId) {
    this.write(`1 ${stateId}\n`);
  }

  sendInactiveState(stateId) {
    this.write(`0 ${stateId}\n`);
  }

  onEntry(stateId) {
    this.allStates.push(stateId);
    if (this.activeState) this.sendInactiveState(this.activeState);
    this.activeState = stateId;
    this.sendActiveState(stateId);
    log.log(`ONENTER ${stateId}`);
  }

  onExit(stateId) {
    this.sendInactiveState(stateId);
    this.activeState = null;
    log.log(`ONEXIT ${stateId}`);
  }

  markInactiveTransitions() {
    for (const transition of this.activeTransitions) {
      this.write(`2 ${transition.from} -> ${transition.to}\n`);
    }
  }

  onTransition(sourceStateId, targetStateIds) {
    this.markInactiveTransitions();
    this.activeTransitions = [];
    for (const target of targetStateIds) {
      this.activeTransitions.push({from: sourceStateId, to: target});
    }
    for (const transition of this.activeTransitions) {
      this.write(`3 ${transition.from} -> ${transition.to}\n`);
    }
  }
}
