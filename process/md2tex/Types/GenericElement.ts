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
}
