import { adapterType } from "../../tex2pdf/adapter/adapter.t";
import { Document } from "../Document/Document.i";
import Rules from "../Rules/Rules.i";

export default class Parser {
    private rules: Rules;
    private adapter: adapterType;
    enableTranslation: boolean = false;

    constructor(rules: Rules, adapter: adapterType) {
        this.rules = rules;
        this.adapter = adapter;
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
                    return element.toString(
                        this.adapter,
                        this.enableTranslation
                    );
                });
            })
            .join("\n\n");
    }
}
