import { Document } from "../Document/Document.i";
import {
    default as RulesInterface,
    BlockConfigType,
    StringConfigType,
    translatedBlock,
    parser,
} from "./Rules.i";

export default class Rules implements RulesInterface {
    private desc: BlockConfigType["desc"];
    private defaultCase: BlockConfigType["defaultCase"];
    private strConverters: StringConfigType;

    preprocessor = function (block: string) {
        return block.split(/\n\s*\n/g);
    };

    translater = function (block: string): translatedBlock {
        return { block, translation: false };
    };

    constructor(
        { desc, defaultCase }: BlockConfigType,
        strConfig: StringConfigType
    ) {
        this.desc = desc;
        this.defaultCase = defaultCase;
        this.strConverters = strConfig;
    }

    preprocess(doc: Document): string[] {
        return this.preprocessor(doc.getContent());
    }

    getTranslation(block: string) {
        return this.translater(block);
    }

    getBlockConverter(block: string) {
        const possibleConverters = this.desc.filter(function ({ test }) {
            return test.test(block);
        });
        if (possibleConverters.length > 1) {
            throw new Error("Multiple converters for block " + block);
        }
        const output: parser =
            possibleConverters.length === 0
                ? {
                      mask: /(?:)/,
                      replace: this.defaultCase,
                  }
                : {
                      mask: possibleConverters[0].test,
                      replace: possibleConverters[0].callback,
                  };
        if (
            possibleConverters.length > 0 &&
            possibleConverters[0].saveTranslation
        ) {
            output.storeTranslation = possibleConverters[0].saveTranslation;
        }
        return output;
    }

    getStringConverters() {
        return this.strConverters.map(function ({ test, callback }) {
            return { mask: test, replace: callback };
        });
    }
}
