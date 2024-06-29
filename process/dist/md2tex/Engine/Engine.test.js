"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Engine_1 = __importDefault(require("./Engine"));
test("block-operators", function () {
    function replaceDefault(input) {
        return input;
    }
    const titleReplace = replaceDefault;
    function accentReplace(_) {
        return "\\'e";
    }
    const engine = new Engine_1.default({
        desc: [{ test: /^#+/, callback: titleReplace }],
        defaultCase: replaceDefault,
    }, [{ test: /(é)/, callback: accentReplace }]);
    expect(engine.getBlockConverter("Lambda text")).toStrictEqual({
        mask: /(?:)/,
        replace: replaceDefault,
    });
    expect(engine.getBlockConverter("# Title text")).toStrictEqual({
        mask: /^#+/,
        replace: titleReplace,
    });
    expect(engine.getStringConverter()).toStrictEqual([
        {
            mask: /(é)/,
            replace: accentReplace,
        },
    ]);
});
