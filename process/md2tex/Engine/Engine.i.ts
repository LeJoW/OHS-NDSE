type replaceCallback = (mask: string, ...input: string[]) => string;

export type BlockConfigType = {
    desc: { test: RegExp; callback: replaceCallback }[];
    defaultCase: replaceCallback;
};

export type StringConfigType = { test: RegExp; callback: replaceCallback }[];

type converter = { mask: RegExp; replace: replaceCallback };

export default interface Engine {
    getBlockConverter(block: string): converter;
    getStringConverter(): converter[];
}
