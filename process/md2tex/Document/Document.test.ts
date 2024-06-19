import Document from "./Document";

const content = `Nothing to see here.
But set a title :
    
# Fancy title`;

test("blocks", function () {
    expect(new Document(content).getBlocks()).toStrictEqual([
        "Nothing to see here. But set a title :",
        "# Fancy title",
    ]);

    expect(new Document(content).getEveryWords()).toStrictEqual([
        "nothing",
        "to",
        "see",
        "here",
        "but",
        "set",
        "title",
        "fancy",
    ]);

    expect(
        new Document("Deus, in adiutórium meum inténde.").getEveryWords()
    ).toStrictEqual(["deus", "in", "adiutórium", "meum", "inténde"]);

    expect(
        new Document("Ástitit regína a dextris tuis.").getEveryWords()
    ).toStrictEqual(["ástitit", "regína", "dextris", "tuis"]);

    expect(
        new Document("et in sǽcula sæculórum. Amen.").getEveryWords()
    ).toStrictEqual(["et", "in", "sǽcula", "sæculórum", "amen"]);
});
