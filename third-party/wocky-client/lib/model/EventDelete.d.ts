import { IModelType } from 'mobx-state-tree';
import { IProfile } from './Profile';
export declare type __IProfile = IProfile;
export declare const EventDelete: IModelType<{
    id?: any;
} & {
    time?: any;
} & {
    delete?: any;
}, {
    id: string;
} & {
    readonly service: any;
} & {
    time: number;
} & {
    readonly date: Date;
    readonly dateAsString: string;
    readonly relativeDateAsString: string;
} & {
    readonly target: IProfile;
} & {
    delete: boolean;
}>;
