import { adapterType } from "./adapter.t";

const makeDayTite: adapterType["blocks"]["makeDayTite"] = function (
    title,
    dayClass,
    short
) {
    return `\\dayTitle{${title.replace(
        /\s+/g,
        "{\\titleSpace}"
    )}}{${dayClass}}{${short}}`;
};

const makeOfficeTitle: adapterType["blocks"]["makeOfficeTitle"] = function (
    title,
    short
) {
    return `\\officeTitle{${title.replace(/\s+/g, "{\\titleSpace}")}}`;
};

const makeSectionTitle: adapterType["blocks"]["makeSectionTitle"] = function (
    title
) {
    return `\\sectionTitle{${title}}`;
};

const makeChapterTitle: adapterType["blocks"]["makeChapterTitle"] = function (
    title,
    addendum
) {
    return `\\chapterTitle{${title}}{${addendum}}`;
};

export { makeDayTite, makeOfficeTitle, makeSectionTitle, makeChapterTitle };
