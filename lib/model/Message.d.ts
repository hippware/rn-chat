import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare const Message: IModelType<{
    id?: any;
} & {
    id?: any;
} & {} & {
    id?: any;
    archiveId?: any;
    isArchived?: any;
    from?: any;
    to?: any;
    media?: any;
    unread?: any;
    time?: any;
    body?: any;
}, {
    id: string;
} & {
    readonly pageId: string;
    readonly service: any;
} & {
    uploading: boolean;
    uploaded: boolean;
    uploadError: string;
} & {
    upload: (a1: any) => Promise<any>;
} & {
    id: string;
    archiveId: string;
    isArchived: boolean;
    from: {
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
    } & {
        uploading: boolean;
        uploaded: boolean;
        uploadError: string;
    } & {
        upload: (a1: any) => Promise<any>;
    } & {
        id: string;
        avatar: ({
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            item: string | null;
        } & {
            _source: null;
            _thumbnail: null;
            loading: boolean;
            isNew: boolean;
            url: string;
            error: string;
        } & {
            readonly loaded: boolean;
            readonly thumbnail: ({
                uri: string;
                contentType: string | null;
                width: number | null;
                height: number | null;
                cached: boolean;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly source: ({
                uri: string;
                contentType: string | null;
                width: number | null;
                height: number | null;
                cached: boolean;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setURL: (url: string) => void;
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
        isNew: boolean;
        status: "available" | "unavailable";
        followersSize: number;
        followedSize: number;
        botsSize: number;
        roles: IObservableArray<string> & ISnapshottable<string[]>;
    } & {
        afterAttach: () => void;
    } & {
        readonly isOwn: boolean;
        readonly isVerified: boolean;
        readonly isMutual: boolean;
        readonly followers: {
            result: IObservableArray<{}> & ISnapshottable<{}[]>;
        } & {
            loading: boolean;
            finished: boolean;
        } & {
            setRequest: (req: Function) => Function;
            add: (item: any) => void;
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly followed: {
            result: IObservableArray<{}> & ISnapshottable<{}[]>;
        } & {
            loading: boolean;
            finished: boolean;
        } & {
            setRequest: (req: Function) => Function;
            add: (item: any) => void;
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
        readonly $treenode?: any;
    };
    to: string;
    media: ({
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
    } & {
        id: string;
        item: string | null;
    } & {
        _source: null;
        _thumbnail: null;
        loading: boolean;
        isNew: boolean;
        url: string;
        error: string;
    } & {
        readonly loaded: boolean;
        readonly thumbnail: ({
            uri: string;
            contentType: string | null;
            width: number | null;
            height: number | null;
            cached: boolean;
        } & {
            readonly $treenode?: any;
        }) | null;
        readonly source: ({
            uri: string;
            contentType: string | null;
            width: number | null;
            height: number | null;
            cached: boolean;
        } & {
            readonly $treenode?: any;
        }) | null;
    } & {
        setURL: (url: string) => void;
        downloadThumbnail: () => Promise<{}>;
        download: () => Promise<{}>;
    } & {
        afterAttach: () => Promise<{}>;
    } & {
        readonly $treenode?: any;
    }) | null;
    unread: boolean;
    time: number;
    body: string;
} & {
    readonly date: any;
} & {
    read: () => false;
    send: () => any;
}>;
export declare type IMessage = typeof Message.Type;
