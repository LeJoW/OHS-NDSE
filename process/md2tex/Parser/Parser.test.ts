import Parser from "./Parser";
import { Document } from "../Document/Document";
import { Rules } from "../Rules/Rules";
import { GenericElement } from "../Types/GenericElement";
import { preprocess } from "../config/preprocess";
import { translate } from "../config/translation";
import { Render } from "../Render/Render.i";

const content = `Nothing to see *here*.
But set a title :

# Fancy title
`;

class Title extends GenericElement {
    toString(render: Render): string {
        return (
            (this.translation ? `trad: ${this.translation}\n` : "") +
            `title: ${this.content}`
        );
    }
}

const id = (b: string) => new GenericElement("std: " + b);
const title = (_: string, b: string) => new Title(b);
const saveTranslationDefault = function (
    element: GenericElement,
    translation: string
) {
    element.setTranslation(translation);
};

const rules = new Rules(
    {
        desc: [
            {
                test: /^#+\s*(.+)$/,
                callback: title,
                saveTranslation: saveTranslationDefault,
            },
        ],
        defaultCase: id,
    },
    [
        {
            test: /([éá])/g,
            callback: function (_, c) {
                const chars: { [key: string]: string } = {
                    é: "e",
                    á: "a",
                };
                return "\\'" + chars[c];
            },
        },
        {
            test: /\*([\S\s]+)\*/g,
            callback: function (_, text) {
                return `{\\it ${text}}`;
            },
        },
    ]
);
rules.preprocessor = preprocess;
rules.translater = translate;

class RenderTest implements Render {
    inline(type: string, attributes?: { [attr: string]: any }): string {
        throw new Error("Method not implemented.");
    }
    block(
        type: string,
        content: any,
        attributes?: { [attr: string]: any }
    ): string {
        return content as string;
    }
    join(lines: (string | undefined)[]): string {
        throw new Error("Method not implemented.");
    }
    concat(lines: (string | undefined)[]): string {
        throw new Error("Method not implemented.");
    }
}

const parser = new Parser(rules, new RenderTest());

test("", function () {
    const doc = new Document(content);
    expect(parser.parseBlocks(doc)).toStrictEqual([
        {
            block: "Nothing to see *here*. But set a title :",
            translation: false,
            mask: /(?:)/,
            storeTranslation: undefined,
            replace: id,
        },
        {
            block: "# Fancy title",
            translation: false,
            mask: /^#+\s*(.+)$/,
            storeTranslation: saveTranslationDefault,
            replace: title,
        },
    ]);

    expect(parser.parseString("é")).toStrictEqual("\\'e");
    expect(parser.parseString("á")).toStrictEqual("\\'a");
    expect(parser.parseString("á et é")).toStrictEqual("\\'a et \\'e");
    expect(parser.parseString("á *et* é")).toStrictEqual("\\'a {\\it et} \\'e");

    expect(parser.parse(doc))
        .toStrictEqual(`std: Nothing to see {\\it here}. But set a title :

title: Fancy title`);
});

test("Translation", function () {
    const doc = new Document("# Fancy title $Titre fantaisiste$");

    expect(parser.parseBlocks(doc)).toStrictEqual([
        {
            block: "# Fancy title",
            mask: /^#+\s*(.+)$/,
            translation: "Titre fantaisiste",
            storeTranslation: saveTranslationDefault,
            replace: title,
        },
    ]);

    expect(parser.parse(doc)).toStrictEqual(
        "trad: Titre fantaisiste\ntitle: Fancy title"
    );

    expect(
        parser.parse(
            new Document(`# Fancy title

$
Titre fantaisiste
$
`)
        )
    ).toStrictEqual("trad: Titre fantaisiste\ntitle: Fancy title");
});
