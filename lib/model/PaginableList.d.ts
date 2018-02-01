import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare function createPaginable(type: any): IModelType<{
    result?: any;
    count?: any;
}, {
    result: IObservableArray<{}> & ISnapshottable<{}[]>;
    count: number | null;
} & {
    loading: boolean;
    finished: boolean;
} & {
    setRequest: (req: Function) => Function;
    add: (item: any) => void;
    remove: (id: string) => void;
    loadPage: (a1: number) => Promise<any>;
    refresh: () => void;
    load: () => Promise<any[]>;
} & {
    readonly length: number;
    readonly list: any[];
}>;
