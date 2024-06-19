import { Adapter } from "./Adapter.i";

const makeDayTite: Adapter["makeDayTite"] = function (title, dayClass, short) {
    return `\\dayTitle{${title.replace(/\s+/g, "{\\titleSpace}")}}{${dayClass}}{${short}}`;
};

const makeOfficeTitle: Adapter["makeOfficeTitle"] = function (title, short) {
    return `\\officeTitle{${title.replace(/\s+/g, "{\\titleSpace}")}}`;
};

const makeSectionTitle: Adapter["makeSectionTitle"] = function (title) {
    return `\\sectionTitle{${title}}`;
};

const makeChapterTitle: Adapter["makeChapterTitle"] = function (
    title,
    addendum
) {
    return `\\chapterTitle{${title}}{${addendum}}`;
};

export { makeDayTite, makeOfficeTitle, makeSectionTitle, makeChapterTitle };
