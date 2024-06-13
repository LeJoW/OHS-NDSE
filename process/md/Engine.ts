import {
    default as EngineInterface,
    BlockConfigType,
    StringConfigType,
} from "./Engine.i";

export default class Engine implements EngineInterface {
    private desc: BlockConfigType["desc"];
    private defaultCase: BlockConfigType["defaultCase"];
    private strConverters: StringConfigType;

    constructor(
        { desc, defaultCase }: BlockConfigType,
        strConfig: StringConfigType
    ) {
        this.desc = desc;
        this.defaultCase = defaultCase;
        this.strConverters = strConfig;
    }

    getBlockConverter(block: string) {
        const possibleConverters = this.desc.filter(function ({ test }) {
            return test.test(block);
        });
        if (possibleConverters.length > 1) {
            throw new Error("Multiple converters for block " + block);
        }
        return possibleConverters.length === 0
            ? { mask: /(?:)/, replace: this.defaultCase }
            : {
                  mask: possibleConverters[0].test,
                  replace: possibleConverters[0].callback,
              };
    }

    getStringConverter() {
        return this.strConverters.map(function ({ test, callback }) {
            return { mask: test, replace: callback };
        });
    }
}
