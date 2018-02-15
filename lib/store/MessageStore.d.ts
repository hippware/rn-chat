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
    time: any;
    unread: any;
    media: any;
};
declare const _default: IModelType<{
    id?: any;
} & {
    username?: any;
    password?: any;
    resource?: any;
    host?: any;
    sessionCount?: any;
} & {} & {
    files?: any;
    bots?: any;
    profiles?: any;
} & {
    profile?: any;
} & {
    roster?: any;
} & {
    chats?: any;
}, {
    id: string;
} & {
    readonly pageId: string;
    readonly _snapshot: any;
    readonly service: any;
} & {
    readonly snapshot: any;
} & {
    username: string | null;
    password: string | null;
    resource: string;
    host: string;
    sessionCount: number;
} & {
    connected: boolean;
    connecting: boolean;
} & {
    onConnect: () => void;
    onDisconnect: () => void;
} & {
    setSessionCount: (count: number) => void;
    afterCreate: () => void;
    beforeDestroy: () => void;
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
    files: {
        storage: IExtendedObservableMap<T & {
            readonly $treenode?: any;
        }> & ISnapshottable<{
            [key: string]: any;
        }>;
    } & {
        readonly snapshot: {
            storage: any;
        };
    } & {
        clear: () => void;
        delete: (id: string) => void;
        get: (id: string, data?: {
            [key: string]: any;
        } | undefined) => {
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
        };
    } & {
        readonly $treenode?: any;
    };
    bots: {
        storage: IExtendedObservableMap<T & {
            readonly $treenode?: any;
        }> & ISnapshottable<{
            [key: string]: any;
        }>;
    } & {
        readonly snapshot: {
            storage: any;
        };
    } & {
        clear: () => void;
        delete: (id: string) => void;
        get: (id: string, data?: {
            [key: string]: any;
        } | undefined) => {
            id: string;
        } & {
            readonly pageId: string;
            readonly _snapshot: any;
            readonly service: any;
        } & {
            readonly snapshot: any;
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
            id: string;
            isSubscribed: boolean;
            title: string | null;
            server: string | null;
            radius: number;
            owner: ({
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
            description: string | null;
            visibility: number;
            location: ({
                latitude: number;
                longitude: number;
                accuracy: number | null;
            } & {
                isCurrent: boolean;
            } & {
                load: (data: any) => void;
                addToIQ: (iq: any) => void;
            } & {
                readonly $treenode?: any;
            }) | null;
            address: string;
            followersSize: number;
            totalItems: number;
            addressData: {
                city: string;
                country: string;
                state: string;
                county: string;
            } & {
                readonly locationShort: string;
            } & {
                readonly $treenode?: any;
            };
            subscribers: {
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
            posts: {
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
        } & {
            isNew: boolean;
        } & {
            setPublic: (value: boolean) => void;
            afterAttach: () => void;
            createPost: (content?: string) => {
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
            } & {
                readonly $treenode?: any;
            } & ISnapshottable<{
                id?: any;
            } & {
                time?: any;
            } & {
                loaded?: any;
            } & {} & {
                id?: any;
                content?: any;
                title?: any;
                image?: any;
                profile?: any;
            }>;
            removePost: (a1: string) => Promise<any>;
            subscribe: () => Promise<{}>;
            unsubscribe: () => Promise<{}>;
            share: (userIDs: string[], message?: string, type?: string) => void;
            setNew: (value: boolean) => void;
            load: (d?: any) => void;
        } & {
            shareToFriends: (message?: string, type?: string) => void;
            shareToFollowers: (message?: string, type?: string) => void;
        } & {
            readonly isPublic: boolean;
            readonly coverColor: number;
            readonly snapshot: any;
        };
    } & {
        readonly $treenode?: any;
    };
    profiles: {
        storage: IExtendedObservableMap<T & {
            readonly $treenode?: any;
        }> & ISnapshottable<{
            [key: string]: any;
        }>;
    } & {
        readonly snapshot: {
            storage: any;
        };
    } & {
        clear: () => void;
        delete: (id: string) => void;
        get: (id: string, data?: {
            [key: string]: any;
        } | undefined) => {
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
        };
    } & {
        readonly $treenode?: any;
    };
} & {
    afterCreate: () => void;
    _registerReferences: (type: any, data: {
        [key: string]: any;
    }) => any;
} & {
    readonly map: any;
} & {
    create: <T>(type: IModelType<any, T>, data: {
        [key: string]: any;
    }) => T & {
        readonly $treenode?: any;
    } & ISnapshottable<any>;
} & {
    _upload: (a1: any) => Promise<any>;
} & {
    downloadURL: (a1: string) => Promise<any>;
} & {
    downloadFile: (a1: string, a2: string, a3: string) => Promise<any>;
} & {
    downloadThumbnail: (a1: string, a2: string) => Promise<any>;
    downloadTROS: (a1: string) => Promise<any>;
    _requestUpload: (a1: any) => Promise<any>;
} & {
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
    } & {
        readonly $treenode?: any;
    }) | null;
} & {
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
    }> & ISnapshottable<(string | number)[]>;
} & {
    readonly sortedRoster: ({
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
    })[];
} & {
    readonly all: ({
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
    })[];
    readonly blocked: ({
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
    })[];
    readonly friends: ({
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
    })[];
    readonly followers: ({
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
    })[];
    readonly newFollowers: ({
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
    })[];
    readonly followed: ({
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
            add: (item: any) => void;
            addToTop: (item: any) => void;
        } & {
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
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
            add: (item: any) => void;
            addToTop: (item: any) => void;
        } & {
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
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
            add: (item: any) => void;
            addToTop: (item: any) => void;
        } & {
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
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
            readonly _snapshot: any;
            readonly service: any;
        } & {
            readonly snapshot: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            participants: IObservableArray<{
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            message: {
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
            } & {
                readonly $treenode?: any;
            };
        } & {
            loading: boolean;
        } & {
            readonly messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
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
            })[];
        } & {
            readonly last: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            readonly time: number;
        } & {
            readonly date: any;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
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
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
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
            }) => void;
        } & {
            afterAttach: () => void;
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
            participants?: any;
            _messages?: any;
            message?: any;
        })[]>;
    } & {
        readonly _filteredList: ({
            id: string;
        } & {
            readonly pageId: string;
            readonly _snapshot: any;
            readonly service: any;
        } & {
            readonly snapshot: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            participants: IObservableArray<{
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            message: {
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
            } & {
                readonly $treenode?: any;
            };
        } & {
            loading: boolean;
        } & {
            readonly messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
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
            })[];
        } & {
            readonly last: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            readonly time: number;
        } & {
            readonly date: any;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
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
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
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
            }) => void;
        } & {
            afterAttach: () => void;
        } & {
            readonly $treenode?: any;
        })[];
    } & {
        readonly list: ({
            id: string;
        } & {
            readonly pageId: string;
            readonly _snapshot: any;
            readonly service: any;
        } & {
            readonly snapshot: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            participants: IObservableArray<{
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            message: {
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
            } & {
                readonly $treenode?: any;
            };
        } & {
            loading: boolean;
        } & {
            readonly messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
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
            })[];
        } & {
            readonly last: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            readonly time: number;
        } & {
            readonly date: any;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
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
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
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
            }) => void;
        } & {
            afterAttach: () => void;
        } & {
            readonly $treenode?: any;
        })[];
        readonly unread: number;
        get(id: string): {
            id: string;
        } & {
            readonly pageId: string;
            readonly _snapshot: any;
            readonly service: any;
        } & {
            readonly snapshot: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            participants: IObservableArray<{
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            message: {
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
            } & {
                readonly $treenode?: any;
            };
        } & {
            loading: boolean;
        } & {
            readonly messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
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
            })[];
        } & {
            readonly last: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            readonly time: number;
        } & {
            readonly date: any;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
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
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
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
            }) => void;
        } & {
            afterAttach: () => void;
        } & {
            readonly $treenode?: any;
        };
    } & {
        clear: () => ({
            id: string;
        } & {
            readonly pageId: string;
            readonly _snapshot: any;
            readonly service: any;
        } & {
            readonly snapshot: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            participants: IObservableArray<{
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            message: {
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
            } & {
                readonly $treenode?: any;
            };
        } & {
            loading: boolean;
        } & {
            readonly messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
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
            })[];
        } & {
            readonly last: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            readonly time: number;
        } & {
            readonly date: any;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
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
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
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
            }) => void;
        } & {
            afterAttach: () => void;
        } & {
            readonly $treenode?: any;
        })[];
        remove: (id: string) => ({
            id: string;
        } & {
            readonly pageId: string;
            readonly _snapshot: any;
            readonly service: any;
        } & {
            readonly snapshot: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            participants: IObservableArray<{
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            message: {
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
            } & {
                readonly $treenode?: any;
            };
        } & {
            loading: boolean;
        } & {
            readonly messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
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
            })[];
        } & {
            readonly last: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            readonly time: number;
        } & {
            readonly date: any;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
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
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
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
            }) => void;
        } & {
            afterAttach: () => void;
        } & {
            readonly $treenode?: any;
        })[];
        add: (chat: {
            id: string;
        } & {
            readonly pageId: string;
            readonly _snapshot: any;
            readonly service: any;
        } & {
            readonly snapshot: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            participants: IObservableArray<{
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            message: {
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
            } & {
                readonly $treenode?: any;
            };
        } & {
            loading: boolean;
        } & {
            readonly messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
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
            })[];
        } & {
            readonly last: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            readonly time: number;
        } & {
            readonly date: any;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
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
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
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
            }) => void;
        } & {
            afterAttach: () => void;
        } & {
            readonly $treenode?: any;
        }) => {
            id: string;
        } & {
            readonly pageId: string;
            readonly _snapshot: any;
            readonly service: any;
        } & {
            readonly snapshot: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            participants: IObservableArray<{
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
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            message: {
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
            } & {
                readonly $treenode?: any;
            };
        } & {
            loading: boolean;
        } & {
            readonly messages: IObservableArray<{
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
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<({
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
            })[]>;
            readonly unread: number;
            readonly followedParticipants: ({
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
            })[];
        } & {
            readonly last: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
            readonly first: ({
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
            } & {
                readonly $treenode?: any;
            }) | null;
        } & {
            readonly time: number;
        } & {
            readonly date: any;
        } & {
            setActive: (active: boolean) => boolean;
            readAll: () => void;
            load: () => Promise<{}>;
            addMessage: (msg: {
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
            } & {
                readonly $treenode?: any;
            }) => void;
            addParticipant: (profile: {
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
            }) => void;
        } & {
            afterAttach: () => void;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly $treenode?: any;
    };
} & {
    message: any;
} & {
    createChat: (id: string) => {
        id: string;
    } & {
        readonly pageId: string;
        readonly _snapshot: any;
        readonly service: any;
    } & {
        readonly snapshot: any;
    } & {
        id: string;
        active: boolean;
        loaded: boolean;
        requestedId: string | null;
        isPrivate: boolean;
        participants: IObservableArray<{
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
        }> & ISnapshottable<(string | number)[]>;
        _messages: IObservableArray<{
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
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
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
        })[]>;
        message: {
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
        } & {
            readonly $treenode?: any;
        };
    } & {
        loading: boolean;
    } & {
        readonly messages: IObservableArray<{
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
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
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
        })[]>;
        readonly unread: number;
        readonly followedParticipants: ({
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
        })[];
    } & {
        readonly last: ({
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
        } & {
            readonly $treenode?: any;
        }) | null;
        readonly first: ({
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
        } & {
            readonly $treenode?: any;
        }) | null;
    } & {
        readonly time: number;
    } & {
        readonly date: any;
    } & {
        setActive: (active: boolean) => boolean;
        readAll: () => void;
        load: () => Promise<{}>;
        addMessage: (msg: {
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
        } & {
            readonly $treenode?: any;
        }) => void;
        addParticipant: (profile: {
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
        }) => void;
    } & {
        afterAttach: () => void;
    } & {
        readonly $treenode?: any;
    };
} & {
    _addMessage: (chatId: string, message: {
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
    } & {
        readonly $treenode?: any;
    }) => void;
} & {
    onMessage: (msg: any) => void;
} & {
    _sendMessage: (msg: {
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
