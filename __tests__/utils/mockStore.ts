import {IFirebaseStore} from 'src/store/FirebaseStore'

export default {
  wocky: {
    id: 'wocky',
    username: 'username',
    password: 'password',
    host: 'host',
    sessionCount: 0,
    roster: {} as any,
    notifications: {},
    hasUnreadNotifications: false,
    geofenceBots: {},
    chats: {},
    files: {} as any,
    profiles: {} as any,
    bots: {} as any,
    createChat: jest.fn(),
    profile: {
      handle: 'jerkham',
      firstName: 'eric',
      lastName: 'kirkham',
      email: 'eric.kirkham@gmail.com',
      loaded: true,
      updateError: '',
    } as any,
    service: jest.fn(),
    afterCreate: jest.fn(),
    _registerReferences: jest.fn(),
    map: jest.fn(),
    create: jest.fn(),
    load: jest.fn(),
    transport: {},
    connected: true,
    loadProfile: jest.fn(),
    login: jest.fn(),
    disconnect: jest.fn(),
    remove: jest.fn(),
    register: jest.fn(),
    testRegister: jest.fn(),
    _requestProfiles: jest.fn(),
    _updateProfile: jest.fn(),
    lookup: jest.fn(),
    connecting: false,
    sortedRoster: [],
    activeBots: {},
    all: {},
    blocked: {},
    friends: {},
    followers: {},
    newFollowers: {},
    followed: {},
    addRosterItem: jest.fn(),
    getProfile: jest.fn(),
    createProfile: jest.fn(),
    getBot: () => ({
      id: '1234',
      description: 'description',
    }),
    _addMessage: jest.fn(),
    deleteBot: jest.fn(),
    _follow: jest.fn(),
    _unfollow: jest.fn(),
    _block: jest.fn(),
    _unblock: jest.fn(),
    _hideUser: jest.fn(),
    requestRoster: jest.fn(),
    loadChats: jest.fn(),
    loadBot: jest.fn(),
    removeBot: jest.fn(),
    createBot: jest.fn(),
    _loadOwnBots: jest.fn(),
    _loadGeofenceBots: jest.fn(),
    _loadBotSubscribers: jest.fn(),
    _loadBotGuests: jest.fn(),
    _loadBotVisitors: jest.fn(),
    _loadBotPosts: jest.fn(),
    _loadSubscribedBots: jest.fn(),
    _updateBot: jest.fn(),
    _removeBotPost: jest.fn(),
    _shareBot: jest.fn(),
    _inviteBot: jest.fn(),
    _publishBotPost: jest.fn(),
    _subscribeBot: jest.fn(),
    _unsubscribeBot: jest.fn(),
    _acceptBotInvitation: jest.fn(),
    loadLocalBots: jest.fn(),
    _loadRelations: jest.fn(),
    _sendMessage: jest.fn(),
    loadChat: jest.fn(),
    downloadURL: jest.fn(),
    setLocation: jest.fn(),
    getLocationsVisited: jest.fn(),
    _requestUpload: jest.fn(),
    _removeUpload: jest.fn(),
    _loadNotifications: jest.fn(),
    _loadNewNotifications: jest.fn(),
    _onBotVisitor: jest.fn(),
    _onNotification: jest.fn(),
    viewNotifications: jest.fn(),
    enablePush: jest.fn(),
    disablePush: jest.fn(),
    setSessionCount: jest.fn(),
    searchUsers: jest.fn(),
    downloadFile: jest.fn(),
    downloadThumbnail: jest.fn(),
    downloadTROS: jest.fn(),
    userInviteMakeCode: jest.fn(),
    userInviteRedeemCode: jest.fn(),
    clearCache: jest.fn(),
    logout: jest.fn(),
    startReactions: jest.fn(),
    disposeReactions: jest.fn(),
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
  locationStore: {},
  iconStore: {
    setIcon: jest.fn(),
    iconList: [],
  },
  notificationStore: {},
}
