import { incipits } from "./psIncipits";

type psalmEntry = {
    num: string;
    incipit: string;
    occurrences: { anchor: string; mode: number | null }[];
};

export class PsalmIndex {
    content: psalmEntry[] = [];

    addPsalm(psalm: string, mode: number | null): string {
        const getPsalmId = this.content.findIndex(function ({ num }) {
            return num === psalm;
        });
        let anchor: string;
        if (~getPsalmId !== 0) {
            const occurs = this.content[getPsalmId].occurrences;
            anchor = this.generateAnchor(psalm, occurs.length);
            occurs.push({ anchor, mode });
        } else {
            anchor = this.generateAnchor(psalm, 0);
            const incipit = incipits[psalm] || "Psalmus";
            this.content.push({
                num: psalm,
                incipit,
                occurrences: [{ anchor, mode }],
            });
        }
        return anchor;
    }

    getSortedIndex(): psalmEntry[] {
        const copy = this.content.reduce(function (
            acc: psalmEntry[],
            el: psalmEntry
        ): psalmEntry[] {
            return [...acc, el];
        },
        []);
        return copy.sort(({ num: a }, { num: b }) =>
            this.setUpPsalmRefToCompare(a).localeCompare(
                this.setUpPsalmRefToCompare(b)
            )
        );
    }

    private setUpPsalmRefToCompare(ref: string): string {
        return ref.padStart(3, "0").padEnd(4, "a");
    }

    private generateAnchor(psalm: string, nthOcc: number): string {
        return `ps${psalm}-x${nthOcc}`;
    }
}
