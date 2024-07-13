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
}
