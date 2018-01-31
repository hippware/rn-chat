import { IModelType } from 'mobx-state-tree';
export declare const Location: IModelType<{
    latitude?: any;
    longitude?: any;
    accuracy?: any;
}, {
    latitude: number;
    longitude: number;
    accuracy: number | null;
} & {
    addToIQ: (iq: any) => void;
}>;
