import { BlockConfigType } from "../Engine/Engine.i";
import { Adapter } from "../../tex2pdf/Adapter/Adapter.i";

const blockConfig = (adapter: Adapter): BlockConfigType => ({
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
                switch (titleLevel) {
                    case "##":
                        return adapter.makeDayTite(
                            title,
                            subTitle,
                            summary.length > 0 ? summary : title
                        );
                    case "###":
                        return adapter.makeOfficeTitle(
                            title,
                            summary.length > 0 ? summary : title
                        );
                    case "####":
                        return adapter.makeChapterTitle(title, subTitle);
                    default:
                        return adapter.makeSectionTitle(title);
                }
            },
        },
        {
            test: /^>{1}\s+([\s\S]+)/,
            callback: function rubrique(_, text) {
                return adapter.makeRubric(text);
            },
        },
        {
            test: /^(?:&>){1}\s+([\s\S]+)/,
            callback: function remplacement(_, text) {
                return adapter.makeReplace(text);
            },
        },
        {
            test: /^:+\s*([\S\s]+)$/,
            callback: function lecture(_, text) {
                return adapter.makeLesson(text);
            },
        },
        {
            test: /^!(\d+)\[([\S]*)\]\(([\S]+)\)$/,
            callback: function gabc(_, style, annotation, file) {
                return adapter.makeChant(file, style);
            },
        },
        {
            test: /!(\d+)\{([\S]+)\}\[([\S]+)\]/,
            callback: function psautier(_, style, file, psaumes) {
                return adapter.makePs(
                    { file, style },
                    psaumes.split(",").map(function (ps) {
                        return ps.trim();
                    })
                );
            },
        },
    ],
    defaultCase: function (paragraph: string) {
        return adapter.paragraphStd(paragraph);
    },
});

export default blockConfig;
