import { adapterType } from "./adapter.t";
import { existsSync } from "fs";

import { paragraphLettrine } from "./paragraphs";

type blocks = adapterType["blocks"];

const makeChant: blocks["makeChant"] = function (file, anchor = undefined) {
    const pdfInput = `../content/gabc/build/${file}.pdf`;
    if (!existsSync(pdfInput)) {
        return `Cannot find file \\verb|${file}|`;
    }
    return (anchor ? `\\label{${anchor}}` : "") + `\\gabc{../${pdfInput}}`;
};

function printIntonation(verse: string): string {
    return [
        "\\begin{intonation}",
        paragraphLettrine(verse),
        "\\end{intonation}",
    ].join("\n");
}

function printPsalm(verses: string[]): string {
    return [
        "\\begin{verses}",
        ...verses.map(function (verse) {
            return `\\item ${verse}`;
        }),
        "\\end{verses}",
    ].join("\n");
}

const makePsalm: blocks["makePsalm"] = function (intonation, psalm, anchor) {
    return [
        `\\label{${anchor}}\\begin{psalm}`,
        intonation ? makeChant(intonation) : printIntonation(psalm[0]),
        printPsalm(psalm.slice(1)),
        "\\end{psalm}",
    ].join("\n");
};

export { makeChant, makePsalm };
