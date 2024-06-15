import fs from "fs";

export interface System {
    isDir(path: string): boolean;
    getFileName(file: string): string;
    getFileRelativeHierarchy(file: string): string;
    createRelativeHierarchy(parentDir: string, relativeHierarchy: string): void;
    exec(cmd: string): boolean;
}

export class NotADirError implements Error {
    name: string;
    message: string;

    constructor(path: string) {
        this.message = `Cannot find directory '${path}'`;
    }
}
