import fs from "fs";
import process from "child_process";
import { join, dirname, resolve } from "path";
import { tmpdir } from "node:os";

import { System as SystemInterface } from "./System.i";

export class System implements SystemInterface {
    tmp: string;

    constructor() {
        this.tmp = fs.mkdtempSync(join(tmpdir(), "ohs-"));
    }

    isDir(path: string): boolean {
        return fs.existsSync(path) && fs.statSync(path).isDirectory();
    }

    getFileName(file: string): string {
        return file.split("/").pop() || "";
    }

    getFileRelativeHierarchy(file: string): string {
        return file.split("/").slice(0, -1).join("/");
    }

    createRelativeHierarchy(
        parentDir: string,
        relativeHierarchy: string
    ): void {
        const dirToCreate = `${parentDir}/${relativeHierarchy}`;
        if (!fs.existsSync(dirToCreate)) {
            fs.mkdirSync(dirToCreate, { recursive: true });
        }
    }

    parentDir(path: string): string {
        return resolve(dirname(path));
    }
    getAbsolutePath(path: string): string {
        return resolve(path);
    }

    exec(cmd: string): boolean {
        try {
            process.execSync(cmd);
            return true;
        } catch (error) {}
        return false;
    }

    fileExists(path: string): boolean {
        return fs.existsSync(path);
    }
}
