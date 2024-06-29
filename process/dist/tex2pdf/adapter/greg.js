"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePsalm = exports.makeChant = void 0;
const fs_1 = require("fs");
const paragraphs_1 = require("./paragraphs");
const makeChant = function (file) {
    const pdfInput = `../content/gabc/build/${file}.pdf`;
    if (!(0, fs_1.existsSync)(pdfInput)) {
        return `Cannot find file \\verb|${file}|`;
    }
    return `\\gabc{../${pdfInput}}`;
};
exports.makeChant = makeChant;
function printIntonation(verse) {
    return [
        "\\begin{intonation}",
        (0, paragraphs_1.paragraphLettrine)(verse),
        "\\end{intonation}",
    ].join("\n");
}
function printPsalm(verses) {
    return [
        "\\begin{verses}",
        ...verses.map(function (verse) {
            return `\\item ${verse}`;
        }),
        "\\end{verses}",
    ].join("\n");
}
const makePsalm = function (intonation, psalm) {
    return [
        "\\begin{psalm}",
        intonation ? makeChant(intonation) : printIntonation(psalm[0]),
        printPsalm(psalm.slice(1)),
        "\\end{psalm}",
    ].join("\n");
};
exports.makePsalm = makePsalm;
