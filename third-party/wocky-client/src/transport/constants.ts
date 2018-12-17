export const AREA_TOO_LARGE = 'AREA_TOO_LARGE'

export const PROFILE_PROPS = `id firstName lastName handle
  media { thumbnailUrl fullUrl trosUrl }
  bots(first:0, relationship: OWNED) { totalCount }
  followers: contacts(first: 0 relationship: FOLLOWER) { totalCount }
  followed: contacts(first: 0 relationship: FOLLOWING) { totalCount }
`

export const BOT_PROPS = `id icon title address addressData description radius shortname 
  media { thumbnailUrl fullUrl trosUrl }
  type lat lon owner { ${PROFILE_PROPS} } 
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
  media {
    fullUrl
    thumbnailUrl
    trosUrl
  }
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
  ... on Notification {
    id
    createdAt
    data {
      __typename
      ... on UserFollowNotification {
        user {
          ${PROFILE_PROPS}
        }
      }
      ... on InvitationNotification {
        bot {${BOT_PROPS}}
        invitation {
          accepted
          id
        }
        user {${PROFILE_PROPS}}
      }
      ... on InvitationResponseNotification {
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
  `
// todo: delete after switch-over to GraphQL
export const NOTIFICATIONS_PROPS_OLD = `
  ... on Notification {
    id
    createdAt
    data {
      __typename
      ... on UserFollowNotification {
        user {
          ${PROFILE_PROPS}
        }
      }
      ... on InvitationNotification {
        bot {${BOT_PROPS}}
        invitation {
          accepted
          id
        }
        user {${PROFILE_PROPS}}
      }
      ... on InvitationResponseNotification {
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
          id
          image
          media {
            fullUrl
            thumbnailUrl
            trosUrl
          }
          owner {${PROFILE_PROPS}}
          stanza
        }
      }
      ... on GeofenceEventNotification {
        bot {${BOT_PROPS}}
        user {${PROFILE_PROPS}}
        event
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
  content
  createdAt
  direction
  media {
    fullUrl
    thumbnailUrl
    trosUrl
  }
  otherUser {
    ${PROFILE_PROPS}
  }
`
