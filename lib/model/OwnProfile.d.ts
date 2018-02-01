import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare const OwnProfile: IModelType<{
    id?: any;
} & {
    id?: any;
} & {} & {
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
} & {} & {
    email?: any;
    phoneNumber?: any;
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
    followersSize: number;
    followedSize: number;
    botsSize: number;
    roles: IObservableArray<string> & ISnapshottable<string[]>;
} & {
    isNew: boolean;
    status: string;
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
        refresh: () => void;
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
        refresh: () => void;
        load: () => Promise<any[]>;
    } & {
        readonly length: number;
        readonly list: any[];
    } & {
        readonly $treenode?: any;
    };
    readonly ownBots: {
        result: IObservableArray<{}> & ISnapshottable<{}[]>;
    } & {
        loading: boolean;
        finished: boolean;
    } & {
        setRequest: (req: Function) => Function;
        add: (item: any) => void;
        loadPage: (a1: number) => Promise<any>;
        refresh: () => void;
        load: () => Promise<any[]>;
    } & {
        readonly length: number;
        readonly list: any[];
    } & {
        readonly $treenode?: any;
    };
    readonly subscribedBots: {
        result: IObservableArray<{}> & ISnapshottable<{}[]>;
    } & {
        loading: boolean;
        finished: boolean;
    } & {
        setRequest: (req: Function) => Function;
        add: (item: any) => void;
        loadPage: (a1: number) => Promise<any>;
        refresh: () => void;
        load: () => Promise<any[]>;
    } & {
        readonly length: number;
        readonly list: any[];
    } & {
        readonly $treenode?: any;
    };
    readonly displayName: string;
} & {
    updated: boolean;
    updating: boolean;
    updateError: string;
} & {
    update: (a1: any) => Promise<any>;
} & {
    email: string;
    phoneNumber: string;
} & {
    updated: boolean;
    updating: boolean;
    updateError: string;
} & {
    update: (data: any) => void;
    _onChanged: (a1: any) => Promise<any>;
    afterCreate: () => void;
}>;
