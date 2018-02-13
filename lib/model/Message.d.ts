import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare const Message: IModelType<{
    id?: any;
} & {
    time?: any;
} & {} & {
    id?: any;
    archiveId?: any;
    from?: any;
    to?: any;
    media?: any;
    unread?: any;
    body?: any;
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
    uploading: boolean;
    uploaded: boolean;
    uploadError: string;
} & {
    upload: (a1: any) => Promise<any>;
} & {
    id: string;
    archiveId: string;
    from: ({
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
    } & {
        readonly $treenode?: any;
    }) | null;
    to: string;
    media: ({
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
    unread: boolean;
    body: string;
} & {
    readonly date: any;
} & {
    read: () => false;
    clear: () => void;
    setBody: (text: string) => void;
} & {
    send: () => void;
}>;
export declare type IMessage = typeof Message.Type;
