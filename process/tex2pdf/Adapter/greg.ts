import { adapterType } from "./adapter.t";
import { existsSync } from "fs";

import { paragraphLettrine } from "./paragraphs";
import { Cantus } from "../../md2tex/Abstract/Catnus";
import { Psalmus } from "../../md2tex/Abstract/Psalterium";
import { adapter } from "./adapter";

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

const makePsalm = function (
    title: string | false,
    intonation: string | false,
    psalm: string[],
    anchor: string
) {
    const outTitle = title ? `\\psalmTitle{${title}}` : "";
    const output = [`\\label{${anchor}}\\begin{psalm}`];
    if (intonation) {
        output.push(outTitle, makeChant(intonation), "\\begin{psalmBody}");
    } else {
        output.push("\\begin{psalmBody}", outTitle, printIntonation(psalm[0]));
    }
    output.push(printPsalm(psalm.slice(1)), "\\end{psalmBody}", "\\end{psalm}");
    return output.join("\n");
};

export { makeChant };

export function makePsalterium(intonation: Cantus | false, psalms: Psalmus[]) {
    return adapter.blocks.join(
        psalms.map((psalm, index) =>
            makePsalm(
                psalm.title,
                index === 0 && intonation ? intonation.scorePath : false,
                psalm.versi,
                psalm.anchor
            )
        )
    );
}
