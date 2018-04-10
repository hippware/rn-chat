import { IModelType } from 'mobx-state-tree';
export interface IPaginable extends IModelType<any, any> {
    result?: any[];
    list?: any[];
    cursor?: string;
    count?: number;
    loading?: boolean;
    finished?: boolean;
    add?: (i: any) => any;
    refresh?: () => void;
    load?: () => Promise<Array<any>>;
    addToTop?: (i: any) => any;
}
export declare function createPaginable(type: any): IPaginable;
