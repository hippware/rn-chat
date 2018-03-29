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
    source?: any;
    thumbnail?: any;
    url?: any;
}, {
    id: string;
} & {
    readonly _snapshot: any;
    readonly service: any;
} & {
    readonly snapshot: any;
} & {
    id: string;
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
} & {
    loading: boolean;
    isNew: boolean;
    error: string;
} & {
    readonly loaded: boolean;
    readonly snapshot: any;
} & {
    setURL: (url: string) => void;
    setSource: (source: any) => void;
    downloadThumbnail: () => Promise<{}>;
    download: () => Promise<{}>;
} & {
    afterAttach: () => Promise<{}>;
}>;
export declare type IFileType = typeof File.Type;
export interface IFile extends IFileType {
}
export declare const FileRef: IType<string | number | null | undefined, any>;
