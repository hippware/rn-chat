import scion from 'scion-core';
import assert from 'assert';
import {observable} from 'mobx';
import autobind from 'autobind-decorator';
const SUCCESS = "success";
const FAILURE = "failure";

@autobind
export default class StateStore {
  root;
  fsm;
  
  get fullStates(){return this.fsm.getFullConfiguration() }
  @observable state;
  get states(){return this.fsm.getConfiguration() }

  constructor(root){
    this.root = root;
    global.r = root;
    console.log("STATE STORE CREATED", r.profile.request);
    const model = require('../../gen/model');
    fsm = new scion.Statechart(model);
    this.fsm = fsm;

    global.setScene = function (scene){
      root.model.scene = scene;
    };

    global.on = function(stream, event) {
      stream.onValue(value => this.fsm.gen(event, value));
    };

    global.run = function (action, ...data){
      assert(action, "No action is defined");
      console.log("Run action with data:", data);
      try {
        const res = action(...data);
        if (res && res.then){
          res.then(response=>{
            console.log("SUCCESS:", response);
            this.fsm.gen(SUCCESS, response);
          }).catch(e => {
            console.log("FAILURE:", e);
            fsm.gen(FAILURE, e)
          });
        } else {
          setTimeout(()=>fsm.gen(SUCCESS, res));
        }
      } catch (e){
        console.log("FAILURE:", e);
        setTimeout(()=>fsm.gen(FAILURE, e));
      }
    };
    this.fsm.registerListener({
      onEntry: (state)=>{this.state = state;console.log(`Entering state ${state}`)},
      onTransition: (from, to)=>console.log(`Transition from ${from} to ${to}`),
      onError: ({tagname, reason, line, column}) =>
      {throw new Error(`Error: ${tagname} Reason: ${reason}, line:${line}, column:${column}`)},
      onExit: (state)=>console.log(`Exit state ${state}`)});
    this.fsm.start();
  }

  transition(name, data){
    this.fsm.gen(name, data);
  }
  
  success(data){
    this.transition(SUCCESS, data);
  }
  
  fail(error){
    this.transition(FAILURE, error);
  }
  
}