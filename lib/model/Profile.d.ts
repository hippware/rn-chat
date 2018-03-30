import { IModelType, IType, ISnapshottable } from 'mobx-state-tree';
import { IPaginable } from './PaginableList';
import { IBot } from './Bot';
import { IObservableArray } from 'mobx';
export declare type __IObs = IObservableArray<any>;
export declare type __ISnap = ISnapshottable<any>;
export declare type __IPaginable = IPaginable;
export declare const Profile: IModelType<{
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
}, {
    id: string;
} & {
    readonly _snapshot: any;
    readonly service: any;
} & {
    readonly snapshot: any;
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
} & {
    readonly snapshot: any;
    readonly isOwn: boolean;
    readonly isVerified: boolean;
    readonly isMutual: boolean;
    readonly followers: any;
    readonly followed: any;
    readonly ownBots: any;
    readonly subscribedBots: any;
    readonly activeBots: IBot[];
    readonly displayName: string;
}>;
export declare const ProfilePaginableList: IPaginable;
export declare type IProfilePaginableListType = typeof ProfilePaginableList.Type;
export interface IProfilePaginableList extends IProfilePaginableListType {
}
export declare type IProfileType = typeof Profile.Type;
export interface IProfile extends IProfileType {
}
export declare const ProfileRef: IType<string | number | null | undefined, ({
    id: string;
} & {
    readonly _snapshot: any;
    readonly service: any;
} & {
    readonly snapshot: any;
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
} & {
    readonly snapshot: any;
    readonly isOwn: boolean;
    readonly isVerified: boolean;
    readonly isMutual: boolean;
    readonly followers: any;
    readonly followed: any;
    readonly ownBots: any;
    readonly subscribedBots: any;
    readonly activeBots: IBot[];
    readonly displayName: string;
} & {
    readonly $treenode?: any;
}) | null>;
