import { IExtendedObservableMap, IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray, IReactionDisposer } from 'mobx';
export declare function processMessage(stanza: any, ownUserId: string): {
    from: string;
    chatId: string;
    body: any;
    archiveId: any;
    isArchived: boolean;
    to: string;
    id: any;
    time: number;
    unread: any;
    media: any;
};
declare const _default: IModelType<{
    username?: any;
    password?: any;
    resource?: any;
    host?: any;
} & {
    iq?: any;
} & {} & {
    files?: any;
} & {
    profile?: any;
    profiles?: any;
} & {
    roster?: any;
} & {
    chats?: any;
    message?: any;
}, {
    username: string | null;
    password: string | null;
    resource: string;
    host: string;
} & {
    connected: boolean;
    connecting: boolean;
} & {
    onConnect: () => void;
    onDisconnect: () => void;
} & {
    afterCreate: () => void;
    login: () => Promise<{}>;
    sendStanza: any;
    disconnect: () => Promise<{}>;
} & {
    iq: any;
} & {
    onIQ: (iq: any) => void;
} & {
    afterCreate: () => void;
    sendIQ: (a1: any) => Promise<any>;
} & {
    register: (a1: any) => Promise<any>;
} & {
    testRegister: (a1: {
        phoneNumber: string;
    }) => Promise<any>;
} & {
    files: IExtendedObservableMap<{
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
    }> & ISnapshottable<{
        [key: string]: {
            id?: any;
        } & {
            id?: any;
            item?: any;
        };
    }>;
} & {
    _upload: (a1: any) => Promise<any>;
} & {
    downloadURL: (a1: string) => Promise<any>;
} & {
    downloadFile: (a1: string, a2: string, a3: string) => Promise<any>;
} & {
    createFile: (id: string, file?: {}) => {
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
    };
    downloadThumbnail: (a1: string, a2: string) => Promise<any>;
    downloadTROS: (a1: string) => Promise<any>;
    _requestUpload: (a1: any) => Promise<any>;
} & {
    profile: ({
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
    } & {
        readonly $treenode?: any;
    }) | null;
    profiles: IExtendedObservableMap<{
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
    }> & ISnapshottable<{
        [key: string]: {
            id?: any;
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
        };
    }>;
} & {
    registerProfile: (profile: {
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
    }) => {
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
} & {
    createProfile: (id: string, data?: any) => {
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
} & {
    unregisterProfile: (user: string) => boolean;
    _processMap: (data: {
        [key: string]: any;
    }) => any;
} & {
    loadProfile: (a1: string) => Promise<any>;
} & {
    getProfile: (a1: string) => Promise<any>;
} & {
    _requestProfiles: (a1: string[]) => Promise<any>;
    _updateProfile: (a1: Object) => Promise<any>;
    lookup: (a1: string) => Promise<any>;
    remove: () => Promise<{}>;
    _loadRelations: (a1: string) => Promise<any>;
} & {
    afterCreate: () => IReactionDisposer;
    beforeDestroy: () => void;
} & {
    roster: IObservableArray<{
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
    }> & ISnapshottable<(string | number)[]>;
} & {
    readonly sortedRoster: ({
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
    })[];
} & {
    readonly all: ({
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
    })[];
    readonly blocked: ({
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
    })[];
    readonly friends: ({
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
    })[];
    readonly followers: ({
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
    })[];
    readonly newFollowers: ({
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
    })[];
    readonly followed: ({
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
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
    })[];
} & {
    sendPresence: any;
    processItem: (item?: any) => void;
} & {
    addToRoster: (a1: string, a2: string) => Promise<any>;
    removeFromRoster: (a1: string) => Promise<any>;
} & {
    onPresence: (stanza: any) => void;
    _follow: (a1: string) => Promise<any>;
    _unfollow: (a1: string) => Promise<any>;
    _block: (a1: string) => Promise<any>;
    _unblock: (a1: string) => Promise<any>;
    requestRoster: () => Promise<{}>;
} & {
    followAll: (a1: [{
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
            remove: (id: string) => void;
            loadPage: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
            remove: (id: string) => void;
            loadPage: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
            remove: (id: string) => void;
            loadPage: any;
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
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            add: (item: any) => void;
            addToTop: (item: any) => void;
            remove: (id: string) => void;
            loadPage: any;
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
    }]) => Promise<any>;
    afterCreate: () => void;
    beforeDestroy: () => void;
} & {
    chats: {
        _list: IObservableArray<{
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            time: number;
            participants: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: any;
            readonly messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            })[];
        } & {
            readonly last: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }) => void;
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
            id?: any;
        } & {
            id?: any;
            active?: any;
            loaded?: any;
            requestedId?: any;
            isPrivate?: any;
            time?: any;
            participants?: any;
            _messages?: any;
        })[]>;
    } & {
        readonly _filteredList: ({
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            time: number;
            participants: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: any;
            readonly messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            })[];
        } & {
            readonly last: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }) => void;
        } & {
            readonly $treenode?: any;
        })[];
    } & {
        readonly list: ({
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            time: number;
            participants: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: any;
            readonly messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            })[];
        } & {
            readonly last: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }) => void;
        } & {
            readonly $treenode?: any;
        })[];
        readonly unread: number;
        get(id: string): {
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            time: number;
            participants: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: any;
            readonly messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            })[];
        } & {
            readonly last: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }) => void;
        } & {
            readonly $treenode?: any;
        };
    } & {
        clear: () => ({
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            time: number;
            participants: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: any;
            readonly messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            })[];
        } & {
            readonly last: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }) => void;
        } & {
            readonly $treenode?: any;
        })[];
        remove: (id: string) => ({
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            time: number;
            participants: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: any;
            readonly messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            })[];
        } & {
            readonly last: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }) => void;
        } & {
            readonly $treenode?: any;
        })[];
        add: (chat: {
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            time: number;
            participants: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: any;
            readonly messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            })[];
        } & {
            readonly last: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }) => void;
        } & {
            readonly $treenode?: any;
        }) => {
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            time: number;
            participants: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: any;
            readonly messages: IObservableArray<{
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
                id?: any;
            } & {
                time?: any;
            } & {
                id?: any;
            } & {} & {
                id?: any;
                archiveId?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                body?: any;
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            })[];
        } & {
            readonly last: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                from: any;
                to: string;
                media: any;
                unread: boolean;
                body: string;
            } & {
                readonly date: any;
            } & {
                read: () => false;
                send: () => any;
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
                id: string;
            } & {
                readonly pageId: string;
                readonly service: any;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
                    setRequest: (req: Function) => Function;
                    exists: (id: string) => boolean;
                    add: (item: any) => void;
                    addToTop: (item: any) => void;
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
            }) => void;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly $treenode?: any;
    };
    message: any;
} & {
    createChat: (id: string) => {
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
    } & {
        id: string;
        active: boolean;
        loaded: boolean;
        requestedId: string | null;
        isPrivate: boolean;
        time: number;
        participants: IObservableArray<{
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
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
                setRequest: (req: Function) => Function;
                exists: (id: string) => boolean;
                add: (item: any) => void;
                addToTop: (item: any) => void;
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
                setRequest: (req: Function) => Function;
                exists: (id: string) => boolean;
                add: (item: any) => void;
                addToTop: (item: any) => void;
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
                setRequest: (req: Function) => Function;
                exists: (id: string) => boolean;
                add: (item: any) => void;
                addToTop: (item: any) => void;
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
                setRequest: (req: Function) => Function;
                exists: (id: string) => boolean;
                add: (item: any) => void;
                addToTop: (item: any) => void;
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
        }> & ISnapshottable<(string | number)[]>;
        _messages: IObservableArray<{
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
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
            from: any;
            to: string;
            media: any;
            unread: boolean;
            body: string;
        } & {
            readonly date: any;
        } & {
            read: () => false;
            send: () => any;
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
            id?: any;
        } & {
            time?: any;
        } & {
            id?: any;
        } & {} & {
            id?: any;
            archiveId?: any;
            from?: any;
            to?: any;
            media?: any;
            unread?: any;
            body?: any;
        })[]>;
    } & {
        loading: boolean;
    } & {
        readonly date: any;
        readonly messages: IObservableArray<{
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
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
            from: any;
            to: string;
            media: any;
            unread: boolean;
            body: string;
        } & {
            readonly date: any;
        } & {
            read: () => false;
            send: () => any;
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
            id?: any;
        } & {
            time?: any;
        } & {
            id?: any;
        } & {} & {
            id?: any;
            archiveId?: any;
            from?: any;
            to?: any;
            media?: any;
            unread?: any;
            body?: any;
        })[]>;
        readonly unread: number;
        readonly followedParticipants: ({
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
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
                setRequest: (req: Function) => Function;
                exists: (id: string) => boolean;
                add: (item: any) => void;
                addToTop: (item: any) => void;
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
                setRequest: (req: Function) => Function;
                exists: (id: string) => boolean;
                add: (item: any) => void;
                addToTop: (item: any) => void;
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
                setRequest: (req: Function) => Function;
                exists: (id: string) => boolean;
                add: (item: any) => void;
                addToTop: (item: any) => void;
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
                setRequest: (req: Function) => Function;
                exists: (id: string) => boolean;
                add: (item: any) => void;
                addToTop: (item: any) => void;
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
        })[];
    } & {
        readonly last: ({
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
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
            from: any;
            to: string;
            media: any;
            unread: boolean;
            body: string;
        } & {
            readonly date: any;
        } & {
            read: () => false;
            send: () => any;
        } & {
            readonly $treenode?: any;
        }) | null;
        readonly first: ({
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
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
            from: any;
            to: string;
            media: any;
            unread: boolean;
            body: string;
        } & {
            readonly date: any;
        } & {
            read: () => false;
            send: () => any;
        } & {
            readonly $treenode?: any;
        }) | null;
    } & {
        setActive: (active: boolean) => boolean;
        readAll: () => void;
        load: () => Promise<{}>;
        addMessage: (msg: {
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
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
            from: any;
            to: string;
            media: any;
            unread: boolean;
            body: string;
        } & {
            readonly date: any;
        } & {
            read: () => false;
            send: () => any;
        } & {
            readonly $treenode?: any;
        }) => void;
        addParticipant: (profile: {
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
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
                setRequest: (req: Function) => Function;
                exists: (id: string) => boolean;
                add: (item: any) => void;
                addToTop: (item: any) => void;
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
                setRequest: (req: Function) => Function;
                exists: (id: string) => boolean;
                add: (item: any) => void;
                addToTop: (item: any) => void;
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
                setRequest: (req: Function) => Function;
                exists: (id: string) => boolean;
                add: (item: any) => void;
                addToTop: (item: any) => void;
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
                setRequest: (req: Function) => Function;
                exists: (id: string) => boolean;
                add: (item: any) => void;
                addToTop: (item: any) => void;
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
        }) => void;
    } & {
        readonly $treenode?: any;
    };
} & {
    _addMessage: (chatId: string, message: {
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
        from: any;
        to: string;
        media: any;
        unread: boolean;
        body: string;
    } & {
        readonly date: any;
    } & {
        read: () => false;
        send: () => any;
    } & {
        readonly $treenode?: any;
    }) => void;
} & {
    onMessage: (msg: any) => void;
} & {
    createMessage: (msg: any) => {
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
        from: any;
        to: string;
        media: any;
        unread: boolean;
        body: string;
    } & {
        readonly date: any;
    } & {
        read: () => false;
        send: () => any;
    } & {
        readonly $treenode?: any;
    } & ISnapshottable<{
        id?: any;
    } & {
        time?: any;
    } & {
        id?: any;
    } & {} & {
        id?: any;
        archiveId?: any;
        from?: any;
        to?: any;
        media?: any;
        unread?: any;
        body?: any;
    }>;
    _sendMessage: (msg: {
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
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
        from: any;
        to: string;
        media: any;
        unread: boolean;
        body: string;
    } & {
        readonly date: any;
    } & {
        read: () => false;
        send: () => any;
    } & {
        readonly $treenode?: any;
    }) => void;
    loadChat: (a1: string) => Promise<any>;
    loadChats: () => Promise<{}>;
} & {
    afterCreate: () => void;
    beforeDestroy: () => void;
}>;
export default _default;
