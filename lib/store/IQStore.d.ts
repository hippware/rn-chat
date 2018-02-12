import { IModelType } from 'mobx-state-tree';
declare const iqStore: IModelType<{
    id?: any;
} & {
    username?: any;
    password?: any;
    resource?: any;
    host?: any;
} & {}, {
    id: string;
} & {
    readonly pageId: string;
    readonly _snapshot: any;
    readonly service: any;
} & {
    readonly snapshot: any;
} & {
    username: string | null;
    password: string | null;
    resource: string;
    host: string;
} & {
    connected: boolean;
    connecting: boolean;
} & {
    onConnect: () => void;
    onDisconnect: () => void;
} & {
    afterCreate: () => void;
    beforeDestroy: () => void;
    login: () => Promise<{}>;
    sendStanza: any;
    disconnect: () => Promise<{}>;
} & {
    iq: any;
} & {
    onIQ: (iq: any) => void;
} & {
    afterCreate: () => void;
    sendIQ: (a1: any) => Promise<any>;
}>;
export default iqStore;
