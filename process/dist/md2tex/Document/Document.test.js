"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Document_1 = __importDefault(require("./Document"));
const content = `Nothing to see here.
But set a title :
    
# Fancy title`;
test("blocks", function () {
    expect(new Document_1.default(content).getBlocks()).toStrictEqual([
        "Nothing to see here. But set a title :",
        "# Fancy title",
    ]);
    expect(new Document_1.default(content).getEveryWords()).toStrictEqual([
        "nothing",
        "to",
        "see",
        "here",
        "but",
        "set",
        "title",
        "fancy",
    ]);
    expect(new Document_1.default("Deus, in adiutórium meum inténde.").getEveryWords()).toStrictEqual(["deus", "in", "adiutórium", "meum", "inténde"]);
    expect(new Document_1.default("Ástitit regína a dextris tuis.").getEveryWords()).toStrictEqual(["ástitit", "regína", "dextris", "tuis"]);
    expect(new Document_1.default("et in sǽcula sæculórum. Amen.").getEveryWords()).toStrictEqual(["et", "in", "sǽcula", "sæculórum", "amen"]);
});
