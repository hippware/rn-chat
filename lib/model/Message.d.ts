import { IModelType } from 'mobx-state-tree';
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
    readonly pageId: string;
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
    from: any;
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
