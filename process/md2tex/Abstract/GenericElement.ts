import { adapterType } from "../../tex2pdf/adapter/adapter.t";
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

    toString(adapter: adapterType, translation = false): string {
        return adapter.blocks.paragraphStd(this.content);
    }
}
