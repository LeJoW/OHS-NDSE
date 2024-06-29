import { StringConfigType } from "../Engine/Engine.i";
import { adapterType } from "../../tex2pdf/adapter/adapter.t";

const strConfig = ({ strings }: adapterType): StringConfigType => [
    {
        test: /((\s\\\*)|(\\R)|(\s\+))/g,
        callback: function symbols(_, symbol) {
            return strings.replaceSymbols(symbol);
        },
    },
];

export default strConfig;
