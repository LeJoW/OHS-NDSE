import { Adapter } from "./Adapter.i";

const makeRubric: Adapter["makeRubric"] = function (content) {
    return `\\begin{rubric}${content}\\end{rubric}`;
};

const makeReplace: Adapter["makeReplace"] = function (content) {
    return `\\begin{remplacement}${content}\\end{remplacement}`;
};

const makeLesson: Adapter["makeLesson"] = function (content) {
    const initial = content[0];
    const body = content.slice(1);
    return `\\begin{lectio}\\initial{${initial}}${body}\\end{lectio}`;
};

const paragraphStd: Adapter["paragraphStd"] = function (content) {
    return content;
};

export { makeRubric, makeReplace, makeLesson, paragraphStd };
