import { Document } from "../Document/Document.i";
import { Render } from "../Render/Render.i";
import { Rules } from "../Rules/Rules.i";

export default class Parser {
    private rules: Rules;
    private render: Render;
    enableTranslation: boolean = false;

    constructor(rules: Rules, render: Render) {
        this.rules = rules;
        this.render = render;
    }

    parseBlocks(doc: Document) {
        return this.rules.preprocess(doc).map((rawBlock: string) => {
            const { block, translation } = this.rules.getTranslation(rawBlock);
            const {
                mask,
                replace,
                storeTranslation,
            } = this.rules.getBlockConverter(block);
            return {
                block,
                translation,
                mask,
                replace,
                storeTranslation,
            };
        });
    }

    parseString(input: string): string {
        return this.rules
            .getStringConverters()
            .reduce(function (acc: string, { mask, replace }): string {
                return acc.replace(mask, replace);
            }, input);
    }

    parse(doc: Document): string {
        return this.parseBlocks(doc)
            .map(({ block, translation, mask, replace, storeTranslation }) => {
                return this.parseString(block).replace(mask, (...params) => {
                    const element = replace(...params);
                    if (storeTranslation && translation) {
                        storeTranslation(element, translation);
                    }
                    return translation
                        ? element.toStringWithTranslation(this.render)
                        : element.toString(this.render);
                });
            })
            .join("\n\n");
    }
}
