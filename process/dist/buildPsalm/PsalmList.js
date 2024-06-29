"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PsalmList = void 0;
class PsalmList {
    constructor(path, system) {
        this.doxologie = [
            ["Glória Patri, et Fílio,", "et Spirítui Sancto."],
            [
                "Sicut erat in princípio, et nunc, et semper,",
                "et in sǽcula sæculórum. Amen.",
            ],
        ];
        this.path = path;
        this.system = system;
    }
    getPsalm(psalmDivision) {
        let psalm;
        try {
            psalm = this.system.readJSON(`${this.path}/${psalmDivision}.json`);
        }
        catch (error) {
            throw new Error(`The psalm ${psalmDivision} is not stored`);
        }
        return [...psalm, ...this.doxologie];
    }
}
exports.PsalmList = PsalmList;
