"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parser {
    constructor(engine) {
        this.engine = engine;
    }
    parseBlocks(doc) {
        return doc.getBlocks().map((block) => {
            const { mask, replace } = this.engine.getBlockConverter(block);
            return { block, mask, replace };
        });
    }
    parseString(input) {
        return this.engine
            .getStringConverter()
            .reduce(function (acc, { mask, replace }) {
            return acc.replace(mask, replace);
        }, input);
    }
    parse(doc) {
        return this.parseBlocks(doc)
            .map(({ block, mask, replace }) => {
            return this.parseString(block).replace(mask, function (m, ...params) {
                return replace(m, ...params);
            });
        })
            .join("\n\n");
    }
}
exports.default = Parser;
