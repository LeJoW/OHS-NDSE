import { Document } from "../Document/Document.i";
import { GenericElement } from "../Types/GenericElement.i";

type matchCallback = (mask: string, ...input: string[]) => GenericElement;
type replaceCallback = (mask: string, ...input: string[]) => string;

export type translatedBlock = {
    block: string;
    translation: string | false;
};

export type parser = {
    mask: RegExp;
    replace: matchCallback;
    storeTranslation?: (element: GenericElement, translation: string) => void;
};
type converter = { mask: RegExp; replace: replaceCallback };

export type BlockConfigType = {
    desc: {
        test: RegExp;
        callback: matchCallback;
        saveTranslation?: parser["storeTranslation"];
    }[];
    defaultCase: matchCallback;
};

export type StringConfigType = { test: RegExp; callback: replaceCallback }[];

export interface Rules {
    preprocessor: (block: string) => string[];
    translater: (block: string) => translatedBlock;

    getBlockConverter(block: string): parser;
    getStringConverters(): converter[];
    preprocess(doc: Document): string[];
    getTranslation(block: string): translatedBlock;
}
