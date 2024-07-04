import { StringConfigType } from "../Engine/Engine.i";
import { adapterType } from "../../tex2pdf/adapter/adapter.t";

const strConfig = ({ strings }: adapterType): StringConfigType => [
    {
        test: /\s*((\+)|(\\\*))/g,
        callback: function symbols(_, symbol) {
            return strings.replaceSymbols(symbol.trim());
        },
    },
    {
        test: /(_{1}([\S\s]+)_{1})/g,
        callback: function (_, all, text, offset, ctx) {
            if (/^!/.test(ctx)) {
                return all;
            }
            return /^>/.test(ctx) ? strings.romain(text) : strings.italic(text);
        },
    },
    {
        test: /(&|§)/g,
        callback: function chars(_, char) {
            return strings.replaceChars(char);
        },
    },
];

export default strConfig;
