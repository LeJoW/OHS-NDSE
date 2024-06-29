"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strConfig = ({ strings }) => [
    {
        test: /((\s\\\*)|(\\R)|(\s\+))/g,
        callback: function symbols(_, symbol) {
            return strings.replaceSymbols(symbol);
        },
    },
];
exports.default = strConfig;
