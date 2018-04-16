import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
import { IProfile } from './Profile';
import { IBot } from './Bot';
export declare type __IBot = IBot;
export declare type __IProfile = IProfile;
export declare const EventBotCreate: IModelType<{
    id?: any;
} & {
    time?: any;
} & {
    bot?: any;
} & {
    created?: any;
}, {
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
            readonly geofenceBots: any;
            readonly activeBots: IBot[];
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
                readonly geofenceBots: any;
                readonly activeBots: IBot[];
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
}>;
export declare type IEventBotCreate = typeof EventBotCreate.Type;
