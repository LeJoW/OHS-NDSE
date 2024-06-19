import { Adapter as AdapterInterface } from "./Adapter.i";
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
import { buildChant, buildPsalterium } from "./greg";
import { replaceSymbols, replaceUnreadeableChar } from "./strings";

export class Adapter implements AdapterInterface {
    makeDayTite = makeDayTite;
    makeOfficeTitle = makeOfficeTitle;
    makeSectionTitle = makeSectionTitle;
    makeChapterTitle = makeChapterTitle;

    makeRubric = makeRubric;
    makeReplace = makeReplace;
    makeLesson = makeLesson;
    paragraphStd = paragraphStd;

    makeChant = buildChant;
    makePs = buildPsalterium;

    replaceUnreadeableChar = replaceUnreadeableChar;
    replaceSymbols = replaceSymbols;
}
