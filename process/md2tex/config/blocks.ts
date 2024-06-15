import { BlockConfigType } from "../Engine/Engine.i";

const blockConfig: BlockConfigType = {
    desc: [
        {
            test: /^(#+)\s+([\S\s]+?)\s*(?:<([\S\s]+?)>)?\s*(?:\{([\S\s]+?)\})?\s*$/i,
            callback: function titre(
                _,
                titleLevel,
                title,
                summary = "",
                subTitle = ""
            ) {
                return `\\${"h".repeat(
                    titleLevel.length
                )}[${subTitle}]{${title}}{${summary ? summary : title}}`;
            },
        },
        {
            test: /^>{1}\s+([\s\S]+)/,
            callback: function rubrique(_, text) {
                return ["\\begin{rubric}", text, "\\end{rubric}"].join("\n");
            },
        },
        {
            test: /^(?:&>){1}\s+([\s\S]+)/,
            callback: function remplacement(_, text) {
                return [
                    "\\begin{remplacement}",
                    text,
                    "\\end{remplacement}",
                ].join("\n");
            },
        },
        {
            test: /^:+\s*([\S\s]+)$/,
            callback: function lecture(_, text) {
                return [
                    "\\begin{lectio}",
                    text.length > 0
                        ? `\\initial{${text[0]}}${text.slice(1)}`
                        : text,
                    "\\end{lectio}",
                ].join("\n");
            },
        },
        {
            test: /^!(\d+)\[([\S]*)\]\(([\S]+)\)$/,
            callback: function gabc(_, style, annotation, file) {
                return `\\gabc{${style}}{${annotation}}{${file}}`;
            },
        },
        {
            test: /!(\d+)\{([\S]+)\}\[([\S]+)\]/,
            callback: function psautier(_, style, file, psaumes) {
                const psaumesListe = psaumes
                    .split(",")
                    .map(function (ps: string) {
                        return `psaumes/${ps}.txt`;
                    });
                return [
                    "\\begin{psaum}",
                    "\\begin{description}",
                    "\\item[style] " + style,
                    "\\item[file] \\verb|" + file + ".gabc|",
                    "\\begin{enumerate}",
                    psaumesListe
                        .map(function (ps) {
                            return `\\item  \\verb|${ps}|`;
                        })
                        .join("\n"),
                    "\\end{enumerate}",
                    "\\end{description}",
                    "\\end{psaum}",
                ].join("\n");
            },
        },
    ],
    defaultCase: function (paragraph: string) {
        return paragraph;
    },
};

export default blockConfig;
