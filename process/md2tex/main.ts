import { readFile, writeFileSync } from "fs";

import blockConfig from "./config/blocks";
import strConfig from "./config/strings";
import Document from "./Document/Document";
import Engine from "./Engine/Engine";
import Parser from "./Parser/Parser";
import { Adapter } from "../tex2pdf/Adapter/Adapter";

import { Command } from "commander";
const program = new Command();

function parse(input: string, output: string, wordsOutput: string) {
    readFile(input, { encoding: "utf-8" }, function (err, data: string) {
        const doc = new Document(data);
        const adapter = new Adapter();
        const engine = new Engine(blockConfig(adapter), strConfig(adapter));
        const parser = new Parser(engine);

        const parsed = parser.parse(doc);
        const words = doc.getEveryWords();

        writeFileSync(output, parsed);
        writeFileSync(wordsOutput, words.join("\n"));
    });
}

program
    .command("parse")
    .argument("<string>", "path to input file")
    .option("-o, --output <string>", "path to output file")
    .option("-w, --words <string>", "path to output file for input words list")
    .action(function (input, options) {
        parse(input, options.output, options.words);
    });

program.parse();
