import { IModelType } from 'mobx-state-tree';
export declare function create(target: any, requestName: string, ...params: Array<any>): IPaginableList;
export declare const PaginableList: IModelType<{}, {
    result: never[];
    loading: boolean;
    finished: boolean;
} & {
    loadPage: (a1: number) => Promise<any>;
    load: () => Promise<any[]>;
} & {
    readonly length: number;
    readonly list: any[];
}>;
export declare type IPaginableList = typeof PaginableList.Type;
