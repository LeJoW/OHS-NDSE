import { Adapter } from "../Render/Adapter.i";

export interface GenericElement {
    content: string;
    translation: any | false;

    setTranslation(translation: any): void;

    toString(adapter: Adapter): string;

    toStringWithTranslation(adapter: Adapter): string;
}
