import { adapterType } from "../../tex2pdf/adapter/adapter.t";
import { GenericElement as GenericElementInterface } from "./GenericElement.i";

export class GenericElement implements GenericElementInterface {
    content: string;
    translation: string | false = false;

    constructor(content?: string) {
        this.content = content || "";
    }

    setTranslation(translation: string) {
        this.translation = translation;
    }

    toString(adapter: adapterType): string {
        return adapter.blocks.paragraphStd(this.content);
    }
}
