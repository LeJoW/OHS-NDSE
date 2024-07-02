import { PsalmIndex } from "../../md2tex/config/PsalmIndex";
import { Table } from "../../md2tex/config/Table";
import { TableOfContents } from "../../md2tex/config/TableOfContents";

export type adapterType = {
    blocks: {
        makeDayTite: (title: string, dayClass: string, short: string) => string;
        makeOfficeTitle: (
            title: string,
            short: string,
            anchor: string
        ) => string;
        makeSectionTitle: (title: string) => string;
        makeChapterTitle: (title: string, addendum: string) => string;

        makeRubric: (content: string) => string;
        makeReplace: (content: string) => string;
        makeLesson: (content: string) => string;
        paragraphStd: (content: string) => string;

        makeChant: (file: string, anchor?: string) => string;
        makePsalm: (
            intonation: string | false,
            psalm: string[],
            anchor: string
        ) => string;

        makePsalmsIndex: (psIndex: PsalmIndex) => string;
        makeGregIndex: (table: Table) => string;
        makeTableOfContents: (table: TableOfContents) => string;

        error: (msg: string) => string;
    };
    strings: {
        replaceSymbols: (symbol: string) => string;

        italic: (text: string) => string;
        bold: (text: string) => string;

        starSymbol: string;
        cruxSymbol: string;
    };
};
