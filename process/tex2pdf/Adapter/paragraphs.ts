import { Adapter } from "./Adapter.i";

const makeRubric: Adapter["blocks"]["makeRubric"] = function (content) {
    return `\\begin{rubric}${content}\\end{rubric}`;
};

const makeReplace: Adapter["blocks"]["makeReplace"] = function (content) {
    return `\\begin{remplacement}${content}\\end{remplacement}`;
};

const makeLesson: Adapter["blocks"]["makeLesson"] = function (content) {
    return `\\begin{lectio}${content}\\end{lectio}`;
};

const paragraphStd: Adapter["blocks"]["paragraphStd"] = function (content) {
    return content;
};

export { makeRubric, makeReplace, makeLesson, paragraphStd };
