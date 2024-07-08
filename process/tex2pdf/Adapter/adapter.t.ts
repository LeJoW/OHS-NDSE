import { PsalmIndex } from "../../md2tex/config/PsalmIndex";
import { Table } from "../../md2tex/config/Table";
import { TableOfContents } from "../../md2tex/Abstract/TableOfContents";
import { Cantus } from "../../md2tex/Abstract/Catnus";
import { Psalmus } from "../../md2tex/Abstract/Psalterium";

export type adapterType = {
    blocks: {
        makeDayTite: (
            title: string,
            dayClass: string | null,
            short: string
        ) => string;
        makeOfficeTitle: (title: string, short: string) => string;
        makeSectionTitle: (title: string) => string;
        makePsalmTitle: (title: string) => string;
        makeChapterTitle: (title: string, addendum: string | null) => string;

        makeRubric: (content: string) => string;
        makeReplace: (content: string) => string;
        makeLesson: (content: string) => string;
        paragraphStd: (content: string) => string;

        makeChant: (file: string, anchor?: string) => string;
        makePsalterium: (
            intonation: Cantus | false,
            psalms: Psalmus[]
        ) => string;

        makePsalmsIndex: (psIndex: PsalmIndex) => string;
        makeGregIndex: (table: Table) => string;
        makeTableOfContents: (table: TableOfContents) => string;

        setAnchor: (anchor: string) => string;
        join: (elements: (string | undefined)[]) => string;
        error: (msg: string) => string;
    };
    strings: {
        replaceSymbols: (symbol: string) => string;
        replaceChars: (char: string) => string;

        italic: (text: string) => string;
        bold: (text: string) => string;
        romain: (text: string) => string;

        starSymbol: string;
        cruxSymbol: string;
    };
};
