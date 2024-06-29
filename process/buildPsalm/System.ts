import { System as SystemInterface } from "./System.i";
import { readFileSync, writeFileSync } from "fs";

export class System implements SystemInterface {
    readJSON(file: string) {
        return JSON.parse(readFileSync(file).toString());
    }
    writeJSON(file: string, data: any): boolean {
        try {
            writeFileSync(file, JSON.stringify(data));
        } catch (e) {}
        return false;
    }
}
