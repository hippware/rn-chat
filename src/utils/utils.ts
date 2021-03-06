declare var Strophe: any
import {when, isObservableArray} from 'mobx'
import {IEventBotGeofenceData} from '../model/EventBotGeofence'
import {IEventData} from '../model/Event'
import {IEventBotInviteData} from '../model/EventBotInvite'
import {IEventBotPostData} from '../model/EventBotPost'
import {IEventFriendInviteData} from '../model/EventFriendInvite'
import {IBotData} from '../model/Bot'
import {IProfilePartial} from '../model/Profile'
import {ILocationSnapshot} from '../model/Location'
import {IMessageIn} from '../model/Message'
import {IEventLocationShareEndData} from '../model/EventLocationShareEnd'
import {IEventLocationShareData} from '../model/EventLocationShare'
import {IEventLocationShareNearbyEndData} from '../model/EventLocationShareNearbyEnd'
import {IEventUserBeFriendData} from '../model/EventUserBefriend'

export async function waitFor(
  condition: () => boolean,
  errorMessage: string = '',
  timeout: number = 0
) {
  const promise = new Promise((resolve, reject) => {
    when(() => {
      let res = false
      try {
        res = condition()
      } catch (e) {
        reject(e)
      }
      return res
    }, resolve)
  })

  return timeout > 0
    ? Promise.race([
        promise,
        new Promise((resolve, reject) => {
          setTimeout(
            () => reject(`waitFor timed out in ${timeout} milliseconds.\r\n${errorMessage}`),
            timeout
          )
        }),
      ])
    : promise
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

export function convertImage(image, preserveAspect: boolean = false) {
  if (image && image.trosUrl) {
    const aspect = image.urls.find(({type}) => type === 'ASPECT_THUMBNAIL')
    const thumbnail = image.urls.find(({type}) => type === 'THUMBNAIL')
    if (!thumbnail) {
      return null
    }
    return preserveAspect && aspect
      ? {
          id: image.trosUrl,
          url: aspect.url,
          type: 'aspect',
        }
      : {
          id: image.trosUrl,
          url: thumbnail.url,
        }
  } else {
    return null
  }
}

export function convertProfile({
  media,
  bots,
  presence,
  ownShareType,
  shareType,
  ...data
}): IProfilePartial {
  return {
    avatar: convertImage(media),
    status: presence ? presence.status : undefined,
    statusUpdatedAt: presence ? new Date(presence.updatedAt) : undefined,
    botsSize: bots ? bots.totalCount : undefined,
    ownShareType,
    shareType,
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
    owner: convertProfile({...owner, _accessedAt: data._accessedAt}),
    image: convertImage(media),
    addressData: addressData ? JSON.parse(addressData) : {},
    totalItems: items ? items.totalCount : 0,
    followersSize: subscriberCount.totalCount - 1,
    visitors: visitors
      ? visitors.edges.map(rec => convertProfile({...rec.node, _accessedAt: data._accessedAt}))
      : undefined,
    posts: posts ? posts.edges.map(convertBotPost) : undefined,
    visitorsSize: visitorCount.totalCount,
    location: {latitude: lat, longitude: lon},
    visitor: contains('VISITOR'),
    isSubscribed: contains('SUBSCRIBED'),
  }
}

export function convertNotification(edge: any): IEventData | {deletedId: string} | null {
  let bot: IBotData
  if (edge.node.__typename === 'NotificationDeleted') {
    return {deletedId: edge.node.deletedId}
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
        user: convertProfile({...data.user, _accessedAt: time}),
      }
      // console.log('& user follow:', friendInviteNotification)
      return friendInviteNotification
    case 'UserBefriendNotification':
      const userBefriendNotification: IEventUserBeFriendData = {
        id,
        time,
        userBeFriend: convertProfile({...data.user, _accessedAt: time}),
      }
      return userBefriendNotification
    case 'BotItemNotification':
      bot = convertBot({...data.bot, _accessedAt: time})
      const botItemNotification: IEventBotPostData = {
        id,
        time,
        post: {
          id: data.botItem.id,
          profile: convertProfile({...data.botItem.owner, _accessedAt: time}) as any,
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
        ...convertBot({...data.bot, _accessedAt: time}),
        invitation: {
          id: data.invitation.id,
          accepted: data.invitation.accepted === true,
        },
      }
      const inviteNotification: IEventBotInviteData = {
        id,
        time,
        bot,
        sender: convertProfile({...data.user, _accessedAt: time}),
        isResponse: __typename === 'BotInvitationResponseNotification',
        isAccepted: data.accepted,
        inviteId: data.invitation.id,
      }
      return inviteNotification
    case 'GeofenceEventNotification':
      // console.log('& invite response notification', data.invitation)
      bot = convertBot({...data.bot, _accessedAt: time})
      const geofenceNotification: IEventBotGeofenceData = {
        id,
        time,
        bot,
        profile: convertProfile({...data.user, _accessedAt: time}),
        isEnter: data.event === 'ENTER',
      }
      return geofenceNotification
    case 'LocationShareEndNotification':
      const locationShareEndNotification: IEventLocationShareEndData = {
        time,
        sharedEndWith: convertProfile({...data.user, _accessedAt: time}),
        id,
      }
      return locationShareEndNotification
    case 'LocationShareNotification':
      const locationShareNotification: IEventLocationShareData = {
        time,
        sharedWith: convertProfile({...data.user, _accessedAt: time}),
        shareType: data.shareTypes.to,
        ownShareType: data.shareTypes.from,
        id,
      }
      return locationShareNotification
    case 'LocationShareNearbyEndNotification':
      const locationShareNearbyEndNotification: IEventLocationShareNearbyEndData = {
        time,
        sharedNearbyEndWith: convertProfile({...data.user, _accessedAt: time}),
        id,
      }
      return locationShareNearbyEndNotification
    default:
      // tslint:disable-next-line
      console.log('Failed to process notification: ' + JSON.stringify(edge))
      return null
  }
}

export function convertNotifications(notifications: any[]): IEventData[] {
  return notifications.map(convertNotification).filter(x => x) as IEventData[]
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

export function convertLocation(
  {longitude, latitude, accuracy, activity, activityConfidence}: ILocationSnapshot,
  device: string
) {
  return {
    device,
    lon: longitude,
    lat: latitude,
    accuracy,
    activity,
    activityConfidence,
  }
}

export function convertMessage({
  id,
  direction,
  content,
  otherUser,
  createdAt,
  media,
  clientData,
  read,
}): IMessageIn {
  const data = clientData ? JSON.parse(clientData) : {}
  const isOutgoing = direction === 'OUTGOING'
  return {
    id: data.id || id.toString(),
    sid: id,
    otherUser,
    unread: isOutgoing ? false : !read,
    time: iso8601toDate(createdAt).getTime(),
    media: convertImage(media, true) as any,
    content: content || undefined,
    isOutgoing: direction === 'OUTGOING',
  }
}
