import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
import { IBot } from './Bot';
export declare type __IBot = IBot;
export declare const Message: IModelType<{
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
        readonly geofenceBots: any;
        readonly activeBots: IBot[];
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
}>;
export declare type IMessage = typeof Message.Type;
