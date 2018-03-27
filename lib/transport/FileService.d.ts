export interface IFileService {
    tempDir: string;
    fileExists(filename: string): Promise<boolean>;
    mkdir(name: string): Promise<void>;
    getImageSize(filename: string): Promise<{
        width: number;
        height: number;
    }>;
    downloadHttpFile(url: string, filename: string, headers: any): Promise<any>;
    removeFile(filename: string): Promise<any>;
}
export declare function upload({method, headers, url, file}: any): Promise<{}>;
