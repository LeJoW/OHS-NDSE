import { Document as DocumentInterface } from "./Document.i";

export class Document implements DocumentInterface {
    protected rawContent: string;

    constructor(content: string) {
        this.rawContent = content.trim();
    }

    getContent(): string {
        return this.rawContent.trim();
    }
}
