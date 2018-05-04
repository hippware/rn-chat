import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
import { IPaginable } from './PaginableList';
import { IBot } from './Bot';
export declare type __IPaginable = IPaginable;
export declare type __IBot = IBot;
export declare const BotPost: IModelType<{
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
}>;
export declare type IBotPost = typeof BotPost.Type;
export declare const BotPostPaginableList: IPaginable;
