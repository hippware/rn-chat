import { IModelType } from "mobx-state-tree";
declare const connect: IModelType<{
    username?: any;
    password?: any;
    resource?: any;
    host?: any;
    connected?: any;
    connecting?: any;
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
}>;
export default connect;
