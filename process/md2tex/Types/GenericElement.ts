import { Adapter } from "../Render/Adapter.i";
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

    toString(adapter: Adapter): string {
        return adapter.render(this);
    }

    toStringWithTranslation(adapter: Adapter): string {
        return this.toString(adapter);
    }
}
