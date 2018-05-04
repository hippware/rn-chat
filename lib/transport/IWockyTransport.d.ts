import { ILocationSnapshot } from '../model/Location';
export interface IPagingList {
    list: any[];
    cursor?: string;
    count: number;
}
export interface IWockyTransport {
    connected: boolean;
    connecting: boolean;
    username: string;
    password: string;
    host: string;
    resource: string;
    geoBot: any;
    message: any;
    presence: any;
    rosterItem: any;
    notification: any;
    botVisitor: any;
    login(user?: string, password?: string, host?: string): Promise<boolean>;
    register(data: any, host?: string, providerName?: string): Promise<{
        username: string;
        password: string;
        host: string;
    }>;
    testRegister({phoneNumber}: {
        phoneNumber: string;
    }, host: string): Promise<{
        username: string;
        password: string;
        host: string;
    }>;
    disconnect(): Promise<void>;
    setLocation(params: ILocationSnapshot): Promise<void>;
    getLocationsVisited(limit?: number): Promise<object[]>;
    loadProfile(user: string): Promise<any>;
    requestProfiles(users: string[]): Promise<any>;
    updateProfile(d: any): Promise<void>;
    lookup(handle: string): Promise<any>;
    remove(): Promise<void>;
    downloadURL(tros: string): Promise<any>;
    downloadFile(tros: string, name: string, sourceUrl: string): Promise<any>;
    downloadThumbnail(url: string, tros: string): Promise<any>;
    downloadTROS(tros: string): Promise<any>;
    requestUpload(params: {
        file: any;
        size: number;
        width: number;
        height: number;
        access: string;
    }): Promise<string>;
    follow(username: string): Promise<void>;
    unfollow(username: string): Promise<void>;
    block(username: string): Promise<void>;
    unblock(username: string): Promise<void>;
    subscribeBot(id: string, geofence?: boolean): Promise<number>;
    unsubscribeBot(id: string, geofence?: boolean): Promise<number>;
    requestRoster(): Promise<[any]>;
    loadChats(max?: number): Promise<Array<{
        id: string;
        message: any;
    }>>;
    loadBot(id: string, server: any): Promise<any>;
    removeBot(id: string): Promise<void>;
    removeBotPost(id: string, postId: string): Promise<void>;
    generateId(): Promise<string>;
    updateBot(bot: any): Promise<void>;
    shareBot(id: string, server: string, recepients: string[], message: string, action: string): void;
    loadRelations(userId: string, relation: string, lastId?: string, max?: number): Promise<IPagingList>;
    publishBotPost(botId: string, post: any): Promise<void>;
    geosearch(props: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    }): Promise<void>;
    sendMessage(msg: any): void;
    loadChat(userId: string, lastId?: string, max?: number): Promise<void>;
    subscribeToHomestream(version: string): void;
    enablePush(token: string): Promise<void>;
    disablePush(): Promise<void>;
    loadUpdates(ver: string): Promise<{
        list: [any];
        version: string;
        bots: [any];
    }>;
    loadHomestream(lastId: any, max?: number): Promise<IPagingList>;
    loadOwnBots(userId: string, lastId?: string, max?: number): Promise<IPagingList>;
    loadGeofenceBots(lastId?: string, max?: number): Promise<IPagingList>;
    loadBotSubscribers(id: string, lastId?: string, max?: number): Promise<IPagingList>;
    loadBotGuests(id: string, lastId?: string, max?: number): Promise<IPagingList>;
    loadBotVisitors(id: string, lastId?: string, max?: number): Promise<IPagingList>;
    loadBotPosts(id: string, lastId?: string): Promise<IPagingList>;
    loadSubscribedBots(userId: string, lastId?: string, max?: number): Promise<IPagingList>;
}
