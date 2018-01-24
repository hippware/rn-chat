import { IModelType } from 'mobx-state-tree';
export declare const SERVICE_NAME = "WockyClient";
export declare const Base: IModelType<{
    id?: any;
}, {
    id: string;
} & {
    readonly pageId: string;
    readonly service: any;
}>;
export declare type IBase = typeof Base.Type;
