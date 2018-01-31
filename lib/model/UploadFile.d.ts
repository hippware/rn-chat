import { IModelType } from 'mobx-state-tree';
export declare const UploadFile: IModelType<{
    id?: any;
} & {
    file?: any;
    width?: any;
    height?: any;
    size?: any;
    access?: any;
    target?: any;
}, {
    id: string;
} & {
    readonly pageId: string;
    readonly service: any;
} & {
    file: {
        uri: string;
        body: any;
        name: string | null;
        contentType: string;
        width: number;
        size: number | null;
        access: string | null;
        height: number;
        cached: boolean;
    } & {
        readonly $treenode?: any;
    };
    width: number;
    height: number;
    size: number;
    access: string;
    target: ({
        id: string;
    } & {
        readonly pageId: string;
        readonly service: any;
    } & {
        id: string | null;
        upload: ({
            uri: string;
            body: any;
            name: string | null;
            contentType: string;
            width: number;
            size: number | null;
            access: string | null;
            height: number;
            cached: boolean;
        } & {
            readonly $treenode?: any;
        }) | null;
        item: string | null;
    } & {
        _source: null;
        _thumbnail: null;
        uploading: boolean;
        loading: boolean;
        isNew: boolean;
        url: string;
        error: string;
    } & {
        readonly uploaded: boolean;
        readonly loaded: boolean;
        readonly thumbnail: ({
            uri: string;
            body: any;
            name: string | null;
            contentType: string;
            width: number;
            size: number | null;
            access: string | null;
            height: number;
            cached: boolean;
        } & {
            readonly $treenode?: any;
        }) | null;
        readonly source: ({
            uri: string;
            body: any;
            name: string | null;
            contentType: string;
            width: number;
            size: number | null;
            access: string | null;
            height: number;
            cached: boolean;
        } & {
            readonly $treenode?: any;
        }) | null;
    } & {
        setURL: (url: string) => void;
        downloadThumbnail: () => Promise<{}>;
        download: () => Promise<{}>;
    } & {
        afterAttach: () => Promise<{}>;
    } & {
        readonly $treenode?: any;
    }) | null;
} & {
    uploading: boolean;
    error: string;
} & {
    readonly uploaded: boolean;
} & {
    afterAttach: () => Promise<{}>;
}>;
export declare type IUploadFile = typeof UploadFile.Type;
