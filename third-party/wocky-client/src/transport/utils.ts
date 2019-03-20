declare var Strophe: any
import {when, isObservableArray} from 'mobx'
import {IEventBotGeofenceData} from '../model/EventBotGeofence'
import {IEventData} from '../model/Event'
import {IEventBotInviteData} from '../model/EventBotInvite'
import {IEventBotPostData} from '../model/EventBotPost'
import {IEventFriendInviteData} from '../model/EventFriendInvite'
import {IBotData} from '../model/Bot'
import {IProfilePartial} from '../model/Profile'
import jsrsasign from 'jsrsasign'
import {ILocation} from '../model/Location'
import {IMessageIn} from '../model/Message'
import {IEventLocationShareEndData} from '../model/EventLocationShareEnd'
import {IEventLocationShareData} from '../model/EventLocationShare'

export async function waitFor(condition: () => boolean) {
  return new Promise((resolve, reject) => {
    when(
      () => {
        let res = false
        try {
          res = condition()
        } catch (e) {
          reject(e)
        }
        return res
      },
      () => {
        resolve()
      }
    )
  })
}

function pad(n: number, width: number, z: string = '0') {
  const str: string = n.toString()
  return str.length >= width ? str : new Array(width - str.length + 1).join(z) + n
}
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

export function isArray(res: any) {
  return Array.isArray(res) || isObservableArray(res)
}

export function camelize(str: string): string {
  return str
    .replace(/\W|_|\d/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export function processMap(data: {[key: string]: any}) {
  const res: {[key: string]: any} = {}
  Object.keys(data).forEach(key => {
    const value = data[key]
    try {
      if (value && value !== 'null' && key !== 'field') {
        if (key === 'roles') {
          res.roles = isArray(data.roles.role) ? data.roles.role : [data.roles.role]
        } else if (['followers', 'bots', 'followed', 'visitors'].indexOf(key) !== -1) {
          res[key + 'Size'] = parseInt(data[key].size)
        } else if (data[key].thumbnail_url !== undefined) {
          // we have image here!
          if (data[key]['#text']) {
            res[key] = {id: data[key]['#text'], url: data[key].thumbnail_url}
          }
        } else if (key === 'subscribed') {
          res.isSubscribed = value === 'true'
        } else if (key === 'geofence') {
          res.geofence = value === 'true'
        } else if (key === 'visitor') {
          res.visitor = value === 'true'
        } else if (key === 'owner') {
          res.owner = Strophe.getNodeFromJid(value)
        } else if (key === 'subscribers') {
          res.followersSize = parseInt(value.size)
        } else if (key === 'location') {
          res.location = {
            latitude: parseFloat(value.geoloc.lat),
            longitude: parseFloat(value.geoloc.lon),
          }
        } else if (key === 'updated') {
          res.time = iso8601toDate(value).getTime()
        } else if (key === 'radius') {
          res.radius = parseFloat(value)
        } else {
          const numbers = ['image_items', 'total_items', 'visibility']
          res[camelize(key)] = numbers.indexOf(key) !== -1 ? parseInt(value) : value
        }
      }
    } catch (e) {
      // console.error(`Cannot process key ${key} value: ${value}`) TODO
    }
  })
  delete res.id
  return res
}
export function fromCamelCase(data: any = {}) {
  const {firstName, userID, phoneNumber, lastName, sessionID, uuid, ...result} = data
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
}
export function getJid(username: string, host: string, resource: string) {
  let jid = `${username}@${host}`
  if (resource) {
    jid = `${jid}/${resource}`
  }
  return jid
}
export function getNodeJid(jid: string) {
  if (jid.indexOf('@') < 0) {
    return jid
  }
  return jid.split('@')[0]
}

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
export function getUniqueId(suffix: string) {
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0, // eslint-disable-line
      v = c === 'x' ? r : (r & 0x3) | 0x8 // eslint-disable-line
    return v.toString(16)
  })
  if (typeof suffix === 'string' || typeof suffix === 'number') {
    return `${uuid}:${suffix}`
  } else {
    return `${uuid}`
  }
}
export function generateID() {
  const time = Date.now()
  return `s${time}${pad(Math.round(Math.random() * 1000), 4)}`
}

export function parseXml(xml: any, arrayTags?: [string]) {
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
}

// return hashcode for given string
export function hashCode(s: string): number {
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
}

export function iso8601toDate(date: string): Date {
  let timestamp = Date.parse(date),
    minutesOffset = 0
  if (isNaN(timestamp)) {
    // eslint-disable-next-line
    const struct = /^(\d{4}|[+\-]\d{6})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?))?/.exec(
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

export function convertImage(image) {
  return image && image.trosUrl ? {id: image.trosUrl, url: image.thumbnailUrl} : null
}

export function convertProfile({media, bots, hidden, presenceStatus, ...data}): IProfilePartial {
  // console.log('convertProfile', bots, followers, followed, data)
  return {
    hidden: hidden
      ? {enabled: hidden.enabled, expires: hidden.expires ? new Date(hidden.expires) : null}
      : null,
    avatar: convertImage(media),
    status: presenceStatus,
    botsSize: bots ? bots.totalCount : undefined,
    ...data,
  } as IProfilePartial
}

export function convertBotPost({node: {id, media, owner, content}}) {
  return {
    id,
    content: content || '',
    image: convertImage(media),
    // todo: need date/time?
    profile: convertProfile(owner),
  }
}

export function convertBot({
  lat,
  lon,
  media,
  addressData,
  owner,
  items,
  visitors,
  subscriberCount,
  visitorCount,
  subscribers,
  posts,
  ...data
}: any) {
  const relationships = subscribers.edges.length ? subscribers.edges[0].relationships : []
  const contains = (relationship: string): boolean => relationships.indexOf(relationship) !== -1
  return {
    ...data,
    owner: convertProfile(owner),
    image: convertImage(media),
    addressData: addressData ? JSON.parse(addressData) : {},
    totalItems: items ? items.totalCount : 0,
    followersSize: subscriberCount.totalCount - 1,
    visitors: visitors ? visitors.edges.map(rec => convertProfile(rec.node)) : undefined,
    posts: posts ? posts.edges.map(convertBotPost) : undefined,
    visitorsSize: visitorCount.totalCount,
    location: {latitude: lat, longitude: lon},
    visitor: contains('VISITOR'),
    isSubscribed: contains('SUBSCRIBED'),
  }
}

export function convertNotification(edge: any): IEventData | null {
  let bot: IBotData
  // TODO handle delete notifications
  if (edge.node.__typename === 'NotificationDeleted') {
    return null
  }
  const {
    node: {
      data: {__typename, ...data},
      id,
      createdAt,
    },
  } = edge
  const time = new Date(createdAt).getTime()
  // console.log('& converting type', __typename, createdAt, time)
  switch (__typename) {
    case 'UserInvitationNotification':
      const friendInviteNotification: IEventFriendInviteData = {
        id,
        time,
        user: convertProfile(data.user),
      }
      // console.log('& user follow:', friendInviteNotification)
      return friendInviteNotification
    case 'BotItemNotification':
      bot = convertBot(data.bot)
      const botItemNotification: IEventBotPostData = {
        id,
        time,
        post: {
          id: data.botItem.id,
          profile: data.botItem.owner.id,
          title: '',
          content: '',
          image: null,
        },
        bot,
      }
      return botItemNotification
    case 'BotInvitationNotification':
    case 'BotInvitationResponseNotification':
      // console.log('& invite notification', data.invitation)
      bot = {
        ...convertBot(data.bot),
        invitation: {
          id: data.invitation.id,
          accepted: data.invitation.accepted === true,
        },
      }
      const inviteNotification: IEventBotInviteData = {
        id,
        time,
        bot,
        sender: data.user.id,
        isResponse: __typename === 'InvitationResponseNotification',
        isAccepted: data.accepted,
        inviteId: data.invitation.id,
      }
      return inviteNotification
    case 'GeofenceEventNotification':
      // console.log('& invite response notification', data.invitation)
      bot = convertBot(data.bot)
      const geofenceNotification: IEventBotGeofenceData = {
        id,
        time,
        bot,
        profile: convertProfile(data.user),
        isEnter: data.event === 'ENTER',
      }
      return geofenceNotification
    case 'LocationShareEndNotification':
      const locationShareEndNotification: IEventLocationShareEndData = {
        time,
        sharedEndWith: data.user.id,
        id,
      }
      return locationShareEndNotification
    case 'LocationShareNotification':
      const locationShareNotification: IEventLocationShareData = {
        time,
        expiresAt: data.expiresAt ? iso8601toDate(data.expiresAt) : new Date(), // workaround for old notifications with null expiresAt
        sharedWith: data.user.id,
        id,
      }
      return locationShareNotification
    default:
      throw new Error('Failed to process notification: ' + JSON.stringify(edge))
  }
}

export function convertNotifications(notifications: any[]): IEventData[] {
  return notifications.map(convertNotification).filter(x => x) as IEventData[]
}

type TokenParams = {
  jti: string
  iss: string
  aud?: string
  dvc: string
  typ: string
  sub: string
  phone_number?: string
}

export function generateWockyToken(payload: TokenParams): string {
  const magicKey = '0xszZmLxKWdYjvjXOxchnV+ttjVYkU1ieymigubkJZ9dqjnl7WPYLYqLhvC10TaH'
  const header = {alg: 'HS512', typ: 'JWT'}
  const jwt = jsrsasign.jws.JWS.sign('HS512', header, payload, {utf8: magicKey})
  return jwt
}

export function assert(condition, message) {
  if (!condition) {
    message = message || 'Assertion failed'
    if (typeof Error !== 'undefined') {
      throw new Error(message)
    }
    throw message // Fallback
  }
}

export function convertLocation({longitude, latitude, accuracy}: ILocation, device: string) {
  return {
    device,
    lon: longitude,
    lat: latitude,
    accuracy,
  }
}

export function convertMessage({id, direction, content, otherUser, createdAt, media}): IMessageIn {
  return {
    id: id.toString(),
    otherUser,
    time: iso8601toDate(createdAt).getTime(),
    media: convertImage(media) as any,
    content: content || undefined,
    isOutgoing: direction === 'OUTGOING',
  }
}
