"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Document {
    constructor(content) {
        this.rawContent = content.trim();
    }
    getBlocks() {
        return this.rawContent
            .split(/(?:\n[\s]*\n)+/)
            .filter((block) => block.length > 0)
            .map((block) => block.replace("\n", " "));
    }
    getEveryWords() {
        return this.rawContent
            .split(/[^\wáéíóúæǽœ]+/i)
            .filter((w) => w.length > 1 && !/\d|_/.test(w))
            .map((w) => w.toLowerCase())
            .reduce(function (acc, word) {
            return acc.includes(word) ? acc : [...acc, word];
        }, []);
    }
}
exports.default = Document;
