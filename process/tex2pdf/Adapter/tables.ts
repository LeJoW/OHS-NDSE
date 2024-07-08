import { PsalmIndex } from "../../md2tex/config/PsalmIndex";
import { Table } from "../../md2tex/config/Table";
import { TableOfContents } from "../../md2tex/Abstract/TableOfContents";

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

const gregoTypes: { [key: string]: string } = {
    ant: "Antiphonæ",
    hymn: "Hymni",
    rep: "Responsoria",
};

export function makeGregIndex(table: Table): string {
    return [
        "\\begin{gregIndex}",
        ...Object.entries(table.getTableSorted())
            .sort(function ([a], [b]) {
                return a.localeCompare(b);
            })
            .map(function ([type, list]) {
                return [
                    `\\tableTitle{${gregoTypes[type]}}`,
                    "\\begin{gregList}",
                    ...list.map(function ({ mode, label, anchor }) {
                        return `\\gregEntry{${mode}}{${label}}{${anchor}}`;
                    }),
                    "\\end{gregList}",
                ].join("\n");
            }),
        "\\end{gregIndex}",
    ].join("\n");
}
