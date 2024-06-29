import { readFile, writeFileSync } from "fs";

import blockConfig from "./config/blocks";
import strConfig from "./config/strings";
import Document from "./Document/Document";
import Engine from "./Engine/Engine";
import Parser from "./Parser/Parser";
import { adapter } from "../tex2pdf/adapter/adapter";

import { Command } from "commander";
import { PsalmBuilder } from "../buildPsalm/PsalmBuilder";
import { Syllabifier } from "../buildPsalm/Syllabifier";
import { PsalmList } from "../buildPsalm/PsalmList";
import { PsalmCache } from "../buildPsalm/PsalmCache";
import { System } from "../buildPsalm/System";
const program = new Command();

function parse(input: string, output: string, wordsOutput: string) {
    readFile(input, { encoding: "utf-8" }, function (err, data: string) {
        const doc = new Document(data);
        const system = new System();
        const psalmBuilder = new PsalmBuilder(
            new Syllabifier("tex2pdf/hyphen/hyph_la_VA.dic"),
            adapter,
            new PsalmList("buildPsalm/psalms", system),
            new PsalmCache("buildPsalm/cache", system)
        );
        const engine = new Engine(
            blockConfig(adapter, psalmBuilder),
            strConfig(adapter)
        );
        const parser = new Parser(engine);

        const parsed = parser.parse(doc);
        //const words = doc.getEveryWords();

        writeFileSync(output, parsed);
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
