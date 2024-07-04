import { Syllabifier } from "./Syllabifier";

test("", function () {
    const syllabifier = new Syllabifier("tex2pdf/hyphen/hyph_la_VA_all.dic");

    expect(syllabifier.getSyllabsOf("semper")).toStrictEqual(["sem", "per"]);
    expect(syllabifier.getSyllabsOf("eam semper")).toStrictEqual([
        "e",
        "am ",
        "sem",
        "per",
    ]);
    expect(syllabifier.getSyllabsOf("ipsam vólui")).toStrictEqual([
        "i",
        "psam ",
        "vó",
        "lu",
        "i",
    ]);

    expect(syllabifier.getSyllabsOf("semper.")).toStrictEqual(["sem", "per."]);
    expect(syllabifier.getSyllabsOf("semper:")).toStrictEqual(["sem", "per:"]);
    expect(syllabifier.getSyllabsOf("Semper:")).toStrictEqual(["Sem", "per:"]);
    expect(
        syllabifier.getSyllabsOf(
            "Legem pone mihi, Dómine, viam iustificatiónum tuárum:"
        )
    ).toStrictEqual([
        "Le",
        "gem ",
        "po",
        "ne ",
        "mi",
        "hi, ",
        "Dó",
        "mi",
        "ne, ",
        "vi",
        "am ",
        "ius",
        "ti",
        "fi",
        "ca",
        "ti",
        "ó",
        "num ",
        "tu",
        "á",
        "rum:",
    ]);

    expect(syllabifier.getSyllabsOf("semper _")).toStrictEqual(["sem", "per _"]);
    expect(syllabifier.getSyllabsOf("semper ---")).toStrictEqual(["sem", "per ---"]);
});
