import { translate } from "./translation";

test("", function () {
    expect(translate("")).toStrictEqual({
        block: "",
        translation: false,
    });

    expect(translate("# title")).toStrictEqual({
        block: "# title",
        translation: false,
    });

    expect(translate("# title $$")).toStrictEqual({
        block: "# title",
        translation: false,
    });

    expect(translate("# title $titre$")).toStrictEqual({
        block: "# title",
        translation: "titre",
    });

    expect(translate("# title \n$titre$")).toStrictEqual({
        block: "# title",
        translation: "titre",
    });
});
