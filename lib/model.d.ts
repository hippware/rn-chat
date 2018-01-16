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
export declare const ProfileList: IModelType<{
    relation?: any;
    user?: any;
}, {
    relation: string;
    user: string;
} & {
    loadPage: (a1: number) => Promise<any>;
    load: () => Promise<any[]>;
} & {
    readonly loading: boolean;
    readonly finished: boolean;
    readonly length: number;
    readonly list: ({
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
        handle: string;
        firstName: string;
        lastName: string;
        status: "available" | "unavailable";
        followersSize: number;
        botsSize: number;
        roles: IObservableArray<string> & ISnapshottable<string[]>;
    } & {
        readonly followers: {
            relation: string;
            user: string;
        } & {
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & any & {
            readonly $treenode?: any;
        };
        readonly following: {
            relation: string;
            user: string;
        } & {
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & any & {
            readonly $treenode?: any;
        };
    } & {
        readonly $treenode?: any;
    })[];
}>;
export declare const Profile: IModelType<{
    user?: any;
    avatar?: any;
    handle?: any;
    firstName?: any;
    lastName?: any;
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
    handle: string;
    firstName: string;
    lastName: string;
    status: "available" | "unavailable";
    followersSize: number;
    botsSize: number;
    roles: IObservableArray<string> & ISnapshottable<string[]>;
} & {
    readonly followers: {
        relation: string;
        user: string;
    } & {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly loading: boolean;
        readonly finished: boolean;
        readonly length: number;
        readonly list: ({
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
            handle: string;
            firstName: string;
            lastName: string;
            status: "available" | "unavailable";
            followersSize: number;
            botsSize: number;
            roles: IObservableArray<string> & ISnapshottable<string[]>;
        } & any & {
            readonly $treenode?: any;
        })[];
    } & {
        readonly $treenode?: any;
    };
    readonly following: {
        relation: string;
        user: string;
    } & {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly loading: boolean;
        readonly finished: boolean;
        readonly length: number;
        readonly list: ({
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
            handle: string;
            firstName: string;
            lastName: string;
            status: "available" | "unavailable";
            followersSize: number;
            botsSize: number;
            roles: IObservableArray<string> & ISnapshottable<string[]>;
        } & any & {
            readonly $treenode?: any;
        })[];
    } & {
        readonly $treenode?: any;
    };
}>;
export declare const OwnProfile: IModelType<{
    user?: any;
    avatar?: any;
    handle?: any;
    firstName?: any;
    lastName?: any;
    status?: any;
    followersSize?: any;
    botsSize?: any;
    roles?: any;
} & {
    email?: any;
    phoneNumber?: any;
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
    handle: string;
    firstName: string;
    lastName: string;
    status: "available" | "unavailable";
    followersSize: number;
    botsSize: number;
    roles: IObservableArray<string> & ISnapshottable<string[]>;
} & {
    readonly followers: {
        relation: string;
        user: string;
    } & {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly loading: boolean;
        readonly finished: boolean;
        readonly length: number;
        readonly list: ({
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
            handle: string;
            firstName: string;
            lastName: string;
            status: "available" | "unavailable";
            followersSize: number;
            botsSize: number;
            roles: IObservableArray<string> & ISnapshottable<string[]>;
        } & any & {
            readonly $treenode?: any;
        })[];
    } & {
        readonly $treenode?: any;
    };
    readonly following: {
        relation: string;
        user: string;
    } & {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly loading: boolean;
        readonly finished: boolean;
        readonly length: number;
        readonly list: ({
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
            handle: string;
            firstName: string;
            lastName: string;
            status: "available" | "unavailable";
            followersSize: number;
            botsSize: number;
            roles: IObservableArray<string> & ISnapshottable<string[]>;
        } & any & {
            readonly $treenode?: any;
        })[];
    } & {
        readonly $treenode?: any;
    };
} & {
    email: string;
    phoneNumber: string;
}>;
export declare type IProfile = typeof Profile.Type;
export declare type IProfileList = typeof ProfileList.Type;
