import { StringConfigType } from "../Rules/Rules.i";
import { Render } from "../Render/Render.i";

const symbols: { [char: string]: string } = {
    "&": "ampersand",
    "§": "parnum",
    "+": "gcrux",
    "\\*": "gstella",
};

const strConfig = (render: Render): StringConfigType => [
    {
        test: /\s*((\+)|(\\\*))/g,
        callback: function (_, symbol) {
            return (
                render.symbol("nbsp") + render.inline(symbols[symbol.trim()])
            );
        },
    },
    {
        test: /(_{1}([\S\s]+)_{1})/g,
        callback: function (_, all, text, offset, ctx) {
            if (/^!/.test(ctx)) {
                return all;
            }
            return /^>/.test(ctx)
                ? render.inline("romain", { value: text })
                : render.inline("italic", { value: text });
        },
    },
    {
        test: /(&|§)/g,
        callback: function (_, char) {
            return render.inline(symbols[char]);
        },
    },
];

export default strConfig;
