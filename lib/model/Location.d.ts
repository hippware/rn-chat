import { IModelType, ISnapshottable } from 'mobx-state-tree';
export declare const Location: IModelType<{
    latitude?: any;
    longitude?: any;
    accuracy?: any;
}, {
    latitude: number;
    longitude: number;
    accuracy: number | null;
} & {
    isCurrent: boolean;
} & {
    load: (data: any) => void;
    addToIQ: (iq: any) => void;
}>;
export declare type ILocationSnapshot = ISnapshottable<typeof Location.SnapshotType>;
