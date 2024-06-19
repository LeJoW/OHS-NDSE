export interface Adapter {
    makeDayTite: (title: string, dayClass: string, short: string) => string;
    makeOfficeTitle: (title: string, short: string) => string;
    makeSectionTitle: (title: string) => string;
    makeChapterTitle: (title: string, addendum: string) => string;

    makeRubric: (content: string) => string;
    makeReplace: (content: string) => string;
    makeLesson: (content: string) => string;
    paragraphStd: (content: string) => string;

    makeChant: (file: string, style: string) => string;
    makePs: (antiphon: { file: string; style: string }, ps: string[]) => string;

    replaceUnreadeableChar: (char: string) => string;
    replaceSymbols: (symbol: string) => string;
}
