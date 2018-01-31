import { IModelType, ISnapshottable, IExtendedObservableMap } from 'mobx-state-tree';
import { IReactionDisposer, IObservableArray } from 'mobx';
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
    onIQ: (iq: any) => any;
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
    } & {
        readonly $treenode?: any;
    }) | null;
    profiles: IExtendedObservableMap<{
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
    }> & ISnapshottable<{
        [key: string]: {
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
        };
    }>;
} & {
    registerProfile: (profile: {
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
    }) => {
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
    unregisterProfile: (user: string) => boolean;
    processMap: (data: {
        [key: string]: any;
    }) => any;
} & {
    createProfile: (id: string, data?: any) => {
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
} & {
    loadProfile: (a1: string) => Promise<any>;
} & {
    getProfile: (a1: string) => Promise<any>;
} & {
    _updateProfile: (a1: Object) => Promise<any>;
    lookup: (a1: string) => Promise<any>;
    remove: () => Promise<{}>;
    loadRelations: (a1: string) => Promise<any>;
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
    }> & ISnapshottable<(string | number)[]>;
} & {
    readonly sortedRoster: ({
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
    })[];
} & {
    readonly all: ({
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
    })[];
    readonly blocked: ({
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
    })[];
    readonly friends: ({
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
    })[];
    readonly followers: ({
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
    })[];
    readonly newFollowers: ({
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
    })[];
    readonly followed: ({
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
    })[];
} & {
    sendPresence: any;
    processItem: (item?: any) => void;
} & {
    addToRoster: (a1: string, a2: string) => Promise<any>;
    removeFromRoster: (a1: string) => Promise<any>;
} & {
    onPresence: (stanza: any) => void;
    follow: (a1: {
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
    } & {
        uploading: boolean;
        uploaded: boolean;
        uploadError: string;
    } & {
        upload: any;
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
            loadPage: any;
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
            loadPage: any;
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
    }) => Promise<any>;
    unfollow: (a1: {
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
    } & {
        uploading: boolean;
        uploaded: boolean;
        uploadError: string;
    } & {
        upload: any;
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
            loadPage: any;
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
            loadPage: any;
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
    }) => Promise<any>;
    block: (a1: {
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
    } & {
        uploading: boolean;
        uploaded: boolean;
        uploadError: string;
    } & {
        upload: any;
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
            loadPage: any;
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
            loadPage: any;
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
    }) => Promise<any>;
    unblock: (a1: {
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
    } & {
        uploading: boolean;
        uploaded: boolean;
        uploadError: string;
    } & {
        upload: any;
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
            loadPage: any;
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
            loadPage: any;
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
    }) => Promise<any>;
    requestRoster: () => Promise<{}>;
} & {
    followAll: (a1: [{
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
    } & {
        uploading: boolean;
        uploaded: boolean;
        uploadError: string;
    } & {
        upload: any;
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
            loadPage: any;
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
            loadPage: any;
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
    }]) => Promise<any>;
    afterCreate: () => void;
    beforeDestroy: () => void;
}>;
export default _default;
