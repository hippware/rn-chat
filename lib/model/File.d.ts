import { IModelType } from 'mobx-state-tree';
export declare const FileSource: IModelType<{
    uri?: any;
    contentType?: any;
    width?: any;
    height?: any;
    cached?: any;
}, {
    uri: string;
    contentType: string | null;
    width: number | null;
    height: number | null;
    cached: boolean;
}>;
export declare type IFileSource = typeof FileSource.Type;
export declare const File: IModelType<{
    id?: any;
} & {
    id?: any;
    item?: any;
    source?: any;
    thumbnail?: any;
    url?: any;
    isNew?: any;
}, {
    id: string;
} & {
    readonly pageId: string;
    readonly service: any;
} & {
    id: string;
    item: string | null;
    source: ({
        uri: string;
        contentType: string | null;
        width: number | null;
        height: number | null;
        cached: boolean;
    } & {
        readonly $treenode?: any;
    }) | null;
    thumbnail: ({
        uri: string;
        contentType: string | null;
        width: number | null;
        height: number | null;
        cached: boolean;
    } & {
        readonly $treenode?: any;
    }) | null;
    url: string;
    isNew: boolean;
} & {
    loading: boolean;
} & {
    readonly loaded: boolean;
} & {
    downloadThumbnail: () => Promise<{}>;
    download: () => Promise<{}>;
} & {
    afterAttach: () => Promise<{}>;
}>;
export declare type IFile = typeof File.Type;
