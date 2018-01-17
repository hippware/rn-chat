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
    profile: ({
        user: string;
        avatar: ({
            tros: string;
            url: string;
            thumbnail: string;
        } & {
            setURL: (url: string) => string;
            setThumbnail: (thumbnail: string) => string;
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
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly loading: boolean;
            readonly finished: boolean;
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly following: {
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly loading: boolean;
            readonly finished: boolean;
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
        user: string;
        avatar: ({
            tros: string;
            url: string;
            thumbnail: string;
        } & {
            setURL: (url: string) => string;
            setThumbnail: (thumbnail: string) => string;
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
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly loading: boolean;
            readonly finished: boolean;
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly following: {
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly loading: boolean;
            readonly finished: boolean;
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly $treenode?: any;
    }> & ISnapshottable<{
        [key: string]: {
            user?: any;
            avatar?: any;
            handle?: any;
            firstName?: any;
            lastName?: any;
            status?: any;
            followersSize?: any;
            botsSize?: any;
            roles?: any;
        };
    }>;
} & {
    registerProfile: (profile: {
        user: string;
        avatar: ({
            tros: string;
            url: string;
            thumbnail: string;
        } & {
            setURL: (url: string) => string;
            setThumbnail: (thumbnail: string) => string;
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
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly loading: boolean;
            readonly finished: boolean;
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly following: {
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly loading: boolean;
            readonly finished: boolean;
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
    } & {
        readonly $treenode?: any;
    }) => {
        user: string;
        avatar: ({
            tros: string;
            url: string;
            thumbnail: string;
        } & {
            setURL: (url: string) => string;
            setThumbnail: (thumbnail: string) => string;
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
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly loading: boolean;
            readonly finished: boolean;
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly following: {
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly loading: boolean;
            readonly finished: boolean;
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
    loadProfile: (a1: string) => Promise<any>;
} & {
    updateProfile: (a1: Object) => Promise<any>;
    remove: () => Promise<{}>;
    loadRelations: (a1: string) => Promise<any>;
} & {
    afterCreate: () => IReactionDisposer;
    beforeDestroy: () => void;
} & {
    roster: IObservableArray<{
        user: string;
        avatar: ({
            tros: string;
            url: string;
            thumbnail: string;
        } & {
            setURL: (url: string) => string;
            setThumbnail: (thumbnail: string) => string;
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
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly loading: boolean;
            readonly finished: boolean;
            readonly length: number;
            readonly list: any[];
        } & {
            readonly $treenode?: any;
        };
        readonly following: {
            loadPage: (a1: number) => Promise<any>;
            load: () => Promise<any[]>;
        } & {
            readonly loading: boolean;
            readonly finished: boolean;
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
