import { Adapter } from "./Adapter.i";
import { Converter } from "../../gabc2pdf/Converter.i";

function buildChant(file: string, style: string, converter: Converter) {
    if (!converter.tryConvertingFromFile(file)) {
        return `Cannot build file \\verb|${file}|`;
    }
    return `\\gabc{${file}}`;
}

function buildPsalterium(
    { file, style }: { file: string; style: string },
    list: string[],
    converter: Converter
) {
    return `
        ${buildChant(file, style, converter)}
        \\begin{enumerate}
        ${list.map(function (ps) {
            return `\\item ${ps}`;
        })}
        \\end{enumerate}
        ${buildChant(file, "ant", converter)}
    `;
}

export { buildChant, buildPsalterium };
