import { IModelType } from 'mobx-state-tree';
export declare function createUpdatable(update: (self: any, data: any) => Function): IModelType<{}, {
    updated: boolean;
    updating: boolean;
    updateError: string;
} & {
    update: (a1: any) => Promise<any>;
} & {
    save: () => Promise<{}>;
}>;
