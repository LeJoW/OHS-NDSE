import { PsalmBuilder } from "../../buildPsalm/PsalmBuilder";
import { adapterType } from "../../tex2pdf/adapter/adapter.t";
import { Cantus } from "./Catnus";

export class Psalmus {
    psalmDivision: string;
    versi: string[];
    doxologie: boolean = true;

    title: string | false = false;
    anchor: string = "not-set";

    constructor(
        ton: string | null,
        psalmDivision: string,
        psalmBuilder: PsalmBuilder
    ) {
        this.psalmDivision = psalmDivision;
        this.versi = psalmBuilder.buildPsalm(psalmDivision, ton || "none");
    }
}

export class Psalterium {
    ton: string | null = null;
    intonation: Cantus | false = false;

    psalms: Psalmus[] = [];

    constructor(ton: string | null) {
        this.ton = ton;
    }

    addPsalm(psalm: Psalmus) {
        if (this.psalms.length === 0 && this.ton) {
            this.intonation = new Cantus(`${psalm.psalmDivision}-${this.ton}`);
        }
        this.psalms.push(psalm);
    }

    toString(adapter: adapterType): string {
        return adapter.blocks.makePsalterium(this.intonation, this.psalms);
    }
}
