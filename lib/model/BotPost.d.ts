import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare const BotPost: IModelType<{
    id?: any;
} & {
    time?: any;
} & {
    loaded?: any;
} & {
    id?: any;
} & {} & {
    id?: any;
    content?: any;
    title?: any;
    image?: any;
    profile?: any;
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
    loaded: boolean;
} & {
    load: (data: any) => void;
} & {
    uploading: boolean;
    uploaded: boolean;
    uploadError: string;
} & {
    upload: (a1: any) => Promise<any>;
} & {
    id: string;
    content: string;
    title: string;
    image: ({
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
        url: string;
    } & {
        loading: boolean;
        isNew: boolean;
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
    profile: ({
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
            url: string;
        } & {
            loading: boolean;
            isNew: boolean;
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
    }) | null;
} & {
    setContent: (content: string) => string;
    setTitle: (title: string) => string;
    publish: () => Promise<{}>;
}>;
export declare type IBotPost = typeof BotPost.Type;
export declare const BotPostPaginableList: IModelType<{
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
export declare type IBotPostPaginableList = typeof BotPostPaginableList.Type;
