import { adapter } from "./adapter";
import { existsSync } from "fs";

export function makeChant(file: string) {
    const pdfInput = `../content/gabc/build/${file}.pdf`;
    if (!existsSync(pdfInput)) {
        return adapter.blocks.error(`Cannot find file \\verb|${file}|`);
    }
    return `\\gabc{../${pdfInput}}`;
}

export function psalterium(header: string, body: string) {
    return [
        "\\begin{psalm}",
        header,
        "\\begin{psalmBody}",
        body,
        "\\end{psalmBody}",
        "\\end{psalm}",
    ].join("\n\n");
}

export function psalm(verses: string[]) {
    return [, ...verses, undefined].join("\n\n");
}
