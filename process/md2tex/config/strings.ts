import { StringConfigType } from "../Engine/Engine.i";
import { Adapter } from "../../tex2pdf/Adapter/Adapter";

const strConfig = (adapter: Adapter): StringConfigType => [
    {
        test: /([áéíóúǽæ])/g,
        callback: function accent(_, char) {
            return adapter.replaceUnreadeableChar(char);
        },
    },
    {
        test: /((\s\\\*)|(\\R)|(\s\+))/g,
        callback: function symbols(_, symbol) {
            return adapter.replaceSymbols(symbol);
        },
    },
];

export default strConfig;
