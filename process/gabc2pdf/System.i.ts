export interface System {
    tmp: string;

    isDir(path: string): boolean;
    getFileName(file: string): string;
    getFileRelativeHierarchy(file: string): string;
    createRelativeHierarchy(parentDir: string, relativeHierarchy: string): void;
    exec(cmd: string): boolean;
    fileExists(path: string): boolean;
    parentDir(path: string): string;
    getAbsolutePath(path: string): string;
}

export class NotADirError implements Error {
    name: string;
    message: string;

    constructor(path: string) {
        this.name = "DirectoryError";
        this.message = `Cannot find directory '${path}'`;
    }
}
