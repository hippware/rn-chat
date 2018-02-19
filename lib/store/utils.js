"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
function pad(n, width, z = '0') {
    const str = n.toString();
    return str.length >= width ? str : new Array(width - str.length + 1).join(z) + n;
}
function process(result) {
    if (typeof result === 'object') {
        if (Array.isArray(result)) {
            return result.map(el => process(el));
        }
        else {
            if (result['#text'] && Object.keys(result).length === 1) {
                return result['#text'];
            }
            const res = {};
            let changed = false;
            // eslint-disable-next-line
            for (const key in result) {
                // eslint-disable-next-line
                if (result.hasOwnProperty(key)) {
                    changed = true;
                    res[key] = process(result[key]);
                }
            }
            if (!changed) {
                return undefined;
            }
            return res;
        }
    }
    else {
        return result;
    }
}
function isArray(res) {
    return Array.isArray(res) || mobx_1.isObservableArray(res);
}
exports.isArray = isArray;
function camelize(str) {
    return str
        .replace(/\W|_|\d/g, ' ')
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
        .replace(/\s+/g, '');
}
exports.camelize = camelize;
function processMap(data) {
    const res = {};
    Object.keys(data).forEach(key => {
        const value = data[key];
        try {
            if (value && value !== 'null' && key !== 'field') {
                if (key === 'roles') {
                    res.roles = isArray(data.roles.role) ? data.roles.role : [data.roles.role];
                }
                else if (['followers', 'bots', 'followed'].indexOf(key) !== -1) {
                    res[key + 'Size'] = parseInt(data[key].size);
                }
                else if (data[key].thumbnail_url !== undefined) {
                    // we have image here!
                    if (data[key]['#text']) {
                        res[key] = { id: data[key]['#text'], url: data[key].thumbnail_url };
                    }
                }
                else if (key === 'subscribed') {
                    res.isSubscribed = value === 'true';
                }
                else if (key === 'owner') {
                    res.owner = Strophe.getNodeFromJid(value);
                }
                else if (key === 'subscribers') {
                    res.followersSize = parseInt(value.size);
                }
                else if (key === 'location') {
                    res.location = { latitude: parseFloat(value.geoloc.lat), longitude: parseFloat(value.geoloc.lon) };
                }
                else if (key === 'updated') {
                    res.time = iso8601toDate(value).getTime();
                }
                else if (key === 'radius') {
                    res.radius = parseFloat(value);
                }
                else {
                    const numbers = ['image_items', 'total_items', 'visibility'];
                    res[camelize(key)] = numbers.indexOf(key) !== -1 ? parseInt(value) : value;
                }
            }
        }
        catch (e) {
            console.error(`Cannot process key ${key} value: ${value}`);
        }
    });
    delete res.id;
    return res;
}
exports.processMap = processMap;
function fromCamelCase(data = {}) {
    const { firstName, userID, phoneNumber, lastName, sessionID, uuid } = data, result = tslib_1.__rest(data, ["firstName", "userID", "phoneNumber", "lastName", "sessionID", "uuid"]);
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
exports.fromCamelCase = fromCamelCase;
function getJid(username, host, resource) {
    let jid = `${username}@${host}`;
    if (resource) {
        jid = `${jid}/${resource}`;
    }
    return jid;
}
exports.getJid = getJid;
function getNodeJid(jid) {
    if (jid.indexOf('@') < 0) {
        return jid;
    }
    return jid.split('@')[0];
}
exports.getNodeJid = getNodeJid;
/** Function: getUniqueId
 *  Generate a unique ID for use in <iq/> elements.
 *
 *  All <iq/> stanzas are required to have unique id attributes.  This
 *  function makes creating these easy.  Each connection instance has
 *  a counter which starts from zero, and the value of this counter
 *  plus a colon followed by the suffix becomes the unique id. If no
 *  suffix is supplied, the counter is used as the unique id.
 *
 *  Suffixes are used to make debugging easier when reading the stream
 *  data, and their use is recommended.  The counter resets to 0 for
 *  every new connection for the same reason.  For connections to the
 *  same server that authenticate the same way, all the ids should be
 *  the same, which makes it easy to see changes.  This is useful for
 *  automated testing as well.
 *
 *  Parameters:
 *    (String) suffix - A optional suffix to append to the id.
 *
 *  Returns:
 *    A unique string to be used for the id attribute.
 */
function getUniqueId(suffix) {
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = (Math.random() * 16) | 0, // eslint-disable-line
        v = c === 'x' ? r : (r & 0x3) | 0x8; // eslint-disable-line
        return v.toString(16);
    });
    if (typeof suffix === 'string' || typeof suffix === 'number') {
        return `${uuid}:${suffix}`;
    }
    else {
        return `${uuid}`;
    }
}
exports.getUniqueId = getUniqueId;
function generateID() {
    const time = Date.now();
    return `s${time}${pad(Math.round(Math.random() * 1000), 4)}`;
}
exports.generateID = generateID;
function parseXml(xml, arrayTags) {
    function isArray(o) {
        return Object.prototype.toString.apply(o) === '[object Array]';
    }
    function parseNode(xmlNode, res) {
        if (!xmlNode) {
            return;
        }
        if (xmlNode.nodeName === '#text') {
            /* if you want the object to have a properyty "#text" even if it is "",
                               remove that if-else and use code that is currently in else block
                               */
            if (xmlNode.nodeValue.trim() === '') {
                return;
            }
            else {
                res[xmlNode.nodeName] = xmlNode.nodeValue;
                return;
            }
        }
        const jsonNode = {};
        const existing = res[xmlNode.nodeName];
        if (existing) {
            if (!isArray(existing)) {
                res[xmlNode.nodeName] = [existing, jsonNode];
            }
            else {
                res[xmlNode.nodeName].push(jsonNode);
            }
        }
        else if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) !== -1) {
            res[xmlNode.nodeName] = [jsonNode];
        }
        else {
            res[xmlNode.nodeName] = jsonNode;
        }
        if (xmlNode.attributes) {
            const len = xmlNode.attributes.length;
            for (let i = 0; i < len; i++) {
                const attribute = xmlNode.attributes[i];
                jsonNode[attribute.nodeName] = attribute.nodeValue;
            }
        }
        const length = xmlNode.childNodes.length;
        for (let i = 0; i < length; i++) {
            parseNode(xmlNode.childNodes[i], jsonNode);
        }
    }
    const result = {};
    parseNode(xml, result);
    return process(result);
}
exports.parseXml = parseXml;
// return hashcode for given string
function hashCode(s) {
    let hash = 0, i, chr, len;
    if (s.length === 0)
        return hash;
    for (i = 0, len = s.length; i < len; i++) {
        chr = s.charCodeAt(i);
        hash = (hash << 5) - hash + chr; // eslint-disable-line
        // Convert to 32bit integer.
        hash = Math.abs(hash & hash); // eslint-disable-line
    }
    return hash;
}
exports.hashCode = hashCode;
function iso8601toDate(date) {
    let timestamp = Date.parse(date), minutesOffset = 0;
    if (isNaN(timestamp)) {
        // eslint-disable-next-line
        let struct = /^(\d{4}|[+\-]\d{6})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?))?/.exec(date);
        if (struct) {
            if (struct[8] !== 'Z') {
                minutesOffset = +struct[10] * 60 + +struct[11];
                if (struct[9] === '+') {
                    minutesOffset = -minutesOffset;
                }
            }
            return new Date(+struct[1], +struct[2] - 1, +struct[3], +struct[4], +struct[5] + minutesOffset, +struct[6], struct[7] ? +struct[7].substr(0, 3) : 0);
        }
        else {
            // XEP-0091 dateAsString
            timestamp = Date.parse(`${date.replace(/^(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')}Z`);
        }
    }
    return new Date(timestamp);
}
exports.iso8601toDate = iso8601toDate;
//# sourceMappingURL=utils.js.map