require("./xmpp/strophe");
import assert from 'assert';
import * as xmpp from './xmpp';
import Utils from './xmpp/utils';
import Kefir from 'kefir';
import Atom from 'kefir.atom';

const NS = 'hippware.com/hxep/user';
const HANDLE = 'hippware.com/hxep/handle';

export const registerData = Atom().log("request");
export const token = registerData.filter(x=>x).flatMap(register).log("register");
export const connect = token.flatMap(xmpp.connect).log("connect");
export const editProfile = Atom().log("editProfile");
export const profile = combine(editProfile, connect.flatMap(request), connect).log("profile");
export const updateProfile = editProfile.sampledBy(connect, (a,b)=>({...a, user:b.user})).flatMap(update).log("update");

function register({resource, provider_data}) {
  assert(resource, "resource should not be null");
  assert(provider_data, "provider_data should not be null");
  const user = 'register';
  const password = `$J$${JSON.stringify({ provider: 'digits', resource, token: true, provider_data })}`;
  return xmpp.connect({user, password}).withHandler( (emitter, event) => {
    if (event.type === 'value' && event.value.error){
      const error = event.value.error;
      const xml = new DOMParser().parseFromString(error, "text/xml").documentElement;
      const data = Utils.parseXml(xml).failure;
      if ('redirect' in data) {
        const response = JSON.parse(data.text);
        emitter.emit({...response, password: response.token, error: undefined});
      } else {
        emitter.error(data.text);
      }
    }
  });
}

export function remove(){
  return xmpp.sendIQ($iq({type:'set'}).c('delete', {xmlns: NS}));
}

export async function lookup(handle) {
  assert(handle, "Handle should not be null");
  const iq = $iq({type: 'get'}).c('lookup', {xmlns: HANDLE}).c('item', {id: handle});
  const stanza = await xmpp.sendIQ(iq);
  const {first_name, last_name, avatar, jid, error} = stanza.results.item;
  if (error) {
    throw error;
  }
  const user = Strophe.getNodeFromJid(jid);
  return {user, first_name, last_name, handle, avatar, username: user};
}

function request({user, isOwn}) {
  assert(user, "User should not be null");
  const node = `user/${user}`;
  let fields = isOwn ?
      ['avatar', 'handle', 'first_name', 'last_name'] :
      ['avatar', 'handle', 'first_name', 'last_name', 'email'];
  assert(node, "Node should be defined");
  let iq = $iq({type: 'get'}).c('get', {xmlns: NS, node});
  for (let field of fields) {
    iq = iq.c('field', {var: field}).up()
  }
  return Kefir.stream(emitter => {
    xmpp.sendIQ(iq).then(stanza => {
      let data = stanza.fields.field;
      let result = {};
      for (let item of data) {
        result[item.var] = item.value;
      }
      emitter.emit({...toCamelCase(result), node:stanza.fields.node});
      emitter.end();
    }).catch(error => {emitter.error(error);emitter.end()});
  });
}

export function update({user, ...d}) {
  console.log("UPDATE", user, JSON.stringify(d));
  assert(user, "User should not be null");
  assert(d, "data should not be null");
  const data = fromCamelCase(d);
  assert(data, "data should be defined");
  let iq = $iq({type: 'set'}).c('set', {xmlns: NS, node: 'user/' + user});
  for (let field of Object.keys(data)) {
    if (data.hasOwnProperty(field) && data[field]) {
      iq = iq.c('field', {var: field, type: field==='avatar'? 'file': 'string'}).c('value').t(data[field]).up().up()
    }
  }
  return Kefir.fromPromise(xmpp.sendIQ(iq));
}
  
  
