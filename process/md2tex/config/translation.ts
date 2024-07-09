import { translatedBlock } from "../Rules/Rules.i";

export function translate(block: string): translatedBlock {
    const matched = block.match(/^([^$]*)(?:\$([\S\s]*)\$)?/) as string[];
    return {
        block: matched[1].trim(),
        translation: matched[2] || false,
    };
}
