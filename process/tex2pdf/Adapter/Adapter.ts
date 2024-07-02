import { adapterType } from "./adapter.t";
import {
    makeChapterTitle,
    makeDayTite,
    makeOfficeTitle,
    makeSectionTitle,
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
    starSymbol,
    italic,
    bold,
} from "./strings";
import { makeTableOfContents, makePsalmsIndex } from "./tables";

export const adapter: adapterType = {
    blocks: {
        makeDayTite,
        makeOfficeTitle,
        makeSectionTitle,
        makeChapterTitle,
        makeRubric,
        makeReplace,
        makeLesson,
        paragraphStd,
        makeChant,
        makePsalm,
        makeTableOfContents,
        makePsalmsIndex,

        error(msg) {
            return `\\begin{verbatim}${msg}\\end{verbatim}`;
        },
    },
    strings: {
        replaceSymbols,
        italic,
        bold,
        starSymbol,
        cruxSymbol,
    },
};
