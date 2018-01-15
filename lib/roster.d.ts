import { ISnapshottable, IModelType, IExtendedObservableMap } from 'mobx-state-tree';
import { IReactionDisposer, IObservableArray } from 'mobx';
declare const _default: IModelType<{
    connected?: any;
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
    connected: boolean;
    username: string | null;
    password: string | null;
    resource: string;
    host: string;
} & {
    onConnect: () => true;
    onDisconnect: () => false;
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
    }) | null;
    profiles: IExtendedObservableMap<{
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
        [key: string]: {
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
        };
    }>;
} & {
    registerProfile: (profile: {
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
    }) => {
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
    };
    unregisterProfile: (user: string) => boolean;
} & {
    loadProfile: (a1: string) => Promise<any>;
    updateProfile: (a1: Object) => Promise<any>;
    remove: () => Promise<{}>;
} & {
    afterCreate: () => IReactionDisposer;
    beforeDestroy: () => void;
} & {
    roster: IObservableArray<{
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
