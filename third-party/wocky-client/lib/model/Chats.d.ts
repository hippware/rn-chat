import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
import { IChat } from './Chat';
import { IProfile } from './Profile';
import { IBot } from './Bot';
export declare type __IProfile = IProfile;
export declare type __IBot = IBot;
export declare const Chats: IModelType<{
    _list?: any;
}, {
    _list: IObservableArray<{
        id: string;
    } & {
        readonly service: any;
    } & {
        id: string;
        active: boolean;
        loaded: boolean;
        requestedId: string | null;
        isPrivate: boolean;
        participants: IObservableArray<{
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
        }> & ISnapshottable<(string | number)[]>;
        _messages: IObservableArray<{
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
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
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
        })[]>;
        message: {
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
        } & {
            readonly $treenode?: any;
        };
    } & {
        loading: boolean;
    } & {
        readonly messages: IObservableArray<{
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
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
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
        })[]>;
        readonly unread: number;
        readonly followedParticipants: ({
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
        })[];
    } & {
        readonly last: ({
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
        } & {
            readonly $treenode?: any;
        }) | null;
        readonly first: ({
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
        } & {
            readonly $treenode?: any;
        }) | null;
    } & {
        readonly time: number;
    } & {
        readonly date: any;
    } & {
        setActive: (active: boolean) => boolean;
        readAll: () => void;
        load: () => Promise<{}>;
        addMessage: (msg: {
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
        } & {
            readonly $treenode?: any;
        }) => void;
        addParticipant: (profile: IProfile) => void;
    } & {
        afterAttach: () => void;
    } & {
        readonly $treenode?: any;
    }> & ISnapshottable<({
        id?: any;
    } & {
        id?: any;
        active?: any;
        loaded?: any;
        requestedId?: any;
        isPrivate?: any;
        participants?: any;
        _messages?: any;
        message?: any;
    })[]>;
} & {
    readonly _filteredList: ({
        id: string;
    } & {
        readonly service: any;
    } & {
        id: string;
        active: boolean;
        loaded: boolean;
        requestedId: string | null;
        isPrivate: boolean;
        participants: IObservableArray<{
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
        }> & ISnapshottable<(string | number)[]>;
        _messages: IObservableArray<{
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
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
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
        })[]>;
        message: {
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
        } & {
            readonly $treenode?: any;
        };
    } & {
        loading: boolean;
    } & {
        readonly messages: IObservableArray<{
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
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
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
        })[]>;
        readonly unread: number;
        readonly followedParticipants: ({
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
        })[];
    } & {
        readonly last: ({
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
        } & {
            readonly $treenode?: any;
        }) | null;
        readonly first: ({
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
        } & {
            readonly $treenode?: any;
        }) | null;
    } & {
        readonly time: number;
    } & {
        readonly date: any;
    } & {
        setActive: (active: boolean) => boolean;
        readAll: () => void;
        load: () => Promise<{}>;
        addMessage: (msg: {
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
        } & {
            readonly $treenode?: any;
        }) => void;
        addParticipant: (profile: IProfile) => void;
    } & {
        afterAttach: () => void;
    } & {
        readonly $treenode?: any;
    })[];
} & {
    readonly list: ({
        id: string;
    } & {
        readonly service: any;
    } & {
        id: string;
        active: boolean;
        loaded: boolean;
        requestedId: string | null;
        isPrivate: boolean;
        participants: IObservableArray<{
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
        }> & ISnapshottable<(string | number)[]>;
        _messages: IObservableArray<{
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
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
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
        })[]>;
        message: {
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
        } & {
            readonly $treenode?: any;
        };
    } & {
        loading: boolean;
    } & {
        readonly messages: IObservableArray<{
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
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
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
        })[]>;
        readonly unread: number;
        readonly followedParticipants: ({
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
        })[];
    } & {
        readonly last: ({
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
        } & {
            readonly $treenode?: any;
        }) | null;
        readonly first: ({
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
        } & {
            readonly $treenode?: any;
        }) | null;
    } & {
        readonly time: number;
    } & {
        readonly date: any;
    } & {
        setActive: (active: boolean) => boolean;
        readAll: () => void;
        load: () => Promise<{}>;
        addMessage: (msg: {
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
        } & {
            readonly $treenode?: any;
        }) => void;
        addParticipant: (profile: IProfile) => void;
    } & {
        afterAttach: () => void;
    } & {
        readonly $treenode?: any;
    })[];
    readonly unread: number;
    get(id: string): IChat | undefined;
} & {
    clear: () => ({
        id: string;
    } & {
        readonly service: any;
    } & {
        id: string;
        active: boolean;
        loaded: boolean;
        requestedId: string | null;
        isPrivate: boolean;
        participants: IObservableArray<{
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
        }> & ISnapshottable<(string | number)[]>;
        _messages: IObservableArray<{
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
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
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
        })[]>;
        message: {
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
        } & {
            readonly $treenode?: any;
        };
    } & {
        loading: boolean;
    } & {
        readonly messages: IObservableArray<{
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
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
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
        })[]>;
        readonly unread: number;
        readonly followedParticipants: ({
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
        })[];
    } & {
        readonly last: ({
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
        } & {
            readonly $treenode?: any;
        }) | null;
        readonly first: ({
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
        } & {
            readonly $treenode?: any;
        }) | null;
    } & {
        readonly time: number;
    } & {
        readonly date: any;
    } & {
        setActive: (active: boolean) => boolean;
        readAll: () => void;
        load: () => Promise<{}>;
        addMessage: (msg: {
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
        } & {
            readonly $treenode?: any;
        }) => void;
        addParticipant: (profile: IProfile) => void;
    } & {
        afterAttach: () => void;
    } & {
        readonly $treenode?: any;
    })[];
    remove: (id: string) => ({
        id: string;
    } & {
        readonly service: any;
    } & {
        id: string;
        active: boolean;
        loaded: boolean;
        requestedId: string | null;
        isPrivate: boolean;
        participants: IObservableArray<{
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
        }> & ISnapshottable<(string | number)[]>;
        _messages: IObservableArray<{
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
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
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
        })[]>;
        message: {
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
        } & {
            readonly $treenode?: any;
        };
    } & {
        loading: boolean;
    } & {
        readonly messages: IObservableArray<{
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
        } & {
            readonly $treenode?: any;
        }> & ISnapshottable<({
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
        })[]>;
        readonly unread: number;
        readonly followedParticipants: ({
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
        })[];
    } & {
        readonly last: ({
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
        } & {
            readonly $treenode?: any;
        }) | null;
        readonly first: ({
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
        } & {
            readonly $treenode?: any;
        }) | null;
    } & {
        readonly time: number;
    } & {
        readonly date: any;
    } & {
        setActive: (active: boolean) => boolean;
        readAll: () => void;
        load: () => Promise<{}>;
        addMessage: (msg: {
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
        } & {
            readonly $treenode?: any;
        }) => void;
        addParticipant: (profile: IProfile) => void;
    } & {
        afterAttach: () => void;
    } & {
        readonly $treenode?: any;
    })[];
    add: (chat: IChat) => IChat;
}>;
export declare type IChats = typeof Chats.Type;
