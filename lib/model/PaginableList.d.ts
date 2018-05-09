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
    load?: (args?: {
        force?: boolean;
    }) => Promise<any[]>;
    addToTop?: (i: any) => any;
    remove?: (id: string) => void;
}
export declare function createPaginable(type: any): IPaginable;
