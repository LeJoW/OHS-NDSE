import { adapterType } from "./adapter.t";

function setTitleSpace(title: string): string {
    return title.replace(/\s+/g, "{\\titleSpace}");
}

const makeDayTite: adapterType["blocks"]["makeDayTite"] = function (
    title,
    dayClass,
    short
) {
    return `\\dayTitle{${setTitleSpace(title)}}{${dayClass}}{${short}}`;
};

const makeOfficeTitle: adapterType["blocks"]["makeOfficeTitle"] = function (
    title,
    short,
    anchor
) {
    return `\\label{${anchor}}\\officeTitle{${setTitleSpace(title)}}{${
        short.length > 0 ? short : title
    }}`;
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
