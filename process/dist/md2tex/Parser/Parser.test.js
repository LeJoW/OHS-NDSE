"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = __importDefault(require("./Parser"));
const Document_1 = __importDefault(require("../Document/Document"));
const Engine_1 = __importDefault(require("../Engine/Engine"));
const content = `Nothing to see *here*.
But set a title :

# Fancy title
`;
test("", function () {
    const id = (b) => "std: " + b;
    const title = (_, b) => "title: " + b;
    const engine = new Engine_1.default({
        desc: [{ test: /^#+\s*(.+)$/, callback: title }],
        defaultCase: id,
    }, [
        {
            test: /([éá])/g,
            callback: function (_, c) {
                const chars = {
                    é: "e",
                    á: "a",
                };
                return "\\'" + chars[c];
            },
        },
        {
            test: /\*([\S\s]+)\*/g,
            callback: function (_, text) {
                return `{\\it ${text}}`;
            },
        },
    ]);
    const doc = new Document_1.default(content);
    const parser = new Parser_1.default(engine);
    expect(parser.parseBlocks(doc)).toStrictEqual([
        {
            block: "Nothing to see *here*. But set a title :",
            mask: /(?:)/,
            replace: id,
        },
        { block: "# Fancy title", mask: /^#+\s*(.+)$/, replace: title },
    ]);
    expect(parser.parseString("é")).toStrictEqual("\\'e");
    expect(parser.parseString("á")).toStrictEqual("\\'a");
    expect(parser.parseString("á et é")).toStrictEqual("\\'a et \\'e");
    expect(parser.parseString("á *et* é")).toStrictEqual("\\'a {\\it et} \\'e");
    expect(parser.parse(doc))
        .toStrictEqual(`std: Nothing to see {\\it here}. But set a title :

title: Fancy title`);
});
