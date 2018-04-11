import { IModelType } from 'mobx-state-tree';
export interface IPaginable extends IModelType<any, any> {
    result?: any[];
    cursor?: string;
    count?: number;
    loading?: boolean;
    finished?: boolean;
    add?: (i: any) => any;
    refresh?: () => void;
    load?: (args?: {
        force?: boolean;
    }) => Promise<Array<any>>;
    addToTop?: (i: any) => any;
    list?: Array<any>;
}
export declare function createPaginable(type: any): IPaginable;
