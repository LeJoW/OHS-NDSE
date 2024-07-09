import { Render } from "../Render/Render.i";
import { GenericElement as GenericElementInterface } from "./GenericElement.i";

export class GenericElement implements GenericElementInterface {
    content: string;
    translation: any | false = false;

    constructor(content?: string) {
        this.content = content || "";
    }

    setTranslation(translation: any) {
        this.translation = translation;
    }

    toString(render: Render): string {
        return render.block("paragraphStd", this.content);
    }

    toStringWithTranslation(render: Render): string {
        return this.toString(render);
    }
}
