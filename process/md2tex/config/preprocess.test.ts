import { preprocess } from "./preprocess";

test("", function () {
    expect(preprocess("")).toStrictEqual([""]);

    expect(preprocess("Test")).toStrictEqual(["Test"]);

    expect(preprocess("Test\n\net retest")).toStrictEqual([
        "Test",
        "et retest",
    ]);

    expect(preprocess("Test\n\n$et retest$")).toStrictEqual([
        "Test $et retest$",
    ]);

    expect(preprocess("Test\n\n$\net retest\n$")).toStrictEqual([
        "Test $et retest$",
    ]);
});
