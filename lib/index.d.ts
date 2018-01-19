import { IModelType, IExtendedObservableMap, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray, IReactionDisposer } from 'mobx';
import './XmppStropheV2';
import { Profile as P } from './model';
import { PaginableList as PL } from './paging';
export declare type IWocky = typeof Wocky.Type;
export declare type IProfile = typeof P.Type;
export declare type IPaginableList = typeof PL.Type;
export declare const Wocky: IModelType<{
    username?: any;
    password?: any;
    resource?: any;
    host?: any;
} & {
    iq?: any;
} & {
    message?: any;
} & {} & {
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
    message: any;
} & {
    onMessage: (message: any) => any;
} & {
    afterCreate: () => void;
    sendMessage: (msg: any) => void;
} & {
    register: (a1: any) => Promise<any>;
} & {
    testRegister: (a1: {
        phoneNumber: string;
    }) => Promise<any>;
} & {
    profile: ({
        id: string;
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
        readonly isOwn: boolean;
        readonly followers: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly followed: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
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
        readonly isOwn: boolean;
        readonly followers: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly followed: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
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
        readonly isOwn: boolean;
        readonly followers: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly followed: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
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
        readonly isOwn: boolean;
        readonly followers: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly followed: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
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
} & {
    createProfile(id: string, data: any): {
        id: string;
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
        readonly isOwn: boolean;
        readonly followers: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly followed: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
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
    loadProfile: (a1: string) => Promise<any>;
} & {
    updateProfile: (a1: Object) => Promise<any>;
    lookup: (a1: string) => Promise<any>;
    remove: () => Promise<{}>;
    loadRelations: (a1: string) => Promise<any>;
} & {
    afterCreate: () => IReactionDisposer;
    beforeDestroy: () => void;
} & {
    roster: IObservableArray<{
        id: string;
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
        readonly isOwn: boolean;
        readonly followers: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly followed: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
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
    sendPresence: any;
    processItem: (item?: any) => void;
} & {
    addToRoster: (a1: string, a2: string) => Promise<any>;
    removeFromRoster: (a1: string) => Promise<any>;
} & {
    onPresence: (stanza: any) => void;
    follow: (a1: {
        id: string;
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
        readonly isOwn: boolean;
        readonly followers: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
            loadPage: any;
            load: () => Promise<any[]>;
        } & {
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly followed: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
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
        readonly isOwn: boolean;
        readonly followers: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
            loadPage: any;
            load: () => Promise<any[]>;
        } & {
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly followed: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
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
        readonly isOwn: boolean;
        readonly followers: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
            loadPage: any;
            load: () => Promise<any[]>;
        } & {
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly followed: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
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
        readonly isOwn: boolean;
        readonly followers: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
            loadPage: any;
            load: () => Promise<any[]>;
        } & {
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly followed: {
            result: never[];
            loading: boolean;
            finished: boolean;
        } & {
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
    afterCreate: () => void;
    beforeDestroy: () => void;
}>;
export declare const Profile: IModelType<{
    id?: any;
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
}, {
    id: string;
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
    readonly isOwn: boolean;
    readonly followers: {
        result: never[];
        loading: boolean;
        finished: boolean;
    } & {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly length: number;
        readonly list: any[];
    } & {
        readonly $treenode?: any;
    };
    readonly followed: {
        result: never[];
        loading: boolean;
        finished: boolean;
    } & {
        loadPage: (a1: number) => Promise<any>;
        load: () => Promise<any[]>;
    } & {
        readonly length: number;
        readonly list: any[];
    } & {
        readonly $treenode?: any;
    };
    readonly displayName: string;
}>;
export declare const PaginableList: IModelType<{}, {
    result: never[];
    loading: boolean;
    finished: boolean;
} & {
    loadPage: (a1: number) => Promise<any>;
    load: () => Promise<any[]>;
} & {
    readonly length: number;
    readonly list: any[];
}>;
