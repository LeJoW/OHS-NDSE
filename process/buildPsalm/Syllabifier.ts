import { execSync } from "child_process";
import { Syllabifier as SyllabifierInterface } from "./Syllabifier.i";

export class Syllabifier implements SyllabifierInterface {
    hyphenateWord: (word: string) => string;

    constructor(dicPath: string) {
        this.hyphenateWord = function (word) {
            return execSync(`echo "${word}" | example ${dicPath} /dev/stdin`)
                .toString()
                .trim();
        };
    }

    getSyllabsOf(sentence: string): string[] {
        let scanIndex = 0;
        return sentence
            .replace(/([\wáéíóúǽæœ́œ]+)/gi, (_, word) =>
                this.hyphenateWord(word)
            )
            .replace(/\s/g, " =")
            .split("=")
            .map(function (syllab) {
                const newScanIndex = scanIndex + syllab.length;
                const output = sentence.slice(scanIndex, newScanIndex);
                scanIndex = newScanIndex;
                return output;
            })
            .reduce(function (acc: string[], syllab): string[] {
                if (!/[a-záéíóúǽæœ́œ]/i.test(syllab) && acc.length > 0) {
                    acc[acc.length - 1] += syllab;
                    return acc;
                }
                return [...acc, syllab];
            }, []);
    }
}
