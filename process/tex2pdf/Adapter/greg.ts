import { Adapter } from "./Adapter.i";
import { existsSync } from "fs";

const buildChant: Adapter["makeChant"] = function (
    file: string,
    style: string
) {
    const pdfInput = `../content/gabc/${file}.pdf`;
    if (!existsSync(pdfInput)) {
        return `Cannot find file \\verb|${file}|`;
    }
    return `\\gabc{../${pdfInput}}`;
};

const buildPsalterium: Adapter["makePs"] = function (
    { file, style }: { file: string; style: string },
    list: string[]
) {
    return `
${buildChant(file, style)}
\\begin{enumerate}
${list.map(function (ps) {
    return `\\item ${ps}`;
})}
\\end{enumerate}
${buildChant(file, "ant")}
    `;
};

export { buildChant, buildPsalterium };
