import { IModelType } from 'mobx-state-tree';
export declare function createUploadable(property: string, access: string | Function): IModelType<{
    id?: any;
} & {}, {
    id: string;
} & {
    readonly _snapshot: any;
    readonly service: any;
} & {
    readonly snapshot: any;
} & {
    uploading: boolean;
    uploaded: boolean;
    uploadError: string;
} & {
    upload: (a1: any) => Promise<any>;
}>;
