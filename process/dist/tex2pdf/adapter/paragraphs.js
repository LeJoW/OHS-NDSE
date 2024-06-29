"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paragraphStd = exports.makeLesson = exports.makeReplace = exports.makeRubric = exports.paragraphLettrine = void 0;
function paragraphLettrine(text) {
    const initial = text[0];
    const body = text.slice(1);
    return `\\initial{${initial}}${body}`;
}
exports.paragraphLettrine = paragraphLettrine;
const makeRubric = function (content) {
    return `\\begin{rubric}${content}\\end{rubric}`;
};
exports.makeRubric = makeRubric;
const makeReplace = function (content) {
    return `\\begin{remplacement}${content}\\end{remplacement}`;
};
exports.makeReplace = makeReplace;
const makeLesson = function (content) {
    return `\\begin{lectio}${paragraphLettrine(content)}\\end{lectio}`;
};
exports.makeLesson = makeLesson;
const paragraphStd = function (content) {
    return content;
};
exports.paragraphStd = paragraphStd;
