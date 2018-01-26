import { IExtendedObservableMap, IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray, IReactionDisposer } from 'mobx';
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
        isNew: boolean;
    } & {
        loading: boolean;
        error: string;
    } & {
        readonly loaded: boolean;
    } & {
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
            source?: any;
            thumbnail?: any;
            url?: any;
            isNew?: any;
        };
    }>;
} & {
    upload: (a1: any) => Promise<any>;
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
        isNew: boolean;
    } & {
        loading: boolean;
        error: string;
    } & {
        readonly loaded: boolean;
    } & {
        downloadThumbnail: () => Promise<{}>;
        download: () => Promise<{}>;
    } & {
        afterAttach: () => Promise<{}>;
    } & {
        readonly $treenode?: any;
    };
    downloadThumbnail: (a1: string, a2: string) => Promise<any>;
    downloadTROS: (a1: string) => Promise<any>;
    requestUpload: (a1: any) => Promise<any>;
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
            isNew?: any;
            status?: any;
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
    unregisterProfile: (user: string) => boolean;
    processMap: (data: {
        [key: string]: any;
    }) => any;
} & {
    createProfile: (id: string, data: any) => {
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
} & {
    loadProfile: (a1: string) => Promise<any>;
} & {
    getProfile: (a1: string) => Promise<any>;
} & {
    updateProfile: (a1: Object) => Promise<any>;
    lookup: (a1: string) => Promise<any>;
    remove: () => Promise<{}>;
    loadRelations: (a1: string) => Promise<any>;
} & {
    uploadAvatar: (a1: any) => Promise<any>;
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
    })[];
    readonly following: ({
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
        id: string;
        avatar: ({
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            item: string | null;
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
        id: string;
        avatar: ({
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            item: string | null;
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
        id: string;
        avatar: ({
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            item: string | null;
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
        id: string;
        avatar: ({
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            item: string | null;
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
        id: string;
        avatar: ({
            id: string;
        } & {
            readonly pageId: string;
            readonly service: any;
        } & {
            id: string;
            item: string | null;
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: string;
            readonly messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            })[];
        } & {
            readonly last: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: string;
            readonly messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            })[];
        } & {
            readonly last: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: string;
            readonly messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            })[];
        } & {
            readonly last: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: string;
            readonly messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            })[];
        } & {
            readonly last: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: string;
            readonly messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            })[];
        } & {
            readonly last: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: string;
            readonly messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            })[];
        } & {
            readonly last: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: string;
            readonly messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            })[];
        } & {
            readonly last: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
        } & {
            loading: boolean;
        } & {
            readonly date: string;
            readonly messages: IObservableArray<{
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<{
                id?: any;
                archiveId?: any;
                isArchived?: any;
                from?: any;
                to?: any;
                media?: any;
                unread?: any;
                time?: any;
                body?: any;
            }[]>;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
            })[];
        } & {
            readonly last: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
                id: string;
                archiveId: string;
                isArchived: boolean;
                from: {
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
                        isNew: boolean;
                    } & {
                        loading: boolean;
                        error: string;
                    } & {
                        readonly loaded: boolean;
                    } & {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                readonly date: string;
            } & {
                read: () => false;
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                isNew: boolean;
            } & {
                loading: boolean;
                error: string;
            } & {
                readonly loaded: boolean;
            } & {
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
        }> & ISnapshottable<(string | number)[]>;
        _messages: IObservableArray<{
            id: string;
            archiveId: string;
            isArchived: boolean;
            from: {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                isNew: boolean;
            } & {
                loading: boolean;
                error: string;
            } & {
                readonly loaded: boolean;
            } & {
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
            readonly date: string;
        } & {
            read: () => false;
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<{
            id?: any;
            archiveId?: any;
            isArchived?: any;
            from?: any;
            to?: any;
            media?: any;
            unread?: any;
            time?: any;
            body?: any;
        }[]>;
    } & {
        loading: boolean;
    } & {
        readonly date: string;
        readonly messages: IObservableArray<{
            id: string;
            archiveId: string;
            isArchived: boolean;
            from: {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                isNew: boolean;
            } & {
                loading: boolean;
                error: string;
            } & {
                readonly loaded: boolean;
            } & {
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
            readonly date: string;
        } & {
            read: () => false;
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<{
            id?: any;
            archiveId?: any;
            isArchived?: any;
            from?: any;
            to?: any;
            media?: any;
            unread?: any;
            time?: any;
            body?: any;
        }[]>;
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
                isNew: boolean;
            } & {
                loading: boolean;
                error: string;
            } & {
                readonly loaded: boolean;
            } & {
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
        })[];
    } & {
        readonly last: ({
            id: string;
            archiveId: string;
            isArchived: boolean;
            from: {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                isNew: boolean;
            } & {
                loading: boolean;
                error: string;
            } & {
                readonly loaded: boolean;
            } & {
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
            readonly date: string;
        } & {
            read: () => false;
        } & {
            readonly $treenode?: any;
        }) | null;
        readonly first: ({
            id: string;
            archiveId: string;
            isArchived: boolean;
            from: {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                isNew: boolean;
            } & {
                loading: boolean;
                error: string;
            } & {
                readonly loaded: boolean;
            } & {
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
            readonly date: string;
        } & {
            read: () => false;
        } & {
            readonly $treenode?: any;
        }) | null;
    } & {
        setActive: (active: boolean) => boolean;
        readAll: () => void;
        load: () => Promise<{}>;
        addMessage: (msg: {
            id: string;
            archiveId: string;
            isArchived: boolean;
            from: {
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
                    isNew: boolean;
                } & {
                    loading: boolean;
                    error: string;
                } & {
                    readonly loaded: boolean;
                } & {
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
                isNew: boolean;
            } & {
                loading: boolean;
                error: string;
            } & {
                readonly loaded: boolean;
            } & {
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
            readonly date: string;
        } & {
            read: () => false;
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
                isNew: boolean;
            } & {
                loading: boolean;
                error: string;
            } & {
                readonly loaded: boolean;
            } & {
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
        }) => void;
    } & {
        readonly $treenode?: any;
    };
} & {
    processMessage: (stanza: any) => {
        id: string;
        archiveId: string;
        isArchived: boolean;
        from: {
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
                isNew: boolean;
            } & {
                loading: boolean;
                error: string;
            } & {
                readonly loaded: boolean;
            } & {
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
        readonly date: string;
    } & {
        read: () => false;
    } & {
        readonly $treenode?: any;
    };
    addMessage: (message: {
        id: string;
        archiveId: string;
        isArchived: boolean;
        from: {
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
                isNew: boolean;
            } & {
                loading: boolean;
                error: string;
            } & {
                readonly loaded: boolean;
            } & {
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
            isNew: boolean;
        } & {
            loading: boolean;
            error: string;
        } & {
            readonly loaded: boolean;
        } & {
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
        readonly date: string;
    } & {
        read: () => false;
    } & {
        readonly $treenode?: any;
    }) => void;
} & {
    onMessage: (msg: any) => void;
} & {
    sendMessage: (msg: any) => void;
    loadChat: (a1: string) => Promise<any>;
    loadChats: () => Promise<{}>;
} & {
    sendMedia: (a1: any) => Promise<any>;
    afterCreate: () => void;
    beforeDestroy: () => void;
}>;
export default _default;
