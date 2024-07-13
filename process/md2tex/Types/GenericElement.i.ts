export interface GenericElement {
    content: string;
    translation: any | false;

    setTranslation(translation: any): void;
}
