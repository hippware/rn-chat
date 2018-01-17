import { IModelType, IExtendedObservableMap, ISnapshottable } from 'mobx-state-tree';
import { IReactionDisposer, IObservableArray } from 'mobx';
declare const profile: IModelType<{
    username?: any;
    password?: any;
    resource?: any;
    host?: any;
    connected?: any;
    connecting?: any;
} & {
    iq?: any;
} & {
    message?: any;
} & {} & {
    profile?: any;
    profiles?: any;
}, {
    username: string | null;
    password: string | null;
    resource: string;
    host: string;
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
        avatar: string;
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
                avatar: string;
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
                avatar: string;
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
    } & {
        readonly $treenode?: any;
    }) | null;
    profiles: IExtendedObservableMap<{
        user: string;
        avatar: string;
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
                avatar: string;
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
                avatar: string;
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
        avatar: string;
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
                avatar: string;
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
                avatar: string;
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
        readonly $treenode?: any;
    }) => {
        user: string;
        avatar: string;
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
                avatar: string;
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
                avatar: string;
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
}>;
export default profile;
