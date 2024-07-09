import { readFile, writeFileSync, readFileSync } from "fs";
import { dirname } from "path";

import blockConfig from "./config/blocks";
import strConfig from "./config/strings";
import { Document } from "./Document/Document";
import Engine from "./Rules/Rules";
import Parser from "./Parser/Parser";
import { adapter } from "../tex2pdf/adapter/adapter";

import { Command } from "commander";
import { PsalmBuilder } from "../buildPsalm/PsalmBuilder";
import { Syllabifier } from "../buildPsalm/Syllabifier";
import { PsalmList } from "../buildPsalm/PsalmList";
import { PsalmCache } from "../buildPsalm/PsalmCache";
import { System } from "../buildPsalm/System";
import { preprocess } from "./config/preprocess";
import { translate } from "./config/translation";

const program = new Command();
const system = new System();
const psalmBuilder = new PsalmBuilder(
    new Syllabifier("tex2pdf/hyphen/hyph_la_VA_all.dic"),
    adapter,
    new PsalmList("buildPsalm/psalms", system),
    new PsalmCache("buildPsalm/cache", system)
);
const engine = new Engine(
    blockConfig(adapter, psalmBuilder),
    strConfig(adapter)
);
engine.preprocessor = preprocess;
engine.translater = translate;
const parser = new Parser(engine, adapter);

function parse(input: string, translation: boolean, output: string) {
    parser.enableTranslation = translation;
    readFile(input, { encoding: "utf-8" }, function (err, list: string) {
        const dir = dirname(input);
        const outputTex = list
            .split("\n")
            .map(function (item: string) {
                const file = item.trim();
                if (file.length > 0) {
                    try {
                        const content = readFileSync(
                            `${dir}/${file}`
                        ).toString();
                        const doc = new Document(content);
                        return parser.parse(doc);
                    } catch (e) {}
                }
            })
            .join("\n\n");
        writeFileSync(output, outputTex);
    });
}

program
    .command("parse")
    .argument("<string>", "path to input file list")
    .option("-t", "enable translate mode")
    .option("-o, --output <string>", "path to output file")
    .action(function (input, options) {
        parse(input, options.t || false, options.output);
    });

program.parse();
