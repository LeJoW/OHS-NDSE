export type adapterType = {
    blocks: {
        makeDayTite: (title: string, dayClass: string, short: string) => string;
        makeOfficeTitle: (title: string, short: string) => string;
        makeSectionTitle: (title: string) => string;
        makeChapterTitle: (title: string, addendum: string) => string;

        makeRubric: (content: string) => string;
        makeReplace: (content: string) => string;
        makeLesson: (content: string) => string;
        paragraphStd: (content: string) => string;

        makeChant: (file: string) => string;
        makePsalm: (intonation: string | false, psalm: string[]) => string;

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
