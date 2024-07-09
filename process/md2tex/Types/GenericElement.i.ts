import { Render } from "../Render/Render.i";

export interface GenericElement {
    content: string;
    translation: any | false;

    setTranslation(translation: any): void;

    toString(adapter: Render): string;

    toStringWithTranslation(adapter: Render): string;
}
