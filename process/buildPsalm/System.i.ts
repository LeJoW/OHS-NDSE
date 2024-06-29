export interface System {
    readJSON(file: string): any;
    writeJSON(file: string, data: any): boolean;
}
