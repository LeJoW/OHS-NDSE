import { GenericElement } from "../Types/GenericElement";
import { Adapter as AdapterInterface } from "./Adapter.i";
import { Render } from "../Render/Render.i";

export class Adapter implements AdapterInterface {
    translation: boolean = false;
    renderEngine: Render;

    constructor(render: Render) {
        this.renderEngine = render;

        this.symbols = {
            star: this.renderEngine.orphan("gstella"),
            cross: this.renderEngine.orphan("gcrux"),
            ampersand: this.renderEngine.orphan("ampersand"),
            nbsp: this.renderEngine.symbol("nbsp"),
            parnumber: this.renderEngine.orphan("parnum"),
        };
    }

    symbols: {
        star: string;
        cross: string;
        nbsp: string;
        ampersand: string;
        parnumber: string;
    };
    chars = {
        italic: (text: string) =>
            this.renderEngine.orphan("italic", { value: text }),
        bold: (text: string) =>
            this.renderEngine.orphan("bold", { value: text }),
        roman: (text: string) =>
            this.renderEngine.orphan("roman", { value: text }),
    };

    render(element: GenericElement): string {
        return element.content;
    }
}
