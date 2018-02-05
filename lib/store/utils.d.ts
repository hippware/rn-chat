declare const _default: {
    fromCamelCase(data?: any): Object;
    getJid(username: string, host: string, resource: string): string;
    getNodeJid(jid: string): string;
    getUniqueId(suffix: string): string;
    generateID(): string;
    parseXml(xml: HTMLElement, arrayTags?: [string] | undefined): any;
    hashCode(s: string): number;
    iso8601toDate(date: string): Date;
};
export default _default;
