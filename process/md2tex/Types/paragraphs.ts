import { Render } from "../Render/Render.i";
import { GenericElement } from "./GenericElement";

export class ParagraphStd extends GenericElement {
    text: string;

    constructor(text: string) {
        super(text);
        this.text = this.content;
    }
}

export class Rubric extends ParagraphStd {
    toString(render: Render): string {
        return render.block("rubric", this.text);
    }
}

export class RemplacementRubric extends ParagraphStd {
    toString(render: Render): string {
        return render.block("replace", this.text);
    }
}

export class Lesson extends ParagraphStd {
    toString(render: Render): string {
        return render.block("lesson", this.text);
    }
}
