import Parser from "./Parser";
import Document from "./Document";
import Engine from "./Engine";

const content = `Nothing to see *here*.
But set a title :

# Fancy title
`;

test("", function () {
    const id = (b: string) => "std: " + b;
    const title = (_: string, b: string) => "title: " + b;

    const engine = new Engine(
        {
            desc: [{ test: /^#+\s*(.+)$/, callback: title }],
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
    const doc = new Document(content);
    const parser = new Parser(engine);

    expect(parser.parseBlocks(doc)).toStrictEqual([
        {
            block: "Nothing to see *here*. But set a title :",
            mask: /(?:)/,
            replace: id,
        },
        { block: "# Fancy title", mask: /^#+\s*(.+)$/, replace: title },
    ]);

    expect(parser.parseString("é")).toStrictEqual("\\'e");
    expect(parser.parseString("á")).toStrictEqual("\\'a");
    expect(parser.parseString("á et é")).toStrictEqual("\\'a et \\'e");
    expect(parser.parseString("á *et* é")).toStrictEqual("\\'a {\\it et} \\'e");

    expect(parser.parse(doc))
        .toStrictEqual(`std: Nothing to see {\\it here}. But set a title :

title: Fancy title`);
});
