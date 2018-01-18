import { IModelType, ISimpleType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare const Status: ISimpleType<"available" | "unavailable">;
export declare const Image: IModelType<{
    tros?: any;
    url?: any;
    thumbnail?: any;
}, {
    tros: string;
    url: string;
    thumbnail: string;
} & {
    setURL: (url: string) => string;
    setThumbnail: (thumbnail: string) => string;
}>;
export declare const Profile: IModelType<{
    id?: any;
    avatar?: any;
    handle?: any;
    firstName?: any;
    lastName?: any;
    isBlocked?: any;
    isFollowed?: any;
    isFollower?: any;
    isNew?: any;
    status?: any;
    followersSize?: any;
    followedSize?: any;
    botsSize?: any;
    roles?: any;
}, {
    id: string;
    avatar: string;
    handle: string;
    firstName: string;
    lastName: string;
    isBlocked: boolean;
    isFollowed: boolean;
    isFollower: boolean;
    isNew: boolean;
    status: "available" | "unavailable";
    followersSize: number;
    followedSize: number;
    botsSize: number;
    roles: IObservableArray<string> & ISnapshottable<string[]>;
} & {
    readonly followers: {
        result: never[];
        loading: boolean;
        finished: boolean;
    } & {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly length: number;
        readonly list: any[];
    } & {
        readonly $treenode?: any;
    };
    readonly followed: {
        result: never[];
        loading: boolean;
        finished: boolean;
    } & {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly length: number;
        readonly list: any[];
    } & {
        readonly $treenode?: any;
    };
    readonly displayName: string;
}>;
export declare const OwnProfile: IModelType<{
    id?: any;
    avatar?: any;
    handle?: any;
    firstName?: any;
    lastName?: any;
    isBlocked?: any;
    isFollowed?: any;
    isFollower?: any;
    isNew?: any;
    status?: any;
    followersSize?: any;
    followedSize?: any;
    botsSize?: any;
    roles?: any;
} & {
    email?: any;
    phoneNumber?: any;
}, {
    id: string;
    avatar: string;
    handle: string;
    firstName: string;
    lastName: string;
    isBlocked: boolean;
    isFollowed: boolean;
    isFollower: boolean;
    isNew: boolean;
    status: "available" | "unavailable";
    followersSize: number;
    followedSize: number;
    botsSize: number;
    roles: IObservableArray<string> & ISnapshottable<string[]>;
} & {
    readonly followers: {
        result: never[];
        loading: boolean;
        finished: boolean;
    } & {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly length: number;
        readonly list: any[];
    } & {
        readonly $treenode?: any;
    };
    readonly followed: {
        result: never[];
        loading: boolean;
        finished: boolean;
    } & {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly length: number;
        readonly list: any[];
    } & {
        readonly $treenode?: any;
    };
    readonly displayName: string;
} & {
    email: string;
    phoneNumber: string;
}>;
export declare type IProfile = typeof Profile.Type;
