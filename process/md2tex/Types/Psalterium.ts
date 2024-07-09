import { PsalmBuilder } from "../../buildPsalm/PsalmBuilder";
import { adapterType } from "../../tex2pdf/adapter/adapter.t";
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

    toString({ blocks }: adapterType): string {
        return blocks.join([
            blocks.makePsalmTitle(this.title),
            blocks.setAnchor(this.anchor),
            blocks.paragraphLettrine(this.versi[0]),
            blocks.psalm(this.versi.slice(1)),
        ]);
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

    toString(adapter: adapterType): string {
        const blocks = adapter.blocks;

        const beforePsalmBody = [];
        let psalmBody;
        if (this.intonation) {
            beforePsalmBody.push(
                blocks.makePsalmTitle(this.psalms[0].title),
                blocks.setAnchor(this.psalms[0].anchor),
                this.intonation.toString(adapter)
            );
            psalmBody = [
                blocks.psalm(this.psalms[0].versi.slice(1)),
                ...this.psalms.slice(1).map(function (psalm) {
                    return psalm.toString(adapter);
                }),
            ];
        } else {
            psalmBody = this.psalms.map(function (psalm) {
                return psalm.toString(adapter);
            });
        }

        return blocks.psalterium(
            blocks.join(beforePsalmBody),
            blocks.join(psalmBody)
        );
    }
}
