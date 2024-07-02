import { PsalmBuilder } from "./PsalmBuilder";
import { adapter } from "../tex2pdf/adapter/adapter";
import { Syllabifier } from "./Syllabifier";
import { PsalmList } from "./PsalmList";
import { System } from "./System";
import { PsalmCache } from "./PsalmCache";

adapter.strings.bold = (text: string) => `[${text}]`;
adapter.strings.italic = (text: string) => `(${text})`;
adapter.strings.starSymbol = " *";
adapter.strings.cruxSymbol = " +";

const sys = new System();
const syllabifier = new Syllabifier("tex2pdf/hyphen/hyph_la_VA_all.dic");
const psalmList = new PsalmList("buildPsalm/psalms", sys);
const psalmCache = new PsalmCache("buildPsalm/cache", sys);

const ps = new PsalmBuilder(syllabifier, adapter, psalmList, psalmCache);

test("Accent detection", function () {
    expect(ps.getLastAccent(["sem", "per"])).toStrictEqual({
        before: [],
        accent: "sem",
        after: ["per"],
    });

    expect(ps.getLastAccent(["e", "am ", "sem", "per"])).toStrictEqual({
        before: ["e", "am "],
        accent: "sem",
        after: ["per"],
    });

    expect(ps.getLastAccent(["i", "psam ", "vó", "lu", "i"])).toStrictEqual({
        before: ["i", "psam "],
        accent: "vó",
        after: ["lu", "i"],
    });

    expect(ps.getLastAccent(["vi", "ví", "fi", "ca ", "me"])).toStrictEqual({
        before: ["vi", "ví", "fi"],
        accent: "ca ",
        after: ["me"],
    });

    expect(ps.getLastAccent(["con", "so", "lá", "tus ", "sum"])).toStrictEqual({
        before: ["con", "so"],
        accent: "lá",
        after: ["tus ", "sum"],
    });

    expect(ps.getLastAccent(["su", "per ", "me"])).toStrictEqual({
        before: [],
        accent: "su",
        after: ["per ", "me"],
    });

    expect(
        ps.getLastAccent(["vé", "ni", "at ", "su", "per ", "me"])
    ).toStrictEqual({
        before: ["vé", "ni", "at "],
        accent: "su",
        after: ["per ", "me"],
    });

    expect(ps.getLastAccent(["et ", "nunc ", "et"])).toStrictEqual({
        before: ["et "],
        accent: "nunc ",
        after: ["et"],
    });
});

test("half-verse setup", function () {
    expect(ps.setUpHalfVerse("et exquíram eam semper.", [0, 1])).toStrictEqual(
        "et exquíram eam [sem]per."
    );

    expect(ps.setUpHalfVerse("et exquíram eam semper.", [0, 2])).toStrictEqual(
        "et exquíram [e]am [sem]per."
    );

    expect(ps.setUpHalfVerse("semper.", [0, 2])).toStrictEqual("[sem]per.");

    expect(ps.setUpHalfVerse("et exquíram eam semper.", [1, 2])).toStrictEqual(
        "et exquí(ram) [e]am [sem]per."
    );

    expect(ps.setUpHalfVerse("et exquíram eam semper.", [2, 2])).toStrictEqual(
        "et ex(quíram) [e]am [sem]per."
    );

    expect(ps.setUpHalfVerse("semper.", [2, 2])).toStrictEqual("[sem]per.");

    expect(ps.setUpHalfVerse("et exquíram eam semper.", [4, 2])).toStrictEqual(
        "(et) (exquíram) [e]am [sem]per."
    );

    expect(ps.setUpHalfVerse("et exquíram eam semper.", [0, 0])).toStrictEqual(
        "et exquíram eam semper."
    );
});

test("verse setup", function () {
    expect(
        ps.setUpVerse(
            [
                "Legem pone mihi, Dómine, viam iustificatiónum tuárum:",
                "et exquíram eam semper.",
            ],
            { mediante: [0, 2], end: [2, 1] }
        )
    ).toStrictEqual(
        "Legem pone mihi, Dómine, viam iustificati[ó]num tu[á]rum: * et exquíram (eam) [sem]per."
    );

    expect(
        ps.setUpVerse(
            [
                "Illústra fáciem tuam super servum tuum,",
                "salvum me fac in misericórdia tua:",
                "Dómine, non confúndar, quóniam invocávi te.",
            ],
            { mediante: [0, 2], end: [2, 1] }
        )
    ).toStrictEqual(
        "Illústra fáciem tuam super servum tuum, + salvum me fac in miseri[cór]dia [tu]a: * Dómine, non confúndar, quóniam (invo)[cá]vi te."
    );
});

test("all", function () {
    expect(ps.buildPsalm("test", "1f")).toStrictEqual([
        "Legem pone mihi, Dómine, viam iustificati[ó]num tu[á]rum: * et exquíram (eam) [sem]per.",
        "Da mihi intelléctum, et scrutábor [le]gem [tu]am: * et custódiam illam in toto (corde) [me]o.",
        "Glória [Pa]tri, et [Fí]lio, * et Spirí(tui) [Sanc]to.",
        "Sicut erat in princípio, et [nunc], et [sem]per, * et in sǽcula sæcu(lórum). [A]men.",
    ]);
});
