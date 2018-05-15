import { IFileService } from './FileService';
import './XmppStropheV2';
import { IWockyTransport, IPagingList } from './IWockyTransport';
import { IProfilePartial } from '../model/Profile';
export declare class XmppTransport implements IWockyTransport {
    provider: any;
    botVisitor: any;
    fileService: IFileService;
    resource: string;
    connected: boolean;
    connecting: boolean;
    iq: any;
    rosterItem: any;
    message: {
        id: string;
        message: any;
    };
    presence: {
        status: string;
        id: string;
    };
    username: string;
    password: string;
    host: string;
    geoBot: any;
    notification: any;
    isGeoSearching: boolean;
    constructor(provider: any, fileService: IFileService, resource: string);
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
    sendIQ(data: any, withoutTo?: boolean): Promise<any>;
    loadProfile(user: string): Promise<IProfilePartial | null>;
    requestProfiles(users: string[]): Promise<any>;
    updateProfile(d: any): Promise<void>;
    lookup(handle: string): Promise<{
        id: any;
    }>;
    remove(): Promise<void>;
    loadRelations(userId: string, relation?: string, lastId?: string, max?: number): Promise<{
        list: any;
        count: number;
    }>;
    downloadURL(tros: string): Promise<{
        url: any;
        headers: any;
    }>;
    downloadFile(tros: string, name: string, sourceUrl: string): Promise<any>;
    downloadThumbnail(url: string, tros: string): Promise<any>;
    downloadTROS(tros: string): Promise<any>;
    requestUpload({file, size, width, height, access}: any): Promise<any>;
    sendStanza(stanza: any): void;
    sendPresence(stanza: any): void;
    addToRoster(username: string, group: string): Promise<void>;
    removeFromRoster(username: string): Promise<void>;
    follow(username: string): Promise<void>;
    unfollow(username: string): Promise<void>;
    block(username: string): Promise<void>;
    unblock(username: string): Promise<void>;
    requestRoster(): Promise<any>;
    enablePush(token: string): Promise<void>;
    disablePush(): Promise<void>;
    sendMessage(msg: any): void;
    loadChat(userId: string, lastId?: string, max?: number): Promise<any>;
    loadChats(max?: number): Promise<Array<{
        id: string;
        message: any;
    }>>;
    generateId(): Promise<any>;
    removeBot(id: string): Promise<void>;
    loadGeofenceBots(): Promise<IPagingList>;
    loadOwnBots(userId: string, lastId?: string, max?: number): Promise<{
        list: any;
        count: number;
    }>;
    loadBotSubscribers(id: string, lastId?: string, max?: number): Promise<IPagingList>;
    loadBotGuests(id: string, lastId?: string, max?: number): Promise<{
        list: any;
        count: number;
    }>;
    loadBotVisitors(id: string, lastId?: string, max?: number): Promise<{
        list: any;
        count: number;
    }>;
    setLocation(): Promise<void>;
    getLocationsVisited(): Promise<object[]>;
    loadBotPosts(id: string, before?: string): Promise<{
        count: number;
        list: any;
    }>;
    loadSubscribedBots(userId: string, lastId?: string, max?: number): Promise<{
        list: any;
        count: number;
    }>;
    updateBot(bot: any): Promise<void>;
    loadBot(id: string, server: any): Promise<{
        id: any;
    }>;
    removeBotPost(id: string, postId: string): Promise<void>;
    shareBot(id: string, server: string, recepients: string[], message: string, shareAction: string): void;
    publishBotPost(botId: string, post: any): Promise<void>;
    subscribeBot(id: string, geofence?: boolean): Promise<number>;
    unsubscribeBot(id: string, geofence?: boolean): Promise<number>;
    loadUpdates(ver: string): Promise<{
        list: any;
        version: any;
        bots: any;
    }>;
    loadHomestream(lastId: any, max?: number): Promise<{
        list: any;
        count: number;
        version: any;
        bots: any;
    }>;
    subscribeToHomestream(version: string): void;
    geosearch({latitude, longitude, latitudeDelta, longitudeDelta}: any): Promise<void>;
}
export declare function processMessage(stanza: any, ownUserId: string): {
    from: string;
    chatId: string;
    body: any;
    archiveId: any;
    isArchived: boolean;
    to: string;
    id: any;
    time: any;
    unread: any;
    media: any;
};
export declare function processHomestreamResponse(data: any, username: string): {
    list: any;
    bots: any;
    version: any;
    count: number;
};
export declare function processItem(item: any, delay: any, username: string): any;
