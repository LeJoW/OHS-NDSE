import { GenericElement } from "./GenericElement";

export class ParagraphStd extends GenericElement {
    text: string;

    constructor(text: string) {
        super(text);
        this.text = this.content;
    }
}

export class Rubric extends ParagraphStd {}

export class RemplacementRubric extends ParagraphStd {}

export class Lesson extends ParagraphStd {}
