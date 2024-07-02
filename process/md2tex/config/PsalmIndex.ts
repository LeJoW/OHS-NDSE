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
        if (getPsalmId >= 0) {
            const occurs = this.content[getPsalmId].occurrences;
            anchor = this.generateAnchor(getPsalmId, occurs.length);
            occurs.push({ anchor, mode });
        } else {
            anchor = this.generateAnchor(0, 0);
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
        return copy.sort(function ({ num: A }, { num: B }) {
            if (A < B) {
                return -1;
            }
            if (B < A) {
                return 1;
            }
            return 0;
        });
    }

    private generateAnchor(nthPs: number, nthOcc: number): string {
        return `ps${nthPs}-x${nthOcc}`;
    }
}
