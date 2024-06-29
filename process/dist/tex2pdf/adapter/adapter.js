"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapter = void 0;
const titles_1 = require("./titles");
const paragraphs_1 = require("./paragraphs");
const greg_1 = require("./greg");
const strings_1 = require("./strings");
exports.adapter = {
    blocks: {
        makeDayTite: titles_1.makeDayTite,
        makeOfficeTitle: titles_1.makeOfficeTitle,
        makeSectionTitle: titles_1.makeSectionTitle,
        makeChapterTitle: titles_1.makeChapterTitle,
        makeRubric: paragraphs_1.makeRubric,
        makeReplace: paragraphs_1.makeReplace,
        makeLesson: paragraphs_1.makeLesson,
        paragraphStd: paragraphs_1.paragraphStd,
        makeChant: greg_1.makeChant,
        makePsalm: greg_1.makePsalm,
        error(msg) {
            return `\\begin{verbatim}${msg}\\end{verbatim}`;
        },
    },
    strings: {
        replaceSymbols: strings_1.replaceSymbols,
        italic: strings_1.italic,
        bold: strings_1.bold,
        starSymbol: strings_1.starSymbol,
        cruxSymbol: strings_1.cruxSymbol,
    },
};
