function process(result: any): any {
  if (typeof result === 'object') {
    if (Array.isArray(result)) {
      return result.map(el => process(el))
    } else {
      if (result['#text'] && Object.keys(result).length === 1) {
        return result['#text']
      }
      const res: any = {}
      let changed = false
      // eslint-disable-next-line
      for (const key in result) {
        // eslint-disable-next-line
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
  fromCamelCase(data: any = {}): Object {
    const { firstName, userID, phoneNumber, lastName, sessionID, uuid, ...result } = data
    if (phoneNumber) {
      result.phone_number = phoneNumber
      result.phoneNumber = phoneNumber
    }
    if (userID) {
      result.auth_user = userID
    }
    if (firstName) {
      result.first_name = firstName
    }
    if (lastName) {
      result.last_name = lastName
    }
    if (sessionID) {
      result.token = sessionID
    }
    if (uuid) {
      result.user = uuid
    }
    return result
  },
  getJid(username: string, host: string, resource: string) {
    let jid = `${username}@${host}`
    if (resource) {
      jid = `${jid}/${resource}`
    }
    return jid
  },
  getNodeJid(jid: string) {
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
  getUniqueId(suffix: string) {
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = (Math.random() * 16) | 0, // eslint-disable-line
        v = c === 'x' ? r : (r & 0x3) | 0x8 // eslint-disable-line
      return v.toString(16)
    })
    if (typeof suffix === 'string' || typeof suffix === 'number') {
      return `${uuid}:${suffix}`
    } else {
      return `${uuid}`
    }
  },

  parseXml(xml: HTMLElement, arrayTags?: [string]) {
    function isArray(o: any) {
      return Object.prototype.toString.apply(o) === '[object Array]'
    }

    function parseNode(xmlNode: any, res: any) {
      if (!xmlNode) {
        return
      }
      if (xmlNode.nodeName === '#text') {
        /* if you want the object to have a properyty "#text" even if it is "",
                         remove that if-else and use code that is currently in else block
                         */
        if (xmlNode.nodeValue.trim() === '') {
          return
        } else {
          res[xmlNode.nodeName] = xmlNode.nodeValue
          return
        }
      }

      const jsonNode: any = {}
      const existing = res[xmlNode.nodeName]
      if (existing) {
        if (!isArray(existing)) {
          res[xmlNode.nodeName] = [existing, jsonNode]
        } else {
          res[xmlNode.nodeName].push(jsonNode)
        }
      } else if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) !== -1) {
        res[xmlNode.nodeName] = [jsonNode]
      } else {
        res[xmlNode.nodeName] = jsonNode
      }

      if (xmlNode.attributes) {
        const len: number = xmlNode.attributes.length
        for (let i = 0; i < len; i++) {
          const attribute = xmlNode.attributes[i]
          jsonNode[attribute.nodeName] = attribute.nodeValue
        }
      }

      const length = xmlNode.childNodes.length
      for (let i = 0; i < length; i++) {
        parseNode(xmlNode.childNodes[i], jsonNode)
      }
    }

    const result = {}
    parseNode(xml, result)
    return process(result)
  },

  // return hashcode for given string
  hashCode(s: string): number {
    let hash = 0,
      i,
      chr,
      len
    if (s.length === 0) return hash
    for (i = 0, len = s.length; i < len; i++) {
      chr = s.charCodeAt(i)
      hash = (hash << 5) - hash + chr // eslint-disable-line
      // Convert to 32bit integer.
      hash = Math.abs(hash & hash) // eslint-disable-line
    }
    return hash
  },

  iso8601toDate(date: string) {
    let timestamp = Date.parse(date),
      minutesOffset = 0
    if (isNaN(timestamp)) {
      // eslint-disable-next-line
      let struct = /^(\d{4}|[+\-]\d{6})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?))?/.exec(
        date
      )
      if (struct) {
        if (struct[8] !== 'Z') {
          minutesOffset = +struct[10] * 60 + +struct[11]
          if (struct[9] === '+') {
            minutesOffset = -minutesOffset
          }
        }
        return new Date(
          +struct[1],
          +struct[2] - 1,
          +struct[3],
          +struct[4],
          +struct[5] + minutesOffset,
          +struct[6],
          struct[7] ? +struct[7].substr(0, 3) : 0
        )
      } else {
        // XEP-0091 dateAsString
        timestamp = Date.parse(`${date.replace(/^(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')}Z`)
      }
    }
    return new Date(timestamp)
  }
}
