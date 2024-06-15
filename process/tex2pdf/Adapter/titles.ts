import { Adapter } from "./Adapter.i";

const makeDayTite: Adapter["blocks"]["makeDayTite"] = function (
    title,
    dayClass,
    short
) {
    return `\\dayTitle{${title}}{${dayClass}}`;
};

const makeOfficeTitle: Adapter["blocks"]["makeOfficeTitle"] = function (
    title,
    short
) {
    return `\\officeTitle{${title}}`;
};

const makeSectionTitle: Adapter["blocks"]["makeSectionTitle"] = function (
    title
) {
    return `\\sectionTitle{${title}}`;
};

const makeChapterTitle: Adapter["blocks"]["makeChapterTitle"] = function (
    title
) {
    return `\\chapterTitle{${title}}`;
};

export { makeDayTite, makeOfficeTitle, makeSectionTitle, makeChapterTitle };
