import { adapterType } from "../../tex2pdf/adapter/adapter.t";
import { GenericElement } from "./GenericElement";

export class ParagraphStd extends GenericElement {
    text: string;

    constructor(text: string) {
        super(text);
        this.text = this.content;
    }
}

export class Rubric extends ParagraphStd {
    toString({ blocks }: adapterType): string {
        return blocks.makeRubric(this.text);
    }
}

export class RemplacementRubric extends ParagraphStd {
    toString({ blocks }: adapterType): string {
        return blocks.makeReplace(this.text);
    }
}

export class Lesson extends ParagraphStd {
    toString({ blocks }: adapterType): string {
        return blocks.makeLesson(this.text);
    }
}
