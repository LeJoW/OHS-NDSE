"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bold = exports.italic = exports.cruxSymbol = exports.starSymbol = exports.replaceSymbols = void 0;
const starSymbol = "~{\\gstella}";
exports.starSymbol = starSymbol;
const cruxSymbol = "~{\\gcrux}";
exports.cruxSymbol = cruxSymbol;
const symbols = {
    " \\*": starSymbol,
    " +": cruxSymbol,
};
const replaceSymbols = function (symbol) {
    return symbols[symbol] ? symbols[symbol] : symbol;
};
exports.replaceSymbols = replaceSymbols;
const italic = function (text) {
    return `\\italic{${text}}`;
};
exports.italic = italic;
const bold = function (text) {
    return `\\bold{${text}}`;
};
exports.bold = bold;
