import { IModelType, ISimpleType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare const FileSource: IModelType<{
    uri?: any;
    contentType?: any;
    cached?: any;
}, {
    uri: string;
    contentType: string;
    cached: boolean;
}>;
export declare const File: IModelType<{
    id?: any;
    item?: any;
    source?: any;
    width?: any;
    height?: any;
    error?: any;
    loaded?: any;
    loading?: any;
    isNew?: any;
}, {
    id: string;
    item: string;
    source: {
        uri: string;
        contentType: string;
        cached: boolean;
    } & {
        readonly $treenode?: any;
    };
    width: number;
    height: number;
    error: string;
    loaded: boolean;
    loading: boolean;
    isNew: boolean;
}>;
export declare const Status: ISimpleType<"available" | "unavailable">;
export declare const Profile: IModelType<{
    user?: any;
    avatar?: any;
    email?: any;
    handle?: any;
    firstName?: any;
    lastName?: any;
    phoneNumber?: any;
    loaded?: any;
    isFollower?: any;
    isFollowed?: any;
    isNew?: any;
    isBlocked?: any;
    hidePosts?: any;
    status?: any;
    followersSize?: any;
    botsSize?: any;
    roles?: any;
}, {
    user: string;
    avatar: ({
        id: string;
        item: string;
        source: {
            uri: string;
            contentType: string;
            cached: boolean;
        } & {
            readonly $treenode?: any;
        };
        width: number;
        height: number;
        error: string;
        loaded: boolean;
        loading: boolean;
        isNew: boolean;
    } & {
        readonly $treenode?: any;
    }) | null;
    email: string;
    handle: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    loaded: boolean;
    isFollower: boolean;
    isFollowed: boolean;
    isNew: boolean;
    isBlocked: boolean;
    hidePosts: boolean;
    status: "available" | "unavailable";
    followersSize: number;
    botsSize: number;
    roles: IObservableArray<string> & ISnapshottable<string[]>;
}>;
export declare type IProfile = typeof Profile.Type;
export declare const ProfileList: IModelType<{
    list?: any;
    lastId?: any;
    finished?: any;
    loading?: any;
}, {
    list: IObservableArray<{
        user: string;
        avatar: ({
            id: string;
            item: string;
            source: {
                uri: string;
                contentType: string;
                cached: boolean;
            } & {
                readonly $treenode?: any;
            };
            width: number;
            height: number;
            error: string;
            loaded: boolean;
            loading: boolean;
            isNew: boolean;
        } & {
            readonly $treenode?: any;
        }) | null;
        email: string;
        handle: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        loaded: boolean;
        isFollower: boolean;
        isFollowed: boolean;
        isNew: boolean;
        isBlocked: boolean;
        hidePosts: boolean;
        status: "available" | "unavailable";
        followersSize: number;
        botsSize: number;
        roles: IObservableArray<string> & ISnapshottable<string[]>;
    } & {
        readonly $treenode?: any;
    }> & ISnapshottable<{
        user?: any;
        avatar?: any;
        email?: any;
        handle?: any;
        firstName?: any;
        lastName?: any;
        phoneNumber?: any;
        loaded?: any;
        isFollower?: any;
        isFollowed?: any;
        isNew?: any;
        isBlocked?: any;
        hidePosts?: any;
        status?: any;
        followersSize?: any;
        botsSize?: any;
        roles?: any;
    }[]>;
    lastId: string;
    finished: boolean;
    loading: boolean;
} & {
    readonly length: number;
} & {
    startLoading: () => true;
    stopLoading: () => false;
    complete: () => true;
    add: (profile: {
        user: string;
        avatar: ({
            id: string;
            item: string;
            source: {
                uri: string;
                contentType: string;
                cached: boolean;
            } & {
                readonly $treenode?: any;
            };
            width: number;
            height: number;
            error: string;
            loaded: boolean;
            loading: boolean;
            isNew: boolean;
        } & {
            readonly $treenode?: any;
        }) | null;
        email: string;
        handle: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        loaded: boolean;
        isFollower: boolean;
        isFollowed: boolean;
        isNew: boolean;
        isBlocked: boolean;
        hidePosts: boolean;
        status: "available" | "unavailable";
        followersSize: number;
        botsSize: number;
        roles: IObservableArray<string> & ISnapshottable<string[]>;
    } & {
        readonly $treenode?: any;
    }) => number;
    setLastId: (id: string) => string;
}>;
