import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare const Profile: IModelType<{
    id?: any;
} & {
    loaded?: any;
} & {
    id?: any;
    avatar?: any;
    handle?: any;
    firstName?: any;
    lastName?: any;
    isBlocked?: any;
    isFollowed?: any;
    isFollower?: any;
    followersSize?: any;
    followedSize?: any;
    botsSize?: any;
    roles?: any;
}, {
    id: string;
} & {
    readonly pageId: string;
    readonly _snapshot: any;
    readonly service: any;
} & {
    readonly snapshot: any;
} & {
    loaded: boolean;
} & {
    load: (data: any) => void;
} & {
    id: string;
    avatar: ({
        id: string;
    } & {
        readonly pageId: string;
        readonly _snapshot: any;
        readonly service: any;
    } & {
        readonly snapshot: any;
    } & {
        id: string;
        source: ({
            uri: string;
            contentType: string | null;
            width: number | null;
            height: number | null;
            cached: boolean;
        } & {
            readonly $treenode?: any;
        }) | null;
        thumbnail: ({
            uri: string;
            contentType: string | null;
            width: number | null;
            height: number | null;
            cached: boolean;
        } & {
            readonly $treenode?: any;
        }) | null;
    } & {
        loading: boolean;
        isNew: boolean;
        url: string;
        error: string;
    } & {
        readonly loaded: boolean;
        readonly snapshot: any;
    } & {
        setURL: (url: string) => void;
        setSource: (source: any) => void;
        downloadThumbnail: () => Promise<{}>;
        download: () => Promise<{}>;
    } & {
        afterAttach: () => Promise<{}>;
    } & {
        readonly $treenode?: any;
    }) | null;
    handle: string;
    firstName: string;
    lastName: string;
    isBlocked: boolean;
    isFollowed: boolean;
    isFollower: boolean;
    followersSize: number;
    followedSize: number;
    botsSize: number;
    roles: IObservableArray<string> & ISnapshottable<string[]>;
} & {
    isNew: boolean;
    status: string;
} & {
    afterAttach: () => void;
    follow: () => Promise<{}>;
    unfollow: () => Promise<{}>;
    block: () => Promise<{}>;
    unblock: () => Promise<{}>;
    setStatus: (status: string) => void;
} & {
    readonly isOwn: boolean;
    readonly isVerified: boolean;
    readonly isMutual: boolean;
    readonly followers: {
        result: IObservableArray<{}> & ISnapshottable<{}[]>;
        count: number | null;
    } & {
        loading: boolean;
        finished: boolean;
    } & {
        add: (item: any) => void;
        addToTop: (item: any) => void;
    } & {
        setRequest: (req: Function) => Function;
        exists: (id: string) => boolean;
        remove: (id: string) => void;
        loadPage: (a1: number) => Promise<any>;
        refresh: () => void;
        load: () => Promise<any[]>;
    } & {
        readonly length: number;
        readonly list: any[];
        readonly first: any;
        readonly last: any;
    } & {
        readonly $treenode?: any;
    };
    readonly followed: {
        result: IObservableArray<{}> & ISnapshottable<{}[]>;
        count: number | null;
    } & {
        loading: boolean;
        finished: boolean;
    } & {
        add: (item: any) => void;
        addToTop: (item: any) => void;
    } & {
        setRequest: (req: Function) => Function;
        exists: (id: string) => boolean;
        remove: (id: string) => void;
        loadPage: (a1: number) => Promise<any>;
        refresh: () => void;
        load: () => Promise<any[]>;
    } & {
        readonly length: number;
        readonly list: any[];
        readonly first: any;
        readonly last: any;
    } & {
        readonly $treenode?: any;
    };
    readonly ownBots: {
        result: IObservableArray<{}> & ISnapshottable<{}[]>;
        count: number | null;
    } & {
        loading: boolean;
        finished: boolean;
    } & {
        add: (item: any) => void;
        addToTop: (item: any) => void;
    } & {
        setRequest: (req: Function) => Function;
        exists: (id: string) => boolean;
        remove: (id: string) => void;
        loadPage: (a1: number) => Promise<any>;
        refresh: () => void;
        load: () => Promise<any[]>;
    } & {
        readonly length: number;
        readonly list: any[];
        readonly first: any;
        readonly last: any;
    } & {
        readonly $treenode?: any;
    };
    readonly subscribedBots: {
        result: IObservableArray<{}> & ISnapshottable<{}[]>;
        count: number | null;
    } & {
        loading: boolean;
        finished: boolean;
    } & {
        add: (item: any) => void;
        addToTop: (item: any) => void;
    } & {
        setRequest: (req: Function) => Function;
        exists: (id: string) => boolean;
        remove: (id: string) => void;
        loadPage: (a1: number) => Promise<any>;
        refresh: () => void;
        load: () => Promise<any[]>;
    } & {
        readonly length: number;
        readonly list: any[];
        readonly first: any;
        readonly last: any;
    } & {
        readonly $treenode?: any;
    };
    readonly displayName: string;
}>;
export declare const ProfilePaginableList: IModelType<{
    result?: any;
    count?: any;
}, {
    result: IObservableArray<{}> & ISnapshottable<{}[]>;
    count: number | null;
} & {
    loading: boolean;
    finished: boolean;
} & {
    add: (item: any) => void;
    addToTop: (item: any) => void;
} & {
    setRequest: (req: Function) => Function;
    exists: (id: string) => boolean;
    remove: (id: string) => void;
    loadPage: (a1: number) => Promise<any>;
    refresh: () => void;
    load: () => Promise<any[]>;
} & {
    readonly length: number;
    readonly list: any[];
    readonly first: any;
    readonly last: any;
}>;
export declare type IProfilePaginableList = typeof ProfilePaginableList.Type;
export declare type IProfile = typeof Profile.Type;
