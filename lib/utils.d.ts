export declare function waitFor(condition: () => boolean): Promise<{}>;
declare const _default: {
    fromCamelCase(data?: any): Object;
    getJid(username: string, host: string, resource: string): string;
    getNodeJid(jid: string): string | null;
    getUniqueId(suffix: string): string;
    parseXml(xml: HTMLElement, arrayTags?: [string] | undefined): any;
    hashCode(s: string): number;
    iso8601toDate(date: string): Date;
};
export default _default;
