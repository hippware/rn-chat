import { IModelType } from 'mobx-state-tree';
declare const _default: IModelType<{
    connected?: any;
    username?: any;
    password?: any;
    resource?: any;
    host?: any;
} & {
    iq?: any;
}, {
    connected: boolean;
    username: string | null;
    password: string | null;
    resource: string;
    host: string;
} & {
    onConnect: () => true;
    onDisconnect: () => false;
} & {
    afterCreate: () => void;
    login: () => Promise<{}>;
    sendStanza: any;
    disconnect: () => Promise<{}>;
} & {
    iq: any;
} & {
    onIQ: (iq: any) => any;
} & {
    afterCreate: () => void;
    sendIQ: (a1: any) => Promise<any>;
}>;
export default _default;
