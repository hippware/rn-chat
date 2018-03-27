import './strophe';
export default class XmppStropheV2 {
    host: any;
    onDisconnected: any;
    onConnected: any;
    onAuthFail: any;
    onPresence: any;
    onMessage: any;
    onIQ: any;
    username: any;
    _connection: any;
    handlers: any;
    log: any;
    /**
     * Creates class instance
     * @param host xmpp host
     * @param log optional log function
     */
    constructor(log?: any);
    login: (username: string, password: string, host: string, resource: string) => Promise<{}>;
    _onPresence: (stanza: any) => boolean;
    _onMessage: (stanza: any) => boolean;
    _onIQ: (stanza: any) => boolean;
    sendIQ: (data: any, callback: any) => void;
    sendStanza: (stanza: any) => void;
    /**
     * Send presence with given data
     * @param data presence data
     */
    sendPresence: (data?: any) => void;
    disconnect: () => void;
    disconnectAfterSending: () => void;
}
