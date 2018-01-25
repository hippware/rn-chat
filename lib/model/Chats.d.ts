import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare const Chats: IModelType<{
    _list?: any;
}, {
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
}>;
