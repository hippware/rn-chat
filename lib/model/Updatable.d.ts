import { IModelType } from 'mobx-state-tree';
export declare function createUpdatable(update: (self: any) => Function): IModelType<{}, {
    updated: boolean;
    updating: boolean;
    updateError: string;
} & {
    update: (data: any) => void;
    _onChanged: () => Promise<{}>;
    afterCreate: () => void;
}>;
