import { PsalmBuilder } from "../../buildPsalm/PsalmBuilder";
import { Cantus } from "./Cantus";
import { GenericElement } from "./GenericElement";

export class Psalmus extends GenericElement {
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
        super(psalmDivision);
        this.psalmDivision = psalmDivision;
        this.versi = psalmBuilder.buildPsalm(psalmDivision, ton || "none");
    }
}

export class Psalterium extends GenericElement {
    ton: string | null = null;
    intonation: Cantus | false = false;

    psalms: Psalmus[] = [];

    constructor(ton: string | null) {
        super(ton as string);
        this.ton = ton;
    }

    addPsalm(psalm: Psalmus) {
        if (this.psalms.length === 0 && this.ton) {
            this.intonation = new Cantus(`${psalm.psalmDivision}-${this.ton}`);
        }
        this.psalms.push(psalm);
    }
}
