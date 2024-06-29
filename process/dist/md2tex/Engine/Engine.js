"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Engine {
    constructor({ desc, defaultCase }, strConfig) {
        this.desc = desc;
        this.defaultCase = defaultCase;
        this.strConverters = strConfig;
    }
    getBlockConverter(block) {
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
exports.default = Engine;
