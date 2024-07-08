import { adapterType } from "../../tex2pdf/adapter/adapter.t";

export class ParagraphStd {
    text: string;

    constructor(text: string) {
        this.text = text;
    }

    toString({ blocks }: adapterType): string {
        return blocks.paragraphStd(this.text);
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
