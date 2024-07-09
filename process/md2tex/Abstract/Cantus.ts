import { adapterType } from "../../tex2pdf/adapter/adapter.t";
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

    toString({ blocks }: adapterType): string {
        return blocks.join([
            this.anchor ? blocks.setAnchor(this.anchor) : undefined,
            blocks.makeChant(this.scorePath),
        ]);
    }
}
