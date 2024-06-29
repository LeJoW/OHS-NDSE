import { PsalmCache as PsalmCacheInterface } from "./PsalmCache.i";
import { System } from "./System.i";

export class PsalmCache implements PsalmCacheInterface {
    path: string;
    system: System;

    constructor(path: string, system: System) {
        this.path = path;
        this.system = system;
    }

    setPsalmBuild(
        psalmDivision: string,
        ton: string,
        psalm: string[]
    ): boolean {
        return this.system.writeJSON(
            this.nameFromPsalmInfo(psalmDivision, ton),
            psalm
        );
    }
    getPsalmBuild(psalmDivision: string, ton: string): false | string[] {
        try {
            return this.system.readJSON(
                this.nameFromPsalmInfo(psalmDivision, ton)
            );
        } catch (e) {}
        return false;
    }

    private nameFromPsalmInfo(psalmDivision: string, ton: string): string {
        return `${this.path}/${psalmDivision}-${ton}.json`;
    }
}
