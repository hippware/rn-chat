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
    user?: any;
    avatar?: any;
    handle?: any;
    firstName?: any;
    lastName?: any;
    status?: any;
    followersSize?: any;
    botsSize?: any;
    roles?: any;
}, {
    user: string;
    avatar: ({
        tros: string;
        url: string;
        thumbnail: string;
    } & {
        setURL: (url: string) => string;
        setThumbnail: (thumbnail: string) => string;
    } & {
        readonly $treenode?: any;
    }) | null;
    handle: string;
    firstName: string;
    lastName: string;
    status: "available" | "unavailable";
    followersSize: number;
    botsSize: number;
    roles: IObservableArray<string> & ISnapshottable<string[]>;
} & {
    readonly followers: {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly loading: boolean;
        readonly finished: boolean;
        readonly length: number;
        readonly list: any[];
    } & {
        readonly $treenode?: any;
    };
    readonly following: {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly loading: boolean;
        readonly finished: boolean;
        readonly length: number;
        readonly list: any[];
    } & {
        readonly $treenode?: any;
    };
}>;
export declare const OwnProfile: IModelType<{
    user?: any;
    avatar?: any;
    handle?: any;
    firstName?: any;
    lastName?: any;
    status?: any;
    followersSize?: any;
    botsSize?: any;
    roles?: any;
} & {
    email?: any;
    phoneNumber?: any;
}, {
    user: string;
    avatar: ({
        tros: string;
        url: string;
        thumbnail: string;
    } & {
        setURL: (url: string) => string;
        setThumbnail: (thumbnail: string) => string;
    } & {
        readonly $treenode?: any;
    }) | null;
    handle: string;
    firstName: string;
    lastName: string;
    status: "available" | "unavailable";
    followersSize: number;
    botsSize: number;
    roles: IObservableArray<string> & ISnapshottable<string[]>;
} & {
    readonly followers: {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly loading: boolean;
        readonly finished: boolean;
        readonly length: number;
        readonly list: any[];
    } & {
        readonly $treenode?: any;
    };
    readonly following: {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly loading: boolean;
        readonly finished: boolean;
        readonly length: number;
        readonly list: any[];
    } & {
        readonly $treenode?: any;
    };
} & {
    email: string;
    phoneNumber: string;
}>;
export declare type IProfile = typeof Profile.Type;
