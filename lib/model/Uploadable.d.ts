import { IModelType } from 'mobx-state-tree';
export declare function createUploadable(property: string, access: string | Function): IModelType<{
    id?: any;
} & {} & {
    uploaded?: any;
}, {
    id: string;
} & {
    readonly pageId: string;
    readonly service: any;
} & {
    uploaded: boolean;
} & {
    uploading: boolean;
} & {
    upload: (a1: any) => Promise<any>;
}>;
