import {IFirebaseStore} from 'src/store/FirebaseStore'
import {Bot} from 'wocky-client'

export default {
  wocky: {
    id: 'wocky',
    username: 'username',
    password: 'password',
    host: 'host',
    sessionCount: 0,
    geofenceBots: {},
    chats: {
      list: [],
      unread: 0,
    },
    files: {} as any,
    profiles: {} as any,
    bots: {} as any,
    profile: {
      handle: 'southerneer',
      firstName: 'eric',
      lastName: 'kirkham',
      email: 'eric@hippware.com',
      loaded: true,
      updateError: '',
    } as any,
    connected: true,
    loadProfile: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
    connecting: false,
    sortedRoster: [],
    activeBots: {},
    all: {},
    blocked: {},
    friends: {},
    followers: {},
    newFollowers: {},
    followed: {},
    getProfile: jest.fn(),
    getBot: () => Bot.create({id: '1234'}),
    // createChat: () => ({
    //   load: () => ({
    //     then: jest.fn(),
    //   }),
    //   readAll: jest.fn(),
    //   setActive: jest.fn(),
    // }),
    // createChat: () =>
    //   Chat.create({
    //     id: '1234',

    //   }),
    loadChats: jest.fn(),
  } as any,
  analytics: {
    track: jest.fn(),
  },
  profileValidationStore: {
    setProfile: jest.fn(),
  },
  log: jest.fn(),
  warn: jest.fn(),
  firebaseStore: {
    phone: '1234567890',
    token: null,
    resource: null,
    inviteCode: null,
    buttonText: 'Verify',
    registered: false,
    errorMessage: '',
    setState: jest.fn(),
    reset: jest.fn(),
    setInviteCode: jest.fn(),
    afterAttach: jest.fn(),
    logout: jest.fn(),
    beforeDestroy: jest.fn(),
    verifyPhone: jest.fn(),
    confirmCode: jest.fn(),
    resendCode: jest.fn(),
    getFriendInviteLink: jest.fn(),
  } as IFirebaseStore,
  homeStore: {},
  navStore: {},
  locationStore: {
    distanceFromBot: jest.fn(),
  },
  iconStore: {
    setIcon: jest.fn(),
    iconList: [],
    setEmoji: jest.fn(),
  },
  notificationStore: {},
}
