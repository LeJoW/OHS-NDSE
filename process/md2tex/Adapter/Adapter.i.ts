import { GenericElement } from "../Types/GenericElement";

export interface Adapter {
    translation: boolean;

    render(element: GenericElement): string;

    chars: {
        italic(text: string): string;
        bold(text: string): string;
        roman(text: string): string;
    };

    symbols: {
        star: string;
        cross: string;
        nbsp: string;
        ampersand: string;
        parnumber: string;
    };
}
