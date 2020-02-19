export const AREA_TOO_LARGE = 'AREA_TOO_LARGE'

export const MEDIA_PROPS = `
   media {
     urls {
       type
       url
     }
     trosUrl
 }
 `

export const PROFILE_PROPS = `id firstName lastName handle
  ${MEDIA_PROPS}
  bots(first:0, relationship: OWNED) { totalCount }
  presence {
    status
    updatedAt
  }
`

export const BOT_PROPS = `id icon title address addressData description radius
  ${MEDIA_PROPS}
  lat lon owner { ${PROFILE_PROPS} }
  items(first:0) { totalCount }
  visitorCount: subscribers(first:0 type:VISITOR){ totalCount }
  subscriberCount: subscribers(first:0 type:SUBSCRIBER){ totalCount }
  subscribers(first:1 id: $ownUsername) { edges { relationships } }
`

export const BOT_POST_PROPS = `
  id
  content
  createdAt
  updatedAt
  ${MEDIA_PROPS}
  owner {
    ${PROFILE_PROPS}
  }
`

export const BOT_POST_LIST_PROPS = `
  totalCount
  edges {
    cursor
    node {
      ${BOT_POST_PROPS}
    }
  }
`

export const NOTIFICATIONS_PROPS = `
  ... on NotificationUpdate {
    ... on NotificationDeleted {
      deletedId: id
    }
    ... on Notification {
      id
      createdAt
      data {
        __typename
        ... on LocationShareNearbyStartNotification {
          user {
            ${PROFILE_PROPS}
          }
        }
        ... on LocationShareNearbyEndNotification {
          user {
            ${PROFILE_PROPS}
          }
        }
        ... on LocationShareEndNotification {
          user {
            ${PROFILE_PROPS}
          }
        }
        ... on LocationShareNotification {
          user {
            ${PROFILE_PROPS}
          }
          shareTypes {
            from
            to
          }
        }
        ... on UserInvitationNotification {
          user {
            ${PROFILE_PROPS}
          }
        }
        ... on BotInvitationNotification {
          bot {${BOT_PROPS}}
          invitation {
            accepted
            id
          }
          user {${PROFILE_PROPS}}
        }
        ... on BotInvitationResponseNotification {
          accepted
          invitation {
            id
            accepted
          }
          bot {
            ${BOT_PROPS}
          }
          user {${PROFILE_PROPS}}
        }
        ... on BotItemNotification {
          bot {${BOT_PROPS}}
          botItem {
            ${BOT_POST_PROPS}
          }
        }
        ... on GeofenceEventNotification {
          bot {${BOT_PROPS}}
          user {${PROFILE_PROPS}}
          event
        }
      }
    }
  }
  `

export const VOID_PROPS = `
  successful
  messages {
    message
  }
`

export const MESSAGE_PROPS = `
  id
  content
  createdAt
  direction
  clientData
  read
  ${MEDIA_PROPS}
  otherUser {
    ${PROFILE_PROPS}
  }
`
export const USER_LOCATION_PROPS = `
  lat
  lon
  capturedAt
  accuracy
  activity
  activityConfidence
`
