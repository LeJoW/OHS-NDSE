import { Render } from "../Render/Render.i";
import { GenericElement } from "./GenericElement";

export class Cantus extends GenericElement {
    mode: number | undefined;
    incipit: string | undefined;
    scorePath: string = "";
    anchor: string | null = null;
    type: string | undefined;

    constructor(file: string) {
        super();
        this.scorePath = file;
    }

    toString(render: Render): string {
        return render.concat([
            this.anchor
                ? render.inline("anchor", { label: this.anchor })
                : undefined,
            render.block("cantus", undefined, { file: this.scorePath }),
        ]);
    }
}
