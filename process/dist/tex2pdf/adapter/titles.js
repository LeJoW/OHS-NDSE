"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeChapterTitle = exports.makeSectionTitle = exports.makeOfficeTitle = exports.makeDayTite = void 0;
const makeDayTite = function (title, dayClass, short) {
    return `\\dayTitle{${title.replace(/\s+/g, "{\\titleSpace}")}}{${dayClass}}{${short}}`;
};
exports.makeDayTite = makeDayTite;
const makeOfficeTitle = function (title, short) {
    return `\\officeTitle{${title.replace(/\s+/g, "{\\titleSpace}")}}`;
};
exports.makeOfficeTitle = makeOfficeTitle;
const makeSectionTitle = function (title) {
    return `\\sectionTitle{${title}}`;
};
exports.makeSectionTitle = makeSectionTitle;
const makeChapterTitle = function (title, addendum) {
    return `\\chapterTitle{${title}}{${addendum}}`;
};
exports.makeChapterTitle = makeChapterTitle;
