import { readFile } from "fs";

import blockConfig from "./config/blocks";
import strConfig from "./config/strings";
import Document from "./Document/Document";
import Engine from "./Engine/Engine";
import Parser from "./Parser/Parser";

const [exec, script, inputFile] = process.argv;

if (inputFile) {
    readFile(inputFile, { encoding: "utf-8" }, function (err, data: string) {
        const doc = new Document(data);
        const engine = new Engine(blockConfig, strConfig);
        const parser = new Parser(engine);

        console.log(parser.parse(doc));
    });
}
