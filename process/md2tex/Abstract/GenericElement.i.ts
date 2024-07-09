import { adapterType } from "../../tex2pdf/adapter/adapter.t";

export interface GenericElement {
    content: string;
    translation: string | false;

    setTranslation(translation: string): void;

    toString(adapter: adapterType): string;
}
