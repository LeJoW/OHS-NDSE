import { Document } from "../Document/Document.i";
import { Adapter } from "../Adapter/Adapter.i";
import { Rules } from "../Rules/Rules.i";
import { GenericElement } from "../Types/GenericElement.i";

export default class Parser {
    private rules: Rules;
    private adapter: Adapter;
    enableTranslation: boolean = false;

    constructor(rules: Rules, adapter: Adapter) {
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
                mask,
                replace,
                parseTranslation:
                    storeTranslation && translation
                        ? function (element: GenericElement) {
                              return storeTranslation(
                                  element,
                                  translation,
                                  mask
                              );
                          }
                        : undefined,
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
        this.adapter.translation = this.enableTranslation;
        return this.parseBlocks(doc)
            .map(({ block, mask, replace, parseTranslation }) => {
                return this.parseString(block).replace(mask, (...params) => {
                    const element = replace(...params);
                    if (parseTranslation) parseTranslation(element);
                    return this.adapter.render(element);
                });
            })
            .join("\n\n");
    }
}
