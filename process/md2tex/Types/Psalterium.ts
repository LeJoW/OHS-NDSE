import { PsalmBuilder } from "../../buildPsalm/PsalmBuilder";
import { Render } from "../Render/Render.i";
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

    toString(render: Render): string {
        return render.concat([
            render.block("psalmTitle", this.title),
            render.inline("anchor", { label: this.anchor }),
            render.block("paragraphLettrine", this.versi[0]),
            render.block("psalm", render.join(this.versi.slice(1))),
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

    toString(render: Render): string {
        const beforePsalmBody: string[] = [];
        let psalmBody;
        if (this.intonation) {
            beforePsalmBody.push(
                render.block("psalmTitle", this.psalms[0].title),
                render.inline("anchor", { label: this.psalms[0].anchor }),
                this.intonation.toString(render)
            );
            psalmBody = [
                render.block("psalm", render.join(this.psalms[0].versi.slice(1))),
                ...this.psalms.slice(1).map(function (psalm) {
                    return psalm.toString(render);
                }),
            ];
        } else {
            psalmBody = this.psalms.map(function (psalm) {
                return psalm.toString(render);
            });
        }

        return render.block(
            "psalterium",
            render.join([...beforePsalmBody, ...psalmBody])
        );
    }
}
