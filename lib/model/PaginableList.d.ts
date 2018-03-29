import { IModelType, ISnapshottable } from 'mobx-state-tree';
import { IObservableArray } from 'mobx';
export declare function createPaginable(type: any): IModelType<{
    result?: any;
    cursor?: any;
    count?: any;
}, {
    result: IObservableArray<{}> & ISnapshottable<{}[]>;
    cursor: string | null;
    count: number | null;
} & {
    loading: boolean;
    finished: boolean;
} & {
    add: (item: any) => void;
    addToTop: (item: any) => void;
} & {
    setRequest: (req: Function) => Function;
    exists: (id: string) => boolean;
    remove: (id: string) => void;
    loadPage: (a1: number) => Promise<any>;
    refresh: () => void;
    load: () => Promise<any[]>;
} & {
    readonly length: number;
    readonly list: any[];
    readonly first: any;
    readonly last: any;
}>;
