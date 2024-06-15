import Engine from "./Engine";

test("block-operators", function () {
    function replaceDefault(input: string): string {
        return input;
    }
    const titleReplace = replaceDefault;
    function accentReplace(_: string): string {
        return "\\'e";
    }

    const engine = new Engine(
        {
            desc: [{ test: /^#+/, callback: titleReplace }],
            defaultCase: replaceDefault,
        },
        [{ test: /(é)/, callback: accentReplace }]
    );

    expect(engine.getBlockConverter("Lambda text")).toStrictEqual({
        mask: /(?:)/,
        replace: replaceDefault,
    });

    expect(engine.getBlockConverter("# Title text")).toStrictEqual({
        mask: /^#+/,
        replace: titleReplace,
    });

    expect(engine.getStringConverter()).toStrictEqual([
        {
            mask: /(é)/,
            replace: accentReplace,
        },
    ]);
});
