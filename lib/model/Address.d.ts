import { IModelType } from 'mobx-state-tree';
export declare const Address: IModelType<{
    city?: any;
    country?: any;
    state?: any;
    county?: any;
}, {
    city: string;
    country: string;
    state: string;
    county: string;
} & {
    readonly locationShort: string;
}>;
