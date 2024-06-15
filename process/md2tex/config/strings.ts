import { StringConfigType } from "../Engine/Engine.i";

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

const strConfig: StringConfigType = [
    {
        test: /([áéíóúǽæ])/g,
        callback: function accent(_, char) {
            return charsReplacement[char] ? charsReplacement[char] : char;
        },
    },
];

export default strConfig;
