import { IModelType } from 'mobx-state-tree';
export declare const Timeable: IModelType<{
    time?: any;
}, {
    time: number;
} & {
    readonly date: Date;
    readonly dateAsString: string;
    readonly relativeDateAsString: string;
}>;
