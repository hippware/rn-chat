import { IModelType, ISnapshottable, IExtendedObservableMap } from 'mobx-state-tree';
import { IReactionDisposer, IObservableArray } from 'mobx';
declare const _default: IModelType<{
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
        avatar: string;
        handle: string;
        firstName: string;
        lastName: string;
        status: "available" | "unavailable";
        followersSize: number;
        followedSize: number;
        botsSize: number;
        roles: IObservableArray<string> & ISnapshottable<string[]>;
    } & {
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
    } & {
        email: string;
        phoneNumber: string;
    } & {
        readonly $treenode?: any;
    }) | null;
    profiles: IExtendedObservableMap<{
        id: string;
        avatar: string;
        handle: string;
        firstName: string;
        lastName: string;
        status: "available" | "unavailable";
        followersSize: number;
        followedSize: number;
        botsSize: number;
        roles: IObservableArray<string> & ISnapshottable<string[]>;
    } & {
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
    } & {
        readonly $treenode?: any;
    }> & ISnapshottable<{
        [key: string]: {
            id?: any;
            avatar?: any;
            handle?: any;
            firstName?: any;
            lastName?: any;
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
        avatar: string;
        handle: string;
        firstName: string;
        lastName: string;
        status: "available" | "unavailable";
        followersSize: number;
        followedSize: number;
        botsSize: number;
        roles: IObservableArray<string> & ISnapshottable<string[]>;
    } & {
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
    } & {
        readonly $treenode?: any;
    }) => {
        id: string;
        avatar: string;
        handle: string;
        firstName: string;
        lastName: string;
        status: "available" | "unavailable";
        followersSize: number;
        followedSize: number;
        botsSize: number;
        roles: IObservableArray<string> & ISnapshottable<string[]>;
    } & {
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
    } & {
        readonly $treenode?: any;
    };
    unregisterProfile: (user: string) => boolean;
} & {
    create(id: string, data: any): {
        id: string;
        avatar: string;
        handle: string;
        firstName: string;
        lastName: string;
        status: "available" | "unavailable";
        followersSize: number;
        followedSize: number;
        botsSize: number;
        roles: IObservableArray<string> & ISnapshottable<string[]>;
    } & {
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
        avatar: string;
        handle: string;
        firstName: string;
        lastName: string;
        status: "available" | "unavailable";
        followersSize: number;
        followedSize: number;
        botsSize: number;
        roles: IObservableArray<string> & ISnapshottable<string[]>;
    } & {
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
    } & {
        readonly $treenode?: any;
    }> & ISnapshottable<(string | number)[]>;
} & {
    sendPresence: any;
    processItem: (item?: any) => void;
} & {
    onPresence: (stanza: any) => void;
    addToRoster: (a1: string) => Promise<any>;
    removeFromRoster: (a1: string) => Promise<any>;
    requestRoster: () => Promise<{}>;
} & {
    afterCreate: () => void;
    beforeDestroy: () => void;
}>;
export default _default;
