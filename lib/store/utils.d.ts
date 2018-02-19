export declare function isArray(res: any): boolean;
export declare function camelize(str: string): string;
export declare function processMap(data: {
    [key: string]: any;
}): {
    [key: string]: any;
};
export declare function fromCamelCase(data?: any): Object;
export declare function getJid(username: string, host: string, resource: string): string;
export declare function getNodeJid(jid: string): string;
/** Function: getUniqueId
 *  Generate a unique ID for use in <iq/> elements.
 *
 *  All <iq/> stanzas are required to have unique id attributes.  This
 *  function makes creating these easy.  Each connection instance has
 *  a counter which starts from zero, and the value of this counter
 *  plus a colon followed by the suffix becomes the unique id. If no
 *  suffix is supplied, the counter is used as the unique id.
 *
 *  Suffixes are used to make debugging easier when reading the stream
 *  data, and their use is recommended.  The counter resets to 0 for
 *  every new connection for the same reason.  For connections to the
 *  same server that authenticate the same way, all the ids should be
 *  the same, which makes it easy to see changes.  This is useful for
 *  automated testing as well.
 *
 *  Parameters:
 *    (String) suffix - A optional suffix to append to the id.
 *
 *  Returns:
 *    A unique string to be used for the id attribute.
 */
export declare function getUniqueId(suffix: string): string;
export declare function generateID(): string;
export declare function parseXml(xml: HTMLElement, arrayTags?: [string]): any;
export declare function hashCode(s: string): number;
export declare function iso8601toDate(date: string): Date;
