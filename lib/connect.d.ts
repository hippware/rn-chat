import { IModelType } from 'mobx-state-tree';
declare const _default: IModelType<{
    username?: any;
    password?: any;
    resource?: any;
    host?: any;
}, {
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
    login: () => Promise<{}>;
    sendStanza: any;
    disconnect: () => Promise<{}>;
}>;
export default _default;
