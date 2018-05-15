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
    loadProfile(user: string): Promise<IProfilePartial | null>;
    requestRoster(): Promise<[any]>;
    generateId(): Promise<string>;
    loadBot(id: string): Promise<any>;
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
    loadGeofenceBots(): Promise<IPagingList>;
    loadBotSubscribers(id: string, lastId?: string, max?: number): Promise<IPagingList>;
    loadBotGuests(id: string, lastId?: string, max?: number): Promise<IPagingList>;
    loadBotVisitors(id: string, lastId?: string, max?: number): Promise<IPagingList>;
    loadBotPosts(): Promise<IPagingList>;
    shareBot(): void;
    register(): Promise<{
        username: string;
        password: string;
        host: string;
    }>;
    testRegister(): Promise<{
        username: string;
        password: string;
        host: string;
    }>;
    disconnect(): Promise<void>;
    requestProfiles(): Promise<any>;
    updateProfile(d: any): Promise<void>;
    lookup(): Promise<any>;
    remove(): Promise<void>;
    downloadURL(): Promise<any>;
    downloadFile(): Promise<any>;
    downloadThumbnail(): Promise<any>;
    downloadTROS(): Promise<any>;
    requestUpload(): Promise<string>;
    follow(): Promise<void>;
    unfollow(): Promise<void>;
    block(): Promise<void>;
    unblock(): Promise<void>;
    subscribeBot(): Promise<number>;
    unsubscribeBot(): Promise<number>;
    loadChats(): Promise<Array<{
        id: string;
        message: any;
    }>>;
    removeBot(): Promise<void>;
    removeBotPost(): Promise<void>;
    updateBot(): Promise<void>;
    loadRelations(): Promise<IPagingList>;
    publishBotPost(): Promise<void>;
    geosearch(): Promise<void>;
    sendMessage(): void;
    loadChat(): Promise<void>;
    subscribeToHomestream(): void;
    enablePush(): Promise<void>;
    disablePush(): Promise<void>;
    loadUpdates(): Promise<{
        list: [any];
        version: string;
        bots: [any];
    }>;
    loadHomestream(): Promise<IPagingList>;
    private getBotProfiles(relationship, includeCurrentUser, id, lastId?, max?);
}
