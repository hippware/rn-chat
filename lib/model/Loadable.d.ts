import { IModelType } from 'mobx-state-tree';
export declare function createLoadable(load: (self: any) => Function): IModelType<{
    loaded?: any;
}, {
    loaded: boolean;
} & {
    loading: boolean;
    loadError: string;
} & {
    load: (data: any) => void;
} & {
    request: () => Promise<any>;
}>;
