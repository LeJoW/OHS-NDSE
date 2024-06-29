"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const blocks_1 = __importDefault(require("./config/blocks"));
const strings_1 = __importDefault(require("./config/strings"));
const Document_1 = __importDefault(require("./Document/Document"));
const Engine_1 = __importDefault(require("./Engine/Engine"));
const Parser_1 = __importDefault(require("./Parser/Parser"));
const adapter_1 = require("../tex2pdf/adapter/adapter");
const commander_1 = require("commander");
const PsalmBuilder_1 = require("../buildPsalm/PsalmBuilder");
const Syllabifier_1 = require("../buildPsalm/Syllabifier");
const PsalmList_1 = require("../buildPsalm/PsalmList");
const PsalmCache_1 = require("../buildPsalm/PsalmCache");
const System_1 = require("../buildPsalm/System");
const program = new commander_1.Command();
function parse(input, output, wordsOutput) {
    (0, fs_1.readFile)(input, { encoding: "utf-8" }, function (err, data) {
        const doc = new Document_1.default(data);
        const system = new System_1.System();
        const psalmBuilder = new PsalmBuilder_1.PsalmBuilder(new Syllabifier_1.Syllabifier("tex2pdf/hyphen/hyph_la_VA.dic"), adapter_1.adapter, new PsalmList_1.PsalmList("buildPsalm/psalms", system), new PsalmCache_1.PsalmCache("buildPsalm/cache", system));
        const engine = new Engine_1.default((0, blocks_1.default)(adapter_1.adapter, psalmBuilder), (0, strings_1.default)(adapter_1.adapter));
        const parser = new Parser_1.default(engine);
        const parsed = parser.parse(doc);
        //const words = doc.getEveryWords();
        (0, fs_1.writeFileSync)(output, parsed);
        //writeFileSync(wordsOutput, words.join("\n"));
    });
}
program
    .command("parse")
    .argument("<string>", "path to input file")
    .option("-o, --output <string>", "path to output file")
    //.option("-w, --words <string>", "path to output file for input words list")
    .action(function (input, options) {
    parse(input, options.output, options.words);
});
program.parse();
