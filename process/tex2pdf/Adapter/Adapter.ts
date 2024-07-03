import { adapterType } from "./adapter.t";
import {
    makeChapterTitle,
    makeDayTite,
    makeOfficeTitle,
    makeSectionTitle,
    makePsalmTitle,
} from "./titles";
import {
    makeLesson,
    makeReplace,
    makeRubric,
    paragraphStd,
} from "./paragraphs";
import { makeChant, makePsalm } from "./greg";
import {
    cruxSymbol,
    replaceSymbols,
    replaceChars,
    starSymbol,
    italic,
    bold,
    romain,
} from "./strings";
import { makeTableOfContents, makePsalmsIndex, makeGregIndex } from "./tables";

export const adapter: adapterType = {
    blocks: {
        makeDayTite,
        makeOfficeTitle,
        makeSectionTitle,
        makeChapterTitle,
        makePsalmTitle,
        makeRubric,
        makeReplace,
        makeLesson,
        paragraphStd,
        makeChant,
        makePsalm,
        makeTableOfContents,
        makePsalmsIndex,
        makeGregIndex,

        error(msg) {
            return `\\begin{verbatim}${msg}\\end{verbatim}`;
        },
    },
    strings: {
        replaceChars,
        replaceSymbols,
        italic,
        bold,
        romain,
        starSymbol,
        cruxSymbol,
    },
};
