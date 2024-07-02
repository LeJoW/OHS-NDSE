import { PsalmIndex } from "../../md2tex/config/PsalmIndex";
import { TableOfContents } from "../../md2tex/config/TableOfContents";

export function makeTableOfContents(table: TableOfContents): string {
    return [
        "\\begin{tableOfContents}",
        ...table.contents.map(function ({ day, entries }) {
            return [
                "\\begin{tableSection}",
                day === null ? "" : `\\tableSectionTitle{${day}}`,
                `\\begin{sectionEntries}`,
                ...entries.map(function ({ office, anchor }) {
                    return `\\sectionEntry{${office}}{${anchor}}`;
                }),
                `\\end{sectionEntries}`,
                "\\end{tableSection}",
            ].join("\n");
        }),
        "\\end{tableOfContents}",
    ].join("\n");
}

const romanNumbers = [, "i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];

export function makePsalmsIndex(index: PsalmIndex): string {
    return [
        "\\begin{psIndex}",
        ...index.getSortedIndex().map(function ({ num, incipit, occurrences }) {
            return `\\psEntry{${num}}{${incipit}}{${occurrences
                .map(function ({ anchor, mode }) {
                    return (
                        `\\pageref{${anchor}}` +
                        (mode !== null
                            ? ` \\psMode{${romanNumbers[mode]}}`
                            : "")
                    );
                })
                .join(", ")}}`;
        }),
        "\\end{psIndex}",
    ].join("\n");
}
