"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PsalmCache = void 0;
class PsalmCache {
    constructor(path, system) {
        this.path = path;
        this.system = system;
    }
    setPsalmBuild(psalmDivision, ton, psalm) {
        return this.system.writeJSON(this.nameFromPsalmInfo(psalmDivision, ton), psalm);
    }
    getPsalmBuild(psalmDivision, ton) {
        try {
            return this.system.readJSON(this.nameFromPsalmInfo(psalmDivision, ton));
        }
        catch (e) { }
        return false;
    }
    nameFromPsalmInfo(psalmDivision, ton) {
        return `${this.path}/${psalmDivision}-${ton}.json`;
    }
}
exports.PsalmCache = PsalmCache;
