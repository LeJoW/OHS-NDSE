import { BlockConfigType } from "../Engine/Engine.i";
import { adapterType } from "../../tex2pdf/adapter/adapter.t";
import { PsalmBuilder } from "../../buildPsalm/PsalmBuilder";
import { TableOfContents } from "./TableOfContents";
import { PsalmIndex } from "./PsalmIndex";
import { Table } from "./Table";

const psalmIndex = new PsalmIndex();
const gregoTable = new Table();
const table = new TableOfContents();

const blockConfig = (
    { blocks }: adapterType,
    psBuilder: PsalmBuilder
): BlockConfigType => ({
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
                        var short = summary.length > 0 ? summary : title;
                        table.addDay(short);
                        return blocks.makeDayTite(title, subTitle, short);
                    case "###":
                        var short = summary.length > 0 ? summary : title;
                        return blocks.makeOfficeTitle(
                            title,
                            short,
                            table.addOffice(short)
                        );
                    case "####":
                        return blocks.makeChapterTitle(title, subTitle);
                    case "#####":
                        return blocks.makePsalmTitle(title);
                    default:
                        return blocks.makeSectionTitle(title);
                }
            },
        },
        {
            test: /^>{1}\s+([\s\S]+)/,
            callback: function rubrique(_, text) {
                return blocks.makeRubric(text.replace(/(\s*>\s*)/g, " "));
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
            test: /^!\[(.*)\]\(([\S]+)\)$/,
            callback: function gabc(_, label, file) {
                let anchor;
                const matches = label.match(/(?:(\d+):)?(\w+):(.+)/);
                if (matches !== null) {
                    const [, ton, type, title] = matches as string[];
                    anchor = gregoTable.addChant(title, parseInt(ton), type);
                }
                return blocks.makeChant(file, anchor);
            },
        },
        {
            test: /^@(?:\((\S+)\))?\[([\S]+)\]/,
            callback: function psautier(_, ton, psaumes) {
                return psaumes
                    .split(",")
                    .map(function (psalmDesc, index): string {
                        const psalmDescription = psalmDesc.trim();
                        if (psalmDescription.length === 0) {
                            return "";
                        }
                        const isDoxologie = /G$/.test(psalmDescription);
                        const psalm = isDoxologie
                            ? psalmDescription.slice(0, -1)
                            : psalmDescription;
                        const mode =
                            ton.length > 0
                                ? parseInt(ton.replace(/^(\d+)/, "$1"), 10)
                                : null;
                        try {
                            return blocks.makePsalm(
                                ton.length > 0 && index === 0
                                    ? `${psalm}-${ton}`
                                    : false,
                                psBuilder
                                    .buildPsalm(psalm, ton)
                                    .slice(0, isDoxologie ? undefined : -2),
                                psalmIndex.addPsalm(psalm, mode)
                            );
                        } catch (err) {
                            return blocks.error(
                                err instanceof Error
                                    ? err.message
                                    : `Psalm '${psalm}': Unkown error`
                            );
                        }
                    })
                    .join("\n\n");
            },
        },
        {
            test: /<\s*(\S+)\s*\/>/,
            callback: function (_, tag) {
                switch (tag) {
                    case "psalms-index":
                        return blocks.makePsalmsIndex(psalmIndex);
                    case "grego-index":
                        return blocks.makeGregIndex(gregoTable);
                    case "table-of-contents":
                        return blocks.makeTableOfContents(table);
                    default:
                        return "";
                }
            },
        },
    ],
    defaultCase: function (paragraph: string) {
        return blocks.paragraphStd(paragraph);
    },
});

export default blockConfig;
