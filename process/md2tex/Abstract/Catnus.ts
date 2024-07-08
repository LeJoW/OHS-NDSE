import { adapterType } from "../../tex2pdf/adapter/adapter.t";

export class Cantus {
    mode: number | undefined;
    incipit: string | undefined;
    scorePath: string = "";
    anchor: string | null = null;
    type: string | undefined;

    constructor(file: string) {
        this.scorePath = file;
    }

    toString({ blocks }: adapterType): string {
        return blocks.makeChant(this.scorePath, this.anchor || undefined);
    }
}
