/// <reference types="phoenix" />
/// <reference types="zen-observable" />
import { ApolloClient } from 'apollo-client';
import { IWockyTransport, IPagingList } from './IWockyTransport';
import { Socket as PhoenixSocket } from 'phoenix';
import { IProfilePartial } from '../model/Profile';
import { ILocationSnapshot } from '..';
export declare class GraphQLTransport implements IWockyTransport {
    resource: string;
    client: ApolloClient<any>;
    socket: PhoenixSocket;
    botGuestVisitorsSubscription?: ZenObservable.Subscription;
    connected: boolean;
    connecting: boolean;
    username: string;
    password: string;
    host: string;
    geoBot: any;
    message: any;
    notification: any;
    presence: any;
    rosterItem: any;
    botVisitor: any;
    constructor(resource: string);
    login(user?: string, password?: string, host?: string): Promise<boolean>;
    authenticate(user: string, token: string): Promise<boolean>;
    loadProfile(user: string): Promise<IProfilePartial>;
    requestRoster(): Promise<[any]>;
    generateId(): Promise<string>;
    loadBot(id: string, server: any): Promise<any>;
    _loadBots(relationship: string, userId: string, after?: string, max?: number): Promise<{
        list: any;
        cursor: any;
        count: any;
    }>;
    setLocation(params: ILocationSnapshot): Promise<void>;
    getLocationsVisited(limit?: number): Promise<object[]>;
    unsubscribeBotVisitors(): void;
    subscribeBotVisitors(): void;
    loadOwnBots(id: string, lastId?: string, max?: number): Promise<{
        list: any;
        cursor: any;
        count: any;
    }>;
    loadSubscribedBots(userId: string, lastId?: string, max?: number): Promise<IPagingList>;
    loadGeofenceBots(lastId?: string, max?: number): Promise<IPagingList>;
    private getBotProfiles(relationship, includeCurrentUser, id, lastId?, max?);
    loadBotSubscribers(id: string, lastId?: string, max?: number): Promise<IPagingList>;
    loadBotGuests(id: string, lastId?: string, max?: number): Promise<IPagingList>;
    loadBotVisitors(id: string, lastId?: string, max?: number): Promise<IPagingList>;
    loadBotPosts(id: string, before?: string): Promise<IPagingList>;
    shareBot(id: string, server: string, recepients: string[], message: string, action: string): void;
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
    loadChats(max?: number): Promise<Array<{
        id: string;
        message: any;
    }>>;
    removeBot(id: string): Promise<void>;
    removeBotPost(id: string, postId: string): Promise<void>;
    updateBot(bot: any): Promise<void>;
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
}
