import { IModelType } from 'mobx-state-tree';
export declare function createUploadable(property: string, access: string | Function): IModelType<{
    id?: any;
} & {}, {
    id: string;
} & {
    readonly service: any;
} & {
    uploading: boolean;
    uploaded: boolean;
    uploadError: string;
} & {
    upload: (a1: any) => Promise<any>;
}>;
