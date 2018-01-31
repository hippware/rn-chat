import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare const VISIBILITY_OWNER = 0;
export declare const VISIBILITY_PUBLIC = 100;
export declare const Bot: IModelType<{
    id?: any;
} & {
    id?: any;
    isSubscribed?: any;
    title?: any;
    server?: any;
    owner?: any;
    image?: any;
    description?: any;
    visibility?: any;
    location?: any;
    address?: any;
    followersSize?: any;
    totalItems?: any;
    time?: any;
    addressData?: any;
}, {
    id: string;
} & {
    readonly pageId: string;
    readonly service: any;
} & {
    id: string;
    isSubscribed: boolean;
    title: string | null;
    server: string | null;
    owner: {
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
    } & {
        uploaded: boolean;
    } & {
        uploading: boolean;
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
    image: ({
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
    description: string | null;
    visibility: number;
    location: {
        latitude: number;
        longitude: number;
    } & {
        readonly $treenode?: any;
    };
    address: string;
    followersSize: number;
    totalItems: number;
    time: number;
    addressData: ({
        city: string;
        country: string;
        county: string;
        address: string;
    } & {
        readonly $treenode?: any;
    }) | null;
} & {
    isNew: boolean;
} & {
    afterAttach: () => void;
} & {
    readonly subscribers: {
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
    readonly posts: {
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
} & {
    readonly updated: Date;
    readonly date: string;
    readonly isPublic: boolean;
    readonly coverColor: number;
}>;
export declare type IBot = typeof Bot.Type;
