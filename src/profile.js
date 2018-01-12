import {types, flow} from 'mobx-state-tree';

const USER = 'hippware.com/hxep/user';

function fromCamelCase({firstName, userID, phoneNumber, lastName, sessionID, uuid, ...result} = {}) {
  if (phoneNumber) {
    result.phone_number = phoneNumber;
    result.phoneNumber = phoneNumber;
  }
  if (userID) {
    result.auth_user = userID;
  }
  if (firstName) {
    result.first_name = firstName;
  }
  if (lastName) {
    result.last_name = lastName;
  }
  if (sessionID) {
    result.token = sessionID;
  }
  if (uuid) {
    result.user = uuid;
  }
  return result;
}

function camelize(str) {
  return str
    .replace(/\W|_|\d/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');
}

function processFields(fields: Object[]) {
  const result = {};
  // TODO: handle empty or null `fields`?
  fields &&
    fields.forEach((item) => {
      if (item.var === 'roles') {
        result.roles = item.roles && item.roles.role ? item.roles.role : [];
      } else {
        result[camelize(item.var)] = item.value;
      }
    });
  return result;
}

export default types.model('XmppProfile', {}).actions((self) => {
  return {
    loadProfile: flow(function* (user: string) {
      if (!user) {
        throw new Error('User should not be null');
      }
      // try to connect
      if (!self.connected) {
        throw new Error('XMPP is not connected!');
      }
      const isOwn = user === self.username;
      const node = `user/${user}`;
      const fields = isOwn
        ? ['avatar', 'handle', 'first_name', 'tagline', 'last_name', 'bots+size', 'followers+size', 'followed+size', 'roles', 'email', 'phone_number']
        : ['avatar', 'handle', 'first_name', 'tagline', 'last_name', 'bots+size', 'followers+size', 'followed+size', 'roles'];
      let iq = $iq({type: 'get'}).c('get', {xmlns: USER, node});
      fields.forEach((field) => {
        iq = iq.c('field', {var: field}).up();
      });
      const stanza = yield self.sendIQ(iq);
      return processFields(stanza.fields.field);
    }),
    updateProfile: flow(function* (d: Object) {
      const data = fromCamelCase(d);
      let iq = $iq({type: 'set'}).c('set', {
        xmlns: USER,
        node: `user/${self.username}`,
      });
      Object.keys(data).forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(data, field) && data[field]) {
          iq = iq
            .c('field', {
              var: field,
              type: field === 'avatar' ? 'file' : 'string',
            })
            .c('value')
            .t(data[field])
            .up()
            .up();
        }
      });
      return yield self.sendIQ(iq);
    }),
    remove: flow(function* () {
      yield self.sendIQ($iq({type: 'set'}).c('delete', {xmlns: USER}));
      yield self.disconnect();
    }),
  };
});
