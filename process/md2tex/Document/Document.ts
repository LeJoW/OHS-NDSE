import { default as DocumentInterface } from "./Document.i";

export default class Document implements DocumentInterface {
    protected rawContent: string;

    constructor(content: string) {
        this.rawContent = content.trim();
    }

    getBlocks(): string[] {
        return this.rawContent
            .split(/(?:\n[\s]*\n)+/)
            .filter((block) => block.length > 0)
            .map((block) => block.replace("\n", " "));
    }

    getEveryWords(): string[] {
        return this.rawContent
            .split(/[^\wáéíóúæǽœ]+/i)
            .filter((w) => w.length > 1 && !/\d|_/.test(w))
            .map((w) => w.toLowerCase())
            .reduce(function (acc: string[], word: string) {
                return acc.includes(word) ? acc : [...acc, word];
            }, []);
    }
}
