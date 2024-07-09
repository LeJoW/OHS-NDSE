import { adapterType } from "../../tex2pdf/adapter/adapter.t";

export interface GenericElement {
    content: string;
    translation: any | false;

    setTranslation(translation: any): void;

    toString(adapter: adapterType, translation?: boolean): string;
}
