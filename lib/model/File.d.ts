import { IType, IModelType } from 'mobx-state-tree';
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
}, {
    id: string;
} & {
    readonly pageId: string;
    readonly service: any;
} & {
    id: string;
    item: string | null;
} & {
    _source: null;
    _thumbnail: null;
    loading: boolean;
    isNew: boolean;
    url: string;
    error: string;
} & {
    readonly loaded: boolean;
    readonly thumbnail: ({
        uri: string;
        contentType: string | null;
        width: number | null;
        height: number | null;
        cached: boolean;
    } & {
        readonly $treenode?: any;
    }) | null;
    readonly source: ({
        uri: string;
        contentType: string | null;
        width: number | null;
        height: number | null;
        cached: boolean;
    } & {
        readonly $treenode?: any;
    }) | null;
} & {
    setURL: (url: string) => void;
    setSource: (source: any) => void;
    downloadThumbnail: () => Promise<{}>;
    download: () => Promise<{}>;
} & {
    afterAttach: () => Promise<{}>;
}>;
export declare type IFile = typeof File.Type;
export declare const FileRef: IType<string | number | null | undefined, any>;
