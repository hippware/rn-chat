import { IModelType, IType, IExtendedObservableMap, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
import { IProfile } from '../model/Profile';
import { IBot } from '../model/Bot';
import { IPaginable } from '../model/PaginableList';
import { IChat } from '../model/Chat';
import { IWockyTransport } from '..';
export declare const EventEntity: IType<({
    id?: any;
} & {
    time?: any;
} & {
    bot?: any;
} & {
    post?: any;
}) | ({
    id?: any;
} & {
    time?: any;
} & {
    bot?: any;
} & {
    note?: any;
}) | ({
    id?: any;
} & {
    time?: any;
} & {
    bot?: any;
} & {
    message?: any;
    action?: any;
}) | ({
    id?: any;
} & {
    time?: any;
} & {
    bot?: any;
} & {
    created?: any;
}) | ({
    id?: any;
} & {
    time?: any;
} & {
    bot?: any;
} & {
    isEnter?: any;
    profile?: any;
}) | ({
    id?: any;
} & {
    time?: any;
} & {
    delete?: any;
}), ({
    id: string;
} & {
    readonly service: any;
} & {
    time: number;
} & {
    readonly date: Date;
    readonly dateAsString: string;
    readonly relativeDateAsString: string;
} & {
    readonly target: IProfile;
} & {
    bot: {
        id: string;
    } & {
        readonly service: any;
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
            readonly service: any;
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
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isOwn: boolean;
            readonly isVerified: boolean;
            readonly isMutual: boolean;
            readonly followers: any;
            readonly followed: any;
            readonly ownBots: any;
            readonly subscribedBots: any;
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
        subscribers: any;
        guests: any;
        visitors: any;
        posts: any;
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
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
        subscribeGeofence: () => Promise<{}>;
        unsubscribe: () => Promise<{}>;
        unsubscribeGeofence: () => Promise<{}>;
        share: (userIDs: string[], message?: string, action?: string) => void;
        setNew: (value: boolean) => void;
        load: (d?: any) => void;
    } & {
        shareToFriends: (message?: string) => void;
        shareToFollowers: (message?: string) => void;
        postProcessSnapshot: (snapshot: any) => any;
    } & {
        readonly isPublic: boolean;
        readonly coverColor: number;
    } & {
        readonly $treenode?: any;
    };
} & {
    readonly target: IProfile;
} & {
    post: {
        id: string;
    } & {
        readonly service: any;
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
            readonly service: any;
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
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isOwn: boolean;
            readonly isVerified: boolean;
            readonly isMutual: boolean;
            readonly followers: any;
            readonly followed: any;
            readonly ownBots: any;
            readonly subscribedBots: any;
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
    };
} & {
    readonly $treenode?: any;
}) | ({
    id: string;
} & {
    readonly service: any;
} & {
    time: number;
} & {
    readonly date: Date;
    readonly dateAsString: string;
    readonly relativeDateAsString: string;
} & {
    readonly target: IProfile;
} & {
    bot: {
        id: string;
    } & {
        readonly service: any;
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
            readonly service: any;
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
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isOwn: boolean;
            readonly isVerified: boolean;
            readonly isMutual: boolean;
            readonly followers: any;
            readonly followed: any;
            readonly ownBots: any;
            readonly subscribedBots: any;
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
        subscribers: any;
        guests: any;
        visitors: any;
        posts: any;
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
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
        subscribeGeofence: () => Promise<{}>;
        unsubscribe: () => Promise<{}>;
        unsubscribeGeofence: () => Promise<{}>;
        share: (userIDs: string[], message?: string, action?: string) => void;
        setNew: (value: boolean) => void;
        load: (d?: any) => void;
    } & {
        shareToFriends: (message?: string) => void;
        shareToFollowers: (message?: string) => void;
        postProcessSnapshot: (snapshot: any) => any;
    } & {
        readonly isPublic: boolean;
        readonly coverColor: number;
    } & {
        readonly $treenode?: any;
    };
} & {
    readonly target: IProfile;
} & {
    note: string;
} & {
    readonly $treenode?: any;
}) | ({
    id: string;
} & {
    readonly service: any;
} & {
    time: number;
} & {
    readonly date: Date;
    readonly dateAsString: string;
    readonly relativeDateAsString: string;
} & {
    readonly target: IProfile;
} & {
    bot: {
        id: string;
    } & {
        readonly service: any;
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
            readonly service: any;
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
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isOwn: boolean;
            readonly isVerified: boolean;
            readonly isMutual: boolean;
            readonly followers: any;
            readonly followed: any;
            readonly ownBots: any;
            readonly subscribedBots: any;
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
        subscribers: any;
        guests: any;
        visitors: any;
        posts: any;
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
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
        subscribeGeofence: () => Promise<{}>;
        unsubscribe: () => Promise<{}>;
        unsubscribeGeofence: () => Promise<{}>;
        share: (userIDs: string[], message?: string, action?: string) => void;
        setNew: (value: boolean) => void;
        load: (d?: any) => void;
    } & {
        shareToFriends: (message?: string) => void;
        shareToFollowers: (message?: string) => void;
        postProcessSnapshot: (snapshot: any) => any;
    } & {
        readonly isPublic: boolean;
        readonly coverColor: number;
    } & {
        readonly $treenode?: any;
    };
} & {
    readonly target: IProfile;
} & {
    message: {
        id: string;
    } & {
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
        from: ({
            id: string;
        } & {
            readonly service: any;
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
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isOwn: boolean;
            readonly isVerified: boolean;
            readonly isMutual: boolean;
            readonly followers: any;
            readonly followed: any;
            readonly ownBots: any;
            readonly subscribedBots: any;
            readonly displayName: string;
        } & {
            readonly $treenode?: any;
        }) | null;
        to: string;
        media: any;
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
    action: string;
} & {
    readonly target: IProfile;
} & {
    readonly $treenode?: any;
}) | ({
    id: string;
} & {
    readonly service: any;
} & {
    time: number;
} & {
    readonly date: Date;
    readonly dateAsString: string;
    readonly relativeDateAsString: string;
} & {
    readonly target: IProfile;
} & {
    bot: {
        id: string;
    } & {
        readonly service: any;
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
            readonly service: any;
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
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isOwn: boolean;
            readonly isVerified: boolean;
            readonly isMutual: boolean;
            readonly followers: any;
            readonly followed: any;
            readonly ownBots: any;
            readonly subscribedBots: any;
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
        subscribers: any;
        guests: any;
        visitors: any;
        posts: any;
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
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
        subscribeGeofence: () => Promise<{}>;
        unsubscribe: () => Promise<{}>;
        unsubscribeGeofence: () => Promise<{}>;
        share: (userIDs: string[], message?: string, action?: string) => void;
        setNew: (value: boolean) => void;
        load: (d?: any) => void;
    } & {
        shareToFriends: (message?: string) => void;
        shareToFollowers: (message?: string) => void;
        postProcessSnapshot: (snapshot: any) => any;
    } & {
        readonly isPublic: boolean;
        readonly coverColor: number;
    } & {
        readonly $treenode?: any;
    };
} & {
    readonly target: IProfile;
} & {
    created: boolean;
} & {
    readonly $treenode?: any;
}) | ({
    id: string;
} & {
    readonly service: any;
} & {
    time: number;
} & {
    readonly date: Date;
    readonly dateAsString: string;
    readonly relativeDateAsString: string;
} & {
    readonly target: IProfile;
} & {
    bot: {
        id: string;
    } & {
        readonly service: any;
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
            readonly service: any;
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
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isOwn: boolean;
            readonly isVerified: boolean;
            readonly isMutual: boolean;
            readonly followers: any;
            readonly followed: any;
            readonly ownBots: any;
            readonly subscribedBots: any;
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
        subscribers: any;
        guests: any;
        visitors: any;
        posts: any;
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
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
        subscribeGeofence: () => Promise<{}>;
        unsubscribe: () => Promise<{}>;
        unsubscribeGeofence: () => Promise<{}>;
        share: (userIDs: string[], message?: string, action?: string) => void;
        setNew: (value: boolean) => void;
        load: (d?: any) => void;
    } & {
        shareToFriends: (message?: string) => void;
        shareToFollowers: (message?: string) => void;
        postProcessSnapshot: (snapshot: any) => any;
    } & {
        readonly isPublic: boolean;
        readonly coverColor: number;
    } & {
        readonly $treenode?: any;
    };
} & {
    readonly target: IProfile;
} & {
    isEnter: boolean;
    profile: {
        id: string;
    } & {
        readonly service: any;
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
        postProcessSnapshot: (snapshot: any) => any;
    } & {
        readonly isOwn: boolean;
        readonly isVerified: boolean;
        readonly isMutual: boolean;
        readonly followers: any;
        readonly followed: any;
        readonly ownBots: any;
        readonly subscribedBots: any;
        readonly displayName: string;
    } & {
        readonly $treenode?: any;
    };
} & {
    readonly target: IProfile;
} & {
    readonly $treenode?: any;
}) | ({
    id: string;
} & {
    readonly service: any;
} & {
    time: number;
} & {
    readonly date: Date;
    readonly dateAsString: string;
    readonly relativeDateAsString: string;
} & {
    readonly target: IProfile;
} & {
    delete: boolean;
} & {
    readonly $treenode?: any;
})>;
export declare type IEventEntity = typeof EventEntity.Type;
export declare const EventList: IModelType<any, any>;
export declare type IEventListType = typeof EventList.Type;
export interface IEventList extends IEventListType {
}
export declare type __IPaginable = IPaginable;
export declare type __IProfile = IProfile;
export declare const Wocky: IModelType<{
    id?: any;
} & {
    files?: any;
    bots?: any;
    profiles?: any;
} & {
    id?: any;
    username?: any;
    password?: any;
    host?: any;
    sessionCount?: any;
    roster?: any;
    profile?: any;
    updates?: any;
    events?: any;
    geofenceBots?: any;
    geoBots?: any;
    chats?: any;
    version?: any;
}, {
    id: string;
} & {
    readonly service: any;
} & {
    files: {
        storage: IExtendedObservableMap<any> & ISnapshottable<{
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
        } | undefined) => any;
    } & {
        readonly $treenode?: any;
    };
    bots: {
        storage: IExtendedObservableMap<any> & ISnapshottable<{
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
        } | undefined) => any;
    } & {
        readonly $treenode?: any;
    };
    profiles: {
        storage: IExtendedObservableMap<any> & ISnapshottable<{
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
        } | undefined) => any;
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
} & {
    id: string;
    username: string | null;
    password: string | null;
    host: string;
    sessionCount: number;
    roster: IExtendedObservableMap<{
        id: string;
    } & {
        readonly service: any;
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
        postProcessSnapshot: (snapshot: any) => any;
    } & {
        readonly isOwn: boolean;
        readonly isVerified: boolean;
        readonly isMutual: boolean;
        readonly followers: any;
        readonly followed: any;
        readonly ownBots: any;
        readonly subscribedBots: any;
        readonly displayName: string;
    } & {
        readonly $treenode?: any;
    }> & ISnapshottable<{
        [key: string]: string | number;
    }>;
    profile: ({
        id: string;
    } & {
        readonly service: any;
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
        postProcessSnapshot: (snapshot: any) => any;
    } & {
        readonly isOwn: boolean;
        readonly isVerified: boolean;
        readonly isMutual: boolean;
        readonly followers: any;
        readonly followed: any;
        readonly ownBots: any;
        readonly subscribedBots: any;
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
        email: string | null;
        phoneNumber: string | null;
    } & {
        readonly $treenode?: any;
    }) | null;
    updates: IObservableArray<({
        id: string;
    } & {
        readonly service: any;
    } & {
        time: number;
    } & {
        readonly date: Date;
        readonly dateAsString: string;
        readonly relativeDateAsString: string;
    } & {
        readonly target: IProfile;
    } & {
        bot: {
            id: string;
        } & {
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
            subscribers: any;
            guests: any;
            visitors: any;
            posts: any;
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
                readonly service: any;
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
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
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
            subscribeGeofence: () => Promise<{}>;
            unsubscribe: () => Promise<{}>;
            unsubscribeGeofence: () => Promise<{}>;
            share: (userIDs: string[], message?: string, action?: string) => void;
            setNew: (value: boolean) => void;
            load: (d?: any) => void;
        } & {
            shareToFriends: (message?: string) => void;
            shareToFollowers: (message?: string) => void;
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isPublic: boolean;
            readonly coverColor: number;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly target: IProfile;
    } & {
        post: {
            id: string;
        } & {
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
        };
    } & {
        readonly $treenode?: any;
    }) | ({
        id: string;
    } & {
        readonly service: any;
    } & {
        time: number;
    } & {
        readonly date: Date;
        readonly dateAsString: string;
        readonly relativeDateAsString: string;
    } & {
        readonly target: IProfile;
    } & {
        bot: {
            id: string;
        } & {
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
            subscribers: any;
            guests: any;
            visitors: any;
            posts: any;
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
                readonly service: any;
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
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
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
            subscribeGeofence: () => Promise<{}>;
            unsubscribe: () => Promise<{}>;
            unsubscribeGeofence: () => Promise<{}>;
            share: (userIDs: string[], message?: string, action?: string) => void;
            setNew: (value: boolean) => void;
            load: (d?: any) => void;
        } & {
            shareToFriends: (message?: string) => void;
            shareToFollowers: (message?: string) => void;
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isPublic: boolean;
            readonly coverColor: number;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly target: IProfile;
    } & {
        note: string;
    } & {
        readonly $treenode?: any;
    }) | ({
        id: string;
    } & {
        readonly service: any;
    } & {
        time: number;
    } & {
        readonly date: Date;
        readonly dateAsString: string;
        readonly relativeDateAsString: string;
    } & {
        readonly target: IProfile;
    } & {
        bot: {
            id: string;
        } & {
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
            subscribers: any;
            guests: any;
            visitors: any;
            posts: any;
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
                readonly service: any;
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
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
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
            subscribeGeofence: () => Promise<{}>;
            unsubscribe: () => Promise<{}>;
            unsubscribeGeofence: () => Promise<{}>;
            share: (userIDs: string[], message?: string, action?: string) => void;
            setNew: (value: boolean) => void;
            load: (d?: any) => void;
        } & {
            shareToFriends: (message?: string) => void;
            shareToFollowers: (message?: string) => void;
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isPublic: boolean;
            readonly coverColor: number;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly target: IProfile;
    } & {
        message: {
            id: string;
        } & {
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
            from: ({
                id: string;
            } & {
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
                readonly displayName: string;
            } & {
                readonly $treenode?: any;
            }) | null;
            to: string;
            media: any;
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
        action: string;
    } & {
        readonly target: IProfile;
    } & {
        readonly $treenode?: any;
    }) | ({
        id: string;
    } & {
        readonly service: any;
    } & {
        time: number;
    } & {
        readonly date: Date;
        readonly dateAsString: string;
        readonly relativeDateAsString: string;
    } & {
        readonly target: IProfile;
    } & {
        bot: {
            id: string;
        } & {
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
            subscribers: any;
            guests: any;
            visitors: any;
            posts: any;
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
                readonly service: any;
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
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
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
            subscribeGeofence: () => Promise<{}>;
            unsubscribe: () => Promise<{}>;
            unsubscribeGeofence: () => Promise<{}>;
            share: (userIDs: string[], message?: string, action?: string) => void;
            setNew: (value: boolean) => void;
            load: (d?: any) => void;
        } & {
            shareToFriends: (message?: string) => void;
            shareToFollowers: (message?: string) => void;
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isPublic: boolean;
            readonly coverColor: number;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly target: IProfile;
    } & {
        created: boolean;
    } & {
        readonly $treenode?: any;
    }) | ({
        id: string;
    } & {
        readonly service: any;
    } & {
        time: number;
    } & {
        readonly date: Date;
        readonly dateAsString: string;
        readonly relativeDateAsString: string;
    } & {
        readonly target: IProfile;
    } & {
        bot: {
            id: string;
        } & {
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
            subscribers: any;
            guests: any;
            visitors: any;
            posts: any;
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
                readonly service: any;
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
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
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
            subscribeGeofence: () => Promise<{}>;
            unsubscribe: () => Promise<{}>;
            unsubscribeGeofence: () => Promise<{}>;
            share: (userIDs: string[], message?: string, action?: string) => void;
            setNew: (value: boolean) => void;
            load: (d?: any) => void;
        } & {
            shareToFriends: (message?: string) => void;
            shareToFollowers: (message?: string) => void;
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isPublic: boolean;
            readonly coverColor: number;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly target: IProfile;
    } & {
        isEnter: boolean;
        profile: {
            id: string;
        } & {
            readonly service: any;
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
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isOwn: boolean;
            readonly isVerified: boolean;
            readonly isMutual: boolean;
            readonly followers: any;
            readonly followed: any;
            readonly ownBots: any;
            readonly subscribedBots: any;
            readonly displayName: string;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly target: IProfile;
    } & {
        readonly $treenode?: any;
    }) | ({
        id: string;
    } & {
        readonly service: any;
    } & {
        time: number;
    } & {
        readonly date: Date;
        readonly dateAsString: string;
        readonly relativeDateAsString: string;
    } & {
        readonly target: IProfile;
    } & {
        delete: boolean;
    } & {
        readonly $treenode?: any;
    })> & ISnapshottable<(({
        id?: any;
    } & {
        time?: any;
    } & {
        bot?: any;
    } & {
        post?: any;
    }) | ({
        id?: any;
    } & {
        time?: any;
    } & {
        bot?: any;
    } & {
        note?: any;
    }) | ({
        id?: any;
    } & {
        time?: any;
    } & {
        bot?: any;
    } & {
        message?: any;
        action?: any;
    }) | ({
        id?: any;
    } & {
        time?: any;
    } & {
        bot?: any;
    } & {
        created?: any;
    }) | ({
        id?: any;
    } & {
        time?: any;
    } & {
        bot?: any;
    } & {
        isEnter?: any;
        profile?: any;
    }) | ({
        id?: any;
    } & {
        time?: any;
    } & {
        delete?: any;
    }))[]>;
    events: any;
    geofenceBots: any;
    geoBots: IExtendedObservableMap<{
        id: string;
    } & {
        readonly service: any;
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
            readonly service: any;
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
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isOwn: boolean;
            readonly isVerified: boolean;
            readonly isMutual: boolean;
            readonly followers: any;
            readonly followed: any;
            readonly ownBots: any;
            readonly subscribedBots: any;
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
        subscribers: any;
        guests: any;
        visitors: any;
        posts: any;
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
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
        subscribeGeofence: () => Promise<{}>;
        unsubscribe: () => Promise<{}>;
        unsubscribeGeofence: () => Promise<{}>;
        share: (userIDs: string[], message?: string, action?: string) => void;
        setNew: (value: boolean) => void;
        load: (d?: any) => void;
    } & {
        shareToFriends: (message?: string) => void;
        shareToFollowers: (message?: string) => void;
        postProcessSnapshot: (snapshot: any) => any;
    } & {
        readonly isPublic: boolean;
        readonly coverColor: number;
    } & {
        readonly $treenode?: any;
    }> & ISnapshottable<{
        [key: string]: string | number;
    }>;
    chats: {
        _list: IObservableArray<{
            id: string;
        } & {
            readonly service: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            participants: IObservableArray<{
                id: string;
            } & {
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
                readonly displayName: string;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
            } & {
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
                readonly displayName: string;
            } & {
                readonly $treenode?: any;
            })[];
        } & {
            readonly last: ({
                id: string;
            } & {
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
            addParticipant: (profile: IProfile) => void;
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
            readonly service: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            participants: IObservableArray<{
                id: string;
            } & {
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
                readonly displayName: string;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
            } & {
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
                readonly displayName: string;
            } & {
                readonly $treenode?: any;
            })[];
        } & {
            readonly last: ({
                id: string;
            } & {
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
            addParticipant: (profile: IProfile) => void;
        } & {
            afterAttach: () => void;
        } & {
            readonly $treenode?: any;
        })[];
    } & {
        readonly list: ({
            id: string;
        } & {
            readonly service: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            participants: IObservableArray<{
                id: string;
            } & {
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
                readonly displayName: string;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
            } & {
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
                readonly displayName: string;
            } & {
                readonly $treenode?: any;
            })[];
        } & {
            readonly last: ({
                id: string;
            } & {
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
            addParticipant: (profile: IProfile) => void;
        } & {
            afterAttach: () => void;
        } & {
            readonly $treenode?: any;
        })[];
        readonly unread: number;
        get(id: string): IChat | undefined;
    } & {
        clear: () => ({
            id: string;
        } & {
            readonly service: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            participants: IObservableArray<{
                id: string;
            } & {
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
                readonly displayName: string;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
            } & {
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
                readonly displayName: string;
            } & {
                readonly $treenode?: any;
            })[];
        } & {
            readonly last: ({
                id: string;
            } & {
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
            addParticipant: (profile: IProfile) => void;
        } & {
            afterAttach: () => void;
        } & {
            readonly $treenode?: any;
        })[];
        remove: (id: string) => ({
            id: string;
        } & {
            readonly service: any;
        } & {
            id: string;
            active: boolean;
            loaded: boolean;
            requestedId: string | null;
            isPrivate: boolean;
            participants: IObservableArray<{
                id: string;
            } & {
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
                readonly displayName: string;
            } & {
                readonly $treenode?: any;
            }> & ISnapshottable<(string | number)[]>;
            _messages: IObservableArray<{
                id: string;
            } & {
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
                readonly displayName: string;
            } & {
                readonly $treenode?: any;
            })[];
        } & {
            readonly last: ({
                id: string;
            } & {
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
                from: ({
                    id: string;
                } & {
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
                    readonly displayName: string;
                } & {
                    readonly $treenode?: any;
                }) | null;
                to: string;
                media: any;
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
            addParticipant: (profile: IProfile) => void;
        } & {
            afterAttach: () => void;
        } & {
            readonly $treenode?: any;
        })[];
        add: (chat: IChat) => IChat;
    } & {
        readonly $treenode?: any;
    };
    version: string;
} & {
    loadProfile: (a1: string) => Promise<any>;
} & {
    postProcessSnapshot: (snapshot: any) => any;
    login: () => Promise<{}>;
    disconnect: () => Promise<{}>;
    remove: () => Promise<{}>;
    register: (a1: any, a2: string) => Promise<any>;
    testRegister: (a1: any) => Promise<any>;
    _requestProfiles: (a1: string[]) => Promise<any>;
    _updateProfile: (a1: Object) => Promise<any>;
    lookup: (a1: string) => Promise<any>;
    createChat: (id: string) => IChat;
} & {
    readonly transport: IWockyTransport;
    readonly connected: boolean;
    readonly connecting: boolean;
    readonly sortedRoster: IProfile[];
    readonly updatesToAdd: (({
        id: string;
    } & {
        readonly service: any;
    } & {
        time: number;
    } & {
        readonly date: Date;
        readonly dateAsString: string;
        readonly relativeDateAsString: string;
    } & {
        readonly target: IProfile;
    } & {
        bot: {
            id: string;
        } & {
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
            subscribers: any;
            guests: any;
            visitors: any;
            posts: any;
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
                readonly service: any;
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
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
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
            subscribeGeofence: () => Promise<{}>;
            unsubscribe: () => Promise<{}>;
            unsubscribeGeofence: () => Promise<{}>;
            share: (userIDs: string[], message?: string, action?: string) => void;
            setNew: (value: boolean) => void;
            load: (d?: any) => void;
        } & {
            shareToFriends: (message?: string) => void;
            shareToFollowers: (message?: string) => void;
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isPublic: boolean;
            readonly coverColor: number;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly target: IProfile;
    } & {
        post: {
            id: string;
        } & {
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
        };
    } & {
        readonly $treenode?: any;
    }) | ({
        id: string;
    } & {
        readonly service: any;
    } & {
        time: number;
    } & {
        readonly date: Date;
        readonly dateAsString: string;
        readonly relativeDateAsString: string;
    } & {
        readonly target: IProfile;
    } & {
        bot: {
            id: string;
        } & {
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
            subscribers: any;
            guests: any;
            visitors: any;
            posts: any;
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
                readonly service: any;
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
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
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
            subscribeGeofence: () => Promise<{}>;
            unsubscribe: () => Promise<{}>;
            unsubscribeGeofence: () => Promise<{}>;
            share: (userIDs: string[], message?: string, action?: string) => void;
            setNew: (value: boolean) => void;
            load: (d?: any) => void;
        } & {
            shareToFriends: (message?: string) => void;
            shareToFollowers: (message?: string) => void;
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isPublic: boolean;
            readonly coverColor: number;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly target: IProfile;
    } & {
        note: string;
    } & {
        readonly $treenode?: any;
    }) | ({
        id: string;
    } & {
        readonly service: any;
    } & {
        time: number;
    } & {
        readonly date: Date;
        readonly dateAsString: string;
        readonly relativeDateAsString: string;
    } & {
        readonly target: IProfile;
    } & {
        bot: {
            id: string;
        } & {
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
            subscribers: any;
            guests: any;
            visitors: any;
            posts: any;
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
                readonly service: any;
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
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
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
            subscribeGeofence: () => Promise<{}>;
            unsubscribe: () => Promise<{}>;
            unsubscribeGeofence: () => Promise<{}>;
            share: (userIDs: string[], message?: string, action?: string) => void;
            setNew: (value: boolean) => void;
            load: (d?: any) => void;
        } & {
            shareToFriends: (message?: string) => void;
            shareToFollowers: (message?: string) => void;
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isPublic: boolean;
            readonly coverColor: number;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly target: IProfile;
    } & {
        message: {
            id: string;
        } & {
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
            from: ({
                id: string;
            } & {
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
                readonly displayName: string;
            } & {
                readonly $treenode?: any;
            }) | null;
            to: string;
            media: any;
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
        action: string;
    } & {
        readonly target: IProfile;
    } & {
        readonly $treenode?: any;
    }) | ({
        id: string;
    } & {
        readonly service: any;
    } & {
        time: number;
    } & {
        readonly date: Date;
        readonly dateAsString: string;
        readonly relativeDateAsString: string;
    } & {
        readonly target: IProfile;
    } & {
        bot: {
            id: string;
        } & {
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
            subscribers: any;
            guests: any;
            visitors: any;
            posts: any;
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
                readonly service: any;
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
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
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
            subscribeGeofence: () => Promise<{}>;
            unsubscribe: () => Promise<{}>;
            unsubscribeGeofence: () => Promise<{}>;
            share: (userIDs: string[], message?: string, action?: string) => void;
            setNew: (value: boolean) => void;
            load: (d?: any) => void;
        } & {
            shareToFriends: (message?: string) => void;
            shareToFollowers: (message?: string) => void;
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isPublic: boolean;
            readonly coverColor: number;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly target: IProfile;
    } & {
        created: boolean;
    } & {
        readonly $treenode?: any;
    }) | ({
        id: string;
    } & {
        readonly service: any;
    } & {
        time: number;
    } & {
        readonly date: Date;
        readonly dateAsString: string;
        readonly relativeDateAsString: string;
    } & {
        readonly target: IProfile;
    } & {
        bot: {
            id: string;
        } & {
            readonly service: any;
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
                readonly service: any;
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
                postProcessSnapshot: (snapshot: any) => any;
            } & {
                readonly isOwn: boolean;
                readonly isVerified: boolean;
                readonly isMutual: boolean;
                readonly followers: any;
                readonly followed: any;
                readonly ownBots: any;
                readonly subscribedBots: any;
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
            subscribers: any;
            guests: any;
            visitors: any;
            posts: any;
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
                readonly service: any;
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
                    readonly service: any;
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
                    postProcessSnapshot: (snapshot: any) => any;
                } & {
                    readonly isOwn: boolean;
                    readonly isVerified: boolean;
                    readonly isMutual: boolean;
                    readonly followers: any;
                    readonly followed: any;
                    readonly ownBots: any;
                    readonly subscribedBots: any;
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
            subscribeGeofence: () => Promise<{}>;
            unsubscribe: () => Promise<{}>;
            unsubscribeGeofence: () => Promise<{}>;
            share: (userIDs: string[], message?: string, action?: string) => void;
            setNew: (value: boolean) => void;
            load: (d?: any) => void;
        } & {
            shareToFriends: (message?: string) => void;
            shareToFollowers: (message?: string) => void;
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isPublic: boolean;
            readonly coverColor: number;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly target: IProfile;
    } & {
        isEnter: boolean;
        profile: {
            id: string;
        } & {
            readonly service: any;
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
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isOwn: boolean;
            readonly isVerified: boolean;
            readonly isMutual: boolean;
            readonly followers: any;
            readonly followed: any;
            readonly ownBots: any;
            readonly subscribedBots: any;
            readonly displayName: string;
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly target: IProfile;
    } & {
        readonly $treenode?: any;
    }) | ({
        id: string;
    } & {
        readonly service: any;
    } & {
        time: number;
    } & {
        readonly date: Date;
        readonly dateAsString: string;
        readonly relativeDateAsString: string;
    } & {
        readonly target: IProfile;
    } & {
        delete: boolean;
    } & {
        readonly $treenode?: any;
    }))[];
} & {
    readonly activeBots: IBot[];
    readonly all: IProfile[];
    readonly blocked: IProfile[];
    readonly friends: IProfile[];
    readonly followers: IProfile[];
    readonly newFollowers: IProfile[];
    readonly followed: IProfile[];
} & {
    addRosterItem: (profile: any) => void;
    getProfile: (a1: string) => Promise<any>;
    createProfile: (id: string, data?: {
        [key: string]: any;
    }) => any;
    getBot: ({id, server, ...data}: {
        id: string;
        server?: string | undefined;
        owner?: string | null | undefined;
    }) => IBot;
    _addMessage: ({id, message}: {
        id: string;
        message: any;
    }) => void;
    deleteBot: (id: string) => void;
} & {
    _follow: (a1: string) => Promise<any>;
    _unfollow: (a1: string) => Promise<any>;
    _block: (a1: string) => Promise<any>;
    _unblock: (a1: string) => Promise<any>;
    requestRoster: () => Promise<{}>;
    loadChats: () => Promise<{}>;
    loadBot: (a1: string, a2: any) => Promise<any>;
    removeBot: (a1: string) => Promise<any>;
} & {
    createBot: () => Promise<IBot>;
    _loadOwnBots: (a1: string) => Promise<any>;
    _loadGeofenceBots: () => Promise<{}>;
    _loadBotSubscribers: (a1: string) => Promise<any>;
    _loadBotGuests: (a1: string) => Promise<any>;
    _loadBotVisitors: (a1: string) => Promise<any>;
    _loadBotPosts: (a1: string) => Promise<any>;
    _loadSubscribedBots: (a1: string) => Promise<any>;
    _updateBot: (a1: IBot) => Promise<any>;
    _removeBotPost: (a1: string, a2: string) => Promise<any>;
    _shareBot: (id: string, server: string, recepients: string[], message: string, action: string) => void;
    _publishBotPost: (a1: {
        id: string;
    } & {
        readonly service: any;
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
        upload: any;
    } & {
        id: string;
        content: string;
        title: string;
        image: any;
        profile: ({
            id: string;
        } & {
            readonly service: any;
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
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isOwn: boolean;
            readonly isVerified: boolean;
            readonly isMutual: boolean;
            readonly followers: any;
            readonly followed: any;
            readonly ownBots: any;
            readonly subscribedBots: any;
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
    }) => Promise<any>;
    _subscribeGeofenceBot: (a1: string) => Promise<any>;
    _subscribeBot: (a1: string) => Promise<any>;
    _unsubscribeGeofenceBot: (a1: string) => Promise<any>;
    _unsubscribeBot: (a1: string) => Promise<any>;
    geosearch: (a1: any) => Promise<any>;
    _loadRelations: (a1: string) => Promise<any>;
    _sendMessage: (msg: {
        id: string;
    } & {
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
        from: ({
            id: string;
        } & {
            readonly service: any;
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
            postProcessSnapshot: (snapshot: any) => any;
        } & {
            readonly isOwn: boolean;
            readonly isVerified: boolean;
            readonly isMutual: boolean;
            readonly followers: any;
            readonly followed: any;
            readonly ownBots: any;
            readonly subscribedBots: any;
            readonly displayName: string;
        } & {
            readonly $treenode?: any;
        }) | null;
        to: string;
        media: any;
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
    downloadURL: (a1: string) => Promise<any>;
    downloadFile: (a1: string, a2: string, a3: string) => Promise<any>;
    downloadThumbnail: (a1: string, a2: string) => Promise<any>;
    downloadTROS: (a1: string) => Promise<any>;
    setLocation: (a1: ISnapshottable<{
        latitude?: any;
        longitude?: any;
        accuracy?: any;
    }>) => Promise<any>;
    getLocationsVisited: (limit?: number | undefined) => Promise<object[]>;
    _requestUpload: (a1: any) => Promise<any>;
    _loadUpdates: () => Promise<{}>;
    _loadHomestream: (a1: any) => Promise<any>;
    _subscribeToHomestream: (version: string) => void;
    _onBotVisitor: (a1: any) => Promise<any>;
    _onNotification: (a1: any) => Promise<any>;
    incorporateUpdates: () => void;
    _onGeoBot: (bot: any) => void;
    enablePush: (a1: string) => Promise<any>;
    disablePush: () => Promise<{}>;
    setSessionCount: (value: number) => void;
} & {
    clearCache: () => void;
    logout: () => Promise<{}>;
    afterCreate: () => void;
}>;
export declare type IWockyType = typeof Wocky.Type;
export interface IWocky extends IWockyType {
}
