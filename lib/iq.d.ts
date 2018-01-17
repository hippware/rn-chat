import { IModelType } from 'mobx-state-tree';
declare const iq: IModelType<{
    username?: any;
    password?: any;
    resource?: any;
    host?: any;
    connected?: any;
    connecting?: any;
} & {
    iq?: any;
}, {
    username: string | null;
    password: string | null;
    resource: string;
    host: string;
    connected: boolean;
    connecting: boolean;
} & {
    onConnect: () => void;
    onDisconnect: () => void;
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
export default iq;
