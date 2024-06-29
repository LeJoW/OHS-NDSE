import { adapterType } from "./adapter.t";

const starSymbol = "~{\\gstella}";
const cruxSymbol = "~{\\gcrux}";

const symbols: { [key: string]: string } = {
    " \\*": starSymbol,
    " +": cruxSymbol,
};
const replaceSymbols: adapterType["strings"]["replaceSymbols"] = function (
    symbol
) {
    return symbols[symbol] ? symbols[symbol] : symbol;
};

const italic: adapterType["strings"]["italic"] = function (
    text: string
): string {
    return `\\italic{${text}}`;
};

const bold: adapterType["strings"]["bold"] = function (text: string): string {
    return `\\bold{${text}}`;
};

export { replaceSymbols, starSymbol, cruxSymbol, italic, bold };
