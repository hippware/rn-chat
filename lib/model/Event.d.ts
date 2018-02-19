import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare const Event: IModelType<{
    id?: any;
} & {
    time?: any;
}, {
    id: string;
} & {
    readonly pageId: string;
    readonly _snapshot: any;
    readonly service: any;
} & {
    readonly snapshot: any;
} & {
    time: number;
} & {
    readonly date: Date;
    readonly dateAsString: string;
    readonly relativeDateAsString: string;
} & {
    readonly target: {
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
        readonly $treenode?: any;
    };
}>;
