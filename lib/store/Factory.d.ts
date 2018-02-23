import { ISnapshottable, IModelType, IExtendedObservableMap, IType } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
import { IBase } from '../model/Base';
export declare function createFactory<T extends IBase>(type: IType<any, T>): IModelType<{
    storage?: any;
}, {
    storage: IExtendedObservableMap<T> & ISnapshottable<{
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
    } | undefined) => T;
}>;
export declare const Storages: IModelType<{
    files?: any;
    bots?: any;
    profiles?: any;
}, {
    files: {
        storage: IExtendedObservableMap<T> & ISnapshottable<{
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
        };
    } & {
        readonly $treenode?: any;
    };
    bots: {
        storage: IExtendedObservableMap<T> & ISnapshottable<{
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
            }) | null;
            image: any;
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
            error: string;
        } & {
            isNew: boolean;
        } & {
            setError: (value: string) => void;
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
                image: any;
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
            } & {
                id?: any;
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
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly $treenode?: any;
    };
    profiles: {
        storage: IExtendedObservableMap<T> & ISnapshottable<{
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
    create: <T>(type: IType<any, T>, data: {
        [key: string]: any;
    }) => T;
    load: (instance: any, data: {
        [key: string]: any;
    }) => void;
}>;
