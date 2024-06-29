import { adapterType } from "./adapter.t";

function paragraphLettrine(text: string): string {
    const initial = text[0];
    const body = text.slice(1);
    return `\\initial{${initial}}${body}`;
}

const makeRubric: adapterType["blocks"]["makeRubric"] = function (content) {
    return `\\begin{rubric}${content}\\end{rubric}`;
};

const makeReplace: adapterType["blocks"]["makeReplace"] = function (content) {
    return `\\begin{remplacement}${content}\\end{remplacement}`;
};

const makeLesson: adapterType["blocks"]["makeLesson"] = function (content) {
    return `\\begin{lectio}${paragraphLettrine(content)}\\end{lectio}`;
};

const paragraphStd: adapterType["blocks"]["paragraphStd"] = function (content) {
    return content;
};

export { paragraphLettrine, makeRubric, makeReplace, makeLesson, paragraphStd };
