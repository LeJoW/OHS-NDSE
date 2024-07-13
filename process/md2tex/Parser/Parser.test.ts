import Parser from "./Parser";
import { Document } from "../Document/Document";
import { adapter, rules, id, title } from "./testEnv";

const parser = new Parser(rules, adapter);

test("", function () {
    const doc = new Document(`Nothing to see *here*.
But set a title :

# Fancy title
`);
    expect(parser.parseBlocks(doc)).toStrictEqual([
        {
            block: "Nothing to see *here*. But set a title :",
            mask: /(?:)/,
            parseTranslation: undefined,
            replace: id,
        },
        {
            block: "# Fancy title",
            mask: /^#+\s*(.+)$/,
            parseTranslation: undefined,
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
    parser.enableTranslation = true;

    expect(JSON.stringify(parser.parseBlocks(doc))).toStrictEqual(
        JSON.stringify([
            {
                block: "# Fancy title",
                mask: /^#+\s*(.+)$/,
                parseTranslation: function () {},
                replace: title,
            },
        ])
    );

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
