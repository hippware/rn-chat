import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare const OwnProfile: IModelType<{
    id?: any;
} & {
    loaded?: any;
} & {
    id?: any;
    avatar?: any;
    handle?: any;
    status?: any;
    firstName?: any;
    lastName?: any;
    isBlocked?: any;
    isFollowed?: any;
    isFollower?: any;
    followersSize?: any;
    followedSize?: any;
    botsSize?: any;
    roles?: any;
} & {
    id?: any;
} & {} & {} & {
    email?: any;
    phoneNumber?: any;
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
    avatar: any;
    handle: string;
    status: string;
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
} & {
    afterAttach: () => void;
    follow: () => Promise<{}>;
    unfollow: () => Promise<{}>;
    block: () => Promise<{}>;
    unblock: () => Promise<{}>;
    setStatus: (status: string) => void;
} & {
    readonly snapshot: any;
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
} & {
    uploading: boolean;
    uploaded: boolean;
    uploadError: string;
} & {
    upload: (a1: any) => Promise<any>;
} & {
    updated: boolean;
    updating: boolean;
    updateError: string;
} & {
    update: (a1: any) => Promise<any>;
} & {
    save: () => Promise<{}>;
} & {
    email: string;
    phoneNumber: string;
}>;
