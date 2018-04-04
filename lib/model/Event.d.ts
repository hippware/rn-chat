import { IModelType } from 'mobx-state-tree';
import { IProfile } from './Profile';
export declare const Event: IModelType<{
    id?: any;
} & {
    time?: any;
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
}>;
export declare type IEventType = typeof Event.Type;
export interface IEvent extends IEventType {
}
