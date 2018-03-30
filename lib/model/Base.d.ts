import { IModelType } from 'mobx-state-tree';
export declare const SERVICE_NAME = "WockyClient";
export declare type __IModelType = IModelType<any, any>;
export declare const Base: IModelType<{
    id?: any;
}, {
    id: string;
} & {
    readonly _snapshot: any;
    readonly service: any;
} & {
    readonly snapshot: any;
}>;
export declare type IBaseType = typeof Base.Type;
export interface IBase extends IBaseType {
}
