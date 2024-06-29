"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockConfig = ({ blocks }, psBuilder) => ({
    desc: [
        {
            test: /^(#+)\s+([\S\s]+?)\s*(?:<([\S\s]+?)>)?\s*(?:\{([\S\s]+?)\})?\s*$/i,
            callback: function titre(_, titleLevel, title, summary = "", subTitle = "") {
                switch (titleLevel) {
                    case "##":
                        return blocks.makeDayTite(title, subTitle, summary.length > 0 ? summary : title);
                    case "###":
                        return blocks.makeOfficeTitle(title, summary.length > 0 ? summary : title);
                    case "####":
                        return blocks.makeChapterTitle(title, subTitle);
                    default:
                        return blocks.makeSectionTitle(title);
                }
            },
        },
        {
            test: /^>{1}\s+([\s\S]+)/,
            callback: function rubrique(_, text) {
                return blocks.makeRubric(text);
            },
        },
        {
            test: /^(?:&>){1}\s+([\s\S]+)/,
            callback: function remplacement(_, text) {
                return blocks.makeReplace(text);
            },
        },
        {
            test: /^:+\s*([\S\s]+)$/,
            callback: function lecture(_, text) {
                return blocks.makeLesson(text);
            },
        },
        {
            test: /^!\{([\S]+)\}$/,
            callback: function gabc(_, file) {
                return blocks.makeChant(file);
            },
        },
        {
            test: /^@(?:\((\S+)\))?\[([\S]+)\]/,
            callback: function psautier(_, ton, psaumes) {
                return psaumes
                    .split(",")
                    .map(function (psalmDesc, index) {
                    const psalmDescription = psalmDesc.trim();
                    const isDoxologie = /G$/.test(psalmDescription);
                    const psalm = isDoxologie
                        ? psalmDescription.slice(0, -1)
                        : psalmDescription;
                    try {
                        return blocks.makePsalm(ton.length > 0 && index === 0
                            ? `${psalm}-${ton}`
                            : false, psBuilder
                            .buildPsalm(psalm, ton)
                            .slice(0, isDoxologie ? undefined : -2));
                    }
                    catch (err) {
                        return blocks.error(err instanceof Error
                            ? err.message
                            : `Psalm ${psalm}: Unkown error`);
                    }
                })
                    .join("\n\n");
            },
        },
    ],
    defaultCase: function (paragraph) {
        return blocks.paragraphStd(paragraph);
    },
});
exports.default = blockConfig;
