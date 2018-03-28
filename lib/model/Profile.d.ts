import { IType, IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare const Profile: IModelType<{
    id?: any;
} & {
    loaded?: any;
} & {
    id?: any;
    avatar?: any;
    handle?: any;
    status?: any;
    firstName?: any;
    lastName?: any;
    isBlocked?: any;
    isFollowed?: any;
    isFollower?: any;
    isNew?: any;
    followersSize?: any;
    followedSize?: any;
    botsSize?: any;
    roles?: any;
}, {
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
    handle: string | null;
    status: string;
    firstName: string | null;
    lastName: string | null;
    isBlocked: boolean;
    isFollowed: boolean;
    isFollower: boolean;
    isNew: boolean;
    followersSize: number;
    followedSize: number;
    botsSize: number;
    roles: IObservableArray<string> & ISnapshottable<string[]>;
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
    readonly activeBots: ({
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
        guest: boolean;
        visitor: boolean;
        title: string | null;
        server: string | null;
        radius: number;
        geofence: boolean;
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
            handle: string | null;
            status: string;
            firstName: string | null;
            lastName: string | null;
            isBlocked: boolean;
            isFollowed: boolean;
            isFollower: boolean;
            isNew: boolean;
            followersSize: number;
            followedSize: number;
            botsSize: number;
            roles: IObservableArray<string> & ISnapshottable<string[]>;
        } & {
            afterAttach: () => void;
            follow: () => Promise<{}>;
            unfollow: () => Promise<{}>;
            block: () => Promise<{}>;
            unblock: () => Promise<{}>;
            setStatus: (status: string) => void;
        } & any & {
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
        guestsSize: number;
        visitorsSize: number;
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
        guests: {
            result: IObservableArray<{}> & ISnapshottable<{}[]>;
            count: number | null;
        } & {
            loading: boolean;
            finished: boolean;
        } & {
            add: (item: any) => void;
            addToTop: (item: any) => void;
        } & {
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            remove: (id: string) => void;
            loadPage: (a1: number) => Promise<any>;
            refresh: () => void;
            load: () => Promise<any[]>;
        } & {
            readonly length: number;
            readonly list: any[];
            readonly first: any;
            readonly last: any;
        } & {
            readonly $treenode?: any;
        };
        visitors: {
            result: IObservableArray<{}> & ISnapshottable<{}[]>;
            count: number | null;
        } & {
            loading: boolean;
            finished: boolean;
        } & {
            add: (item: any) => void;
            addToTop: (item: any) => void;
        } & {
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            remove: (id: string) => void;
            loadPage: (a1: number) => Promise<any>;
            refresh: () => void;
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
        loading: boolean;
    } & {
        setError: (value: string) => void;
        startLoading(): void;
        finishLoading(): void;
        setGeofence: (value: boolean) => void;
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
                handle: string | null;
                status: string;
                firstName: string | null;
                lastName: string | null;
                isBlocked: boolean;
                isFollowed: boolean;
                isFollower: boolean;
                isNew: boolean;
                followersSize: number;
                followedSize: number;
                botsSize: number;
                roles: IObservableArray<string> & ISnapshottable<string[]>;
            } & {
                afterAttach: () => void;
                follow: () => Promise<{}>;
                unfollow: () => Promise<{}>;
                block: () => Promise<{}>;
                unblock: () => Promise<{}>;
                setStatus: (status: string) => void;
            } & any & {
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
        subscribeGeofence: () => Promise<{}>;
        unsubscribe: () => Promise<{}>;
        unsubscribeGeofence: () => Promise<{}>;
        share: (userIDs: string[], message?: string, action?: string) => void;
        setNew: (value: boolean) => void;
        load: (d?: any) => void;
    } & {
        shareToFriends: (message?: string) => void;
        shareToFollowers: (message?: string) => void;
    } & {
        readonly isPublic: boolean;
        readonly coverColor: number;
        readonly snapshot: any;
    } & {
        readonly $treenode?: any;
    })[];
    readonly displayName: string;
}>;
export declare const ProfilePaginableList: IModelType<{
    result?: any;
    count?: any;
}, {
    result: IObservableArray<{}> & ISnapshottable<{}[]>;
    count: number | null;
} & {
    loading: boolean;
    finished: boolean;
} & {
    add: (item: any) => void;
    addToTop: (item: any) => void;
} & {
    setRequest: (req: Function) => Function;
    exists: (id: string) => boolean;
    remove: (id: string) => void;
    loadPage: (a1: number) => Promise<any>;
    refresh: () => void;
    load: () => Promise<any[]>;
} & {
    readonly length: number;
    readonly list: any[];
    readonly first: any;
    readonly last: any;
}>;
export declare type IProfilePaginableList = typeof ProfilePaginableList.Type;
export declare type IProfile = typeof Profile.Type;
export declare const ProfileRef: IType<string | number | null | undefined, ({
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
    handle: string | null;
    status: string;
    firstName: string | null;
    lastName: string | null;
    isBlocked: boolean;
    isFollowed: boolean;
    isFollower: boolean;
    isNew: boolean;
    followersSize: number;
    followedSize: number;
    botsSize: number;
    roles: IObservableArray<string> & ISnapshottable<string[]>;
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
    readonly activeBots: ({
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
        guest: boolean;
        visitor: boolean;
        title: string | null;
        server: string | null;
        radius: number;
        geofence: boolean;
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
            handle: string | null;
            status: string;
            firstName: string | null;
            lastName: string | null;
            isBlocked: boolean;
            isFollowed: boolean;
            isFollower: boolean;
            isNew: boolean;
            followersSize: number;
            followedSize: number;
            botsSize: number;
            roles: IObservableArray<string> & ISnapshottable<string[]>;
        } & {
            afterAttach: () => void;
            follow: () => Promise<{}>;
            unfollow: () => Promise<{}>;
            block: () => Promise<{}>;
            unblock: () => Promise<{}>;
            setStatus: (status: string) => void;
        } & any & {
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
        guestsSize: number;
        visitorsSize: number;
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
        guests: {
            result: IObservableArray<{}> & ISnapshottable<{}[]>;
            count: number | null;
        } & {
            loading: boolean;
            finished: boolean;
        } & {
            add: (item: any) => void;
            addToTop: (item: any) => void;
        } & {
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            remove: (id: string) => void;
            loadPage: (a1: number) => Promise<any>;
            refresh: () => void;
            load: () => Promise<any[]>;
        } & {
            readonly length: number;
            readonly list: any[];
            readonly first: any;
            readonly last: any;
        } & {
            readonly $treenode?: any;
        };
        visitors: {
            result: IObservableArray<{}> & ISnapshottable<{}[]>;
            count: number | null;
        } & {
            loading: boolean;
            finished: boolean;
        } & {
            add: (item: any) => void;
            addToTop: (item: any) => void;
        } & {
            setRequest: (req: Function) => Function;
            exists: (id: string) => boolean;
            remove: (id: string) => void;
            loadPage: (a1: number) => Promise<any>;
            refresh: () => void;
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
        loading: boolean;
    } & {
        setError: (value: string) => void;
        startLoading(): void;
        finishLoading(): void;
        setGeofence: (value: boolean) => void;
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
                handle: string | null;
                status: string;
                firstName: string | null;
                lastName: string | null;
                isBlocked: boolean;
                isFollowed: boolean;
                isFollower: boolean;
                isNew: boolean;
                followersSize: number;
                followedSize: number;
                botsSize: number;
                roles: IObservableArray<string> & ISnapshottable<string[]>;
            } & {
                afterAttach: () => void;
                follow: () => Promise<{}>;
                unfollow: () => Promise<{}>;
                block: () => Promise<{}>;
                unblock: () => Promise<{}>;
                setStatus: (status: string) => void;
            } & any & {
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
        subscribeGeofence: () => Promise<{}>;
        unsubscribe: () => Promise<{}>;
        unsubscribeGeofence: () => Promise<{}>;
        share: (userIDs: string[], message?: string, action?: string) => void;
        setNew: (value: boolean) => void;
        load: (d?: any) => void;
    } & {
        shareToFriends: (message?: string) => void;
        shareToFollowers: (message?: string) => void;
    } & {
        readonly isPublic: boolean;
        readonly coverColor: number;
        readonly snapshot: any;
    } & {
        readonly $treenode?: any;
    })[];
    readonly displayName: string;
} & {
    readonly $treenode?: any;
}) | null>;
