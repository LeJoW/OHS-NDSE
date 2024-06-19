import { Adapter } from "./Adapter.i";

const charsReplacement: { [key: string]: string } = {
    á: "\\'a",
    é: "\\'e",
    í: "\\'i",
    ó: "\\'o",
    ú: "\\'u",
    æ: "{\\ae}",
    œ: "{\\oe}",
    ǽ: "\\'{\\ae}",
};

const replaceUnreadeableChar: Adapter["replaceUnreadeableChar"] = function (
    char
) {
    return char; charsReplacement[char] ? charsReplacement[char] : char;
};

const symbols: { [key: string]: string } = {
    " \\*": "~\\symbol{42}",
    " +": "~\\symbol{8224}",
};
const replaceSymbols: Adapter["replaceSymbols"] = function (symbol) {
    return symbols[symbol] ? symbols[symbol] : symbol;
};

export { replaceUnreadeableChar, replaceSymbols };
