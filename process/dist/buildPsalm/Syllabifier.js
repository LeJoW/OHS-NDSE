"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Syllabifier = void 0;
const child_process_1 = require("child_process");
class Syllabifier {
    constructor(dicPath) {
        this.hyphenateWord = function (word) {
            return (0, child_process_1.execSync)(`echo "${word}" | example ${dicPath} /dev/stdin`)
                .toString()
                .trim();
        };
    }
    getSyllabsOf(sentence) {
        let scanIndex = 0;
        return sentence
            .replace(/([\wáéíóúǽæœ́œ]+)/gi, (_, word) => this.hyphenateWord(word))
            .replace(/\s/g, " =")
            .split("=")
            .map(function (syllab) {
            const newScanIndex = scanIndex + syllab.length;
            const output = sentence.slice(scanIndex, newScanIndex);
            scanIndex = newScanIndex;
            return output;
        });
    }
}
exports.Syllabifier = Syllabifier;
