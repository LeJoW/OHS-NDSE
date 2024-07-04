export const starSymbol = "~{\\gstella}";
export const cruxSymbol = "~{\\gcrux}";

const symbols: { [key: string]: string } = {
    "\\*": starSymbol,
    "+": cruxSymbol,
};

const chars: { [key: string]: string } = {
    "&": "\\&",
    "§": "\\newline\\indent",
};

export function replaceSymbols(symbol: string) {
    return symbols[symbol] || symbol;
}

export function italic(text: string): string {
    return `\\italic{${text}}`;
}

export function bold(text: string) {
    return `\\bold{${text}}`;
}

export function romain(text: string) {
    return `\\romain{${text}}`;
}

export function replaceChars(char: string) {
    return chars[char] || char;
}
