import { default as DocumentInterface } from "./Document.i";

export default class Document implements DocumentInterface {
    protected rawContent: string;

    constructor(content: string) {
        this.rawContent = content.trim();
    }

    public getBlocks(): string[] {
        return this.rawContent
            .split(/(?:\n[\s]*\n)+/)
            .filter((block) => block.length > 0)
            .map((block) => block.replace("\n", " "));
    }
}
