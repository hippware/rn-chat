// pad given number with given width and symbol z, like (1, 4, '0') -> '0001'
function pad (n, width, z) {
    z = z || '0'
    n = n + ''
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

function process (result) {
    if (typeof result === 'object') {
        if (Array.isArray(result)) {
            return result.map(el => process(el))
        } else {
            if (result['#text'] && Object.keys(result).length === 1) {
                return result['#text']
            }
            let res = {}
            let changed = false
            for (let key in result) {
                if (result.hasOwnProperty(key)) {
                    changed = true
                    res[key] = process(result[key])
                }
            }
            if (!changed) {
                return undefined
            }
            return res
        }
    } else {
        return result
    }

}

export default {
    clone(obj) {
        if (Array.isArray(obj)) {
            return obj.map(x => clone(x))
        }
        if (obj == null || typeof(obj) != 'object') {
            return obj
        }
        var temp = new obj.constructor()

        for (var key in obj) {

            if (obj.hasOwnProperty(key)) {
                if (key != 'state') {
                    temp[key] = clone(obj[key])
                }
            }
        }

        return temp
    },
    getJid(username, host, resource){
        let jid = username + '@' + host
        if (resource) {
            jid = jid + '/' + resource
        }
        return jid
    },
    getNodeJid(jid) {
        if (jid.indexOf('@') < 0) {
            return null
        }
        return jid.split('@')[0]
    },

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
    getUniqueId: function (suffix) {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8
            return v.toString(16)
        })
        if (typeof(suffix) == 'string' || typeof(suffix) == 'number') {
            return uuid + ':' + suffix
        } else {
            return uuid + ''
        }
    },

    parseXml(xml, arrayTags){
        function isArray (o) {
            return Object.prototype.toString.apply(o) === '[object Array]'
        }

        function parseNode (xmlNode, result) {
            if (!xmlNode) {
                return
            }
            if (xmlNode.nodeName == '#text') {
                /* if you want the object to have a properyty "#text" even if it is "",
                 remove that if-else and use code that is currently in else block
                 */
                if (xmlNode.nodeValue.trim() == '') {
                    return
                }
                else {
                    result[xmlNode.nodeName] = xmlNode.nodeValue
                    return
                }
            }

            var jsonNode = {}
            var existing = result[xmlNode.nodeName]
            if (existing) {
                if (!isArray(existing)) {
                    result[xmlNode.nodeName] = [existing, jsonNode]
                }
                else {
                    result[xmlNode.nodeName].push(jsonNode)
                }
            }
            else {
                if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) != -1) {
                    result[xmlNode.nodeName] = [jsonNode]
                }
                else {
                    result[xmlNode.nodeName] = jsonNode
                }
            }

            if (xmlNode.attributes) {
                var length = xmlNode.attributes.length
                for (var i = 0; i < length; i++) {
                    var attribute = xmlNode.attributes[i]
                    jsonNode[attribute.nodeName] = attribute.nodeValue
                }
            }

            var length = xmlNode.childNodes.length
            for (var i = 0; i < length; i++) {
                parseNode(xmlNode.childNodes[i], jsonNode)
            }
        }

        var result = {}
        parseNode(xml, result)
        return process(result)
    },

    // generate ID for all xml stanzas
    generateID() {
        const time = Date.now()
        return `s${time}${pad(Math.round(Math.random() * 1000), 4)}`
    },

    // return hashcode for given string
    hashCode(s) {
        var hash = 0, i, chr, len
        if (s.length === 0) return hash
        for (i = 0, len = s.length; i < len; i++) {
            chr = s.charCodeAt(i)
            hash = ((hash << 5) - hash) + chr
            hash = Math.abs(hash & hash) // Convert to 32bit integer
        }
        console.log('HASH:', s, hash)

        return hash
    },

    iso8601toDate(date){
        var timestamp = Date.parse(date), minutesOffset = 0
        if (isNaN(timestamp)) {
            var struct = /^(\d{4}|[+\-]\d{6})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?))?/.exec(date)
            if (struct) {
                if (struct[8] !== 'Z') {
                    minutesOffset = +struct[10] * 60 + (+struct[11])
                    if (struct[9] === '+') {
                        minutesOffset = -minutesOffset
                    }
                }
                return new Date(+struct[1], +struct[2] - 1, +struct[3], +struct[4], +struct[5] + minutesOffset, +struct[6], struct[7] ? +struct[7].substr(0, 3) : 0)
            } else {
                // XEP-0091 dateAsString
                timestamp = Date.parse(date.replace(/^(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + 'Z')
            }
        }
        return new Date(timestamp)
    }
}