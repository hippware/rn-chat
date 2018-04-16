import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
import { IBot } from './Bot';
export declare type __IBot = IBot;
export declare const OwnProfile: IModelType<{
    id?: any;
} & {
    loaded?: any;
} & {
    id?: any;
    avatar?: any;
    handle?: any;
    status?: any;
    firstName?: any;
    lastName?: any;
    isBlocked?: any;
    isFollowed?: any;
    isFollower?: any;
    isNew?: any;
    followersSize?: any;
    followedSize?: any;
    botsSize?: any;
    roles?: any;
} & {} & {
    email?: any;
    phoneNumber?: any;
}, {
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
    email: string | null;
    phoneNumber: string | null;
}>;
