import Document from "./Document.i";
import Engine from "./Engine.i";

export default class Parser {
    private engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    parseBlocks(doc: Document) {
        return doc.getBlocks().map((block: string) => {
            const { mask, replace } = this.engine.getBlockConverter(block);
            return { block, mask, replace };
        });
    }

    parseString(input: string): string {
        return this.engine
            .getStringConverter()
            .reduce(function (acc: string, { mask, replace }): string {
                return acc.replace(mask, replace);
            }, input);
    }

    parse(doc: Document): string {
        return this.parseBlocks(doc)
            .map(({ block, mask, replace }) => {
                return this.parseString(block).replace(mask, function (
                    m,
                    ...params
                ) {
                    return replace(m, ...params);
                });
            })
            .join("\n\n");
    }
}
