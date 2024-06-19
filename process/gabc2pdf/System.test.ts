import { System } from "./System";

test("sys", function () {
    const system = new System();

    expect(system.isDir("gabc2pdf")).toStrictEqual(true);

    expect(system.getFileName("")).toStrictEqual("");
    expect(system.getFileName("aze")).toStrictEqual("aze");
    expect(system.getFileName("aze/zer")).toStrictEqual("zer");

    expect(system.getFileRelativeHierarchy("aze/zer/ert")).toStrictEqual(
        "aze/zer"
    );

    expect(system.exec("")).toBe(false);
    expect(system.exec('echo "\\a"')).toBe(true);

    expect(system.fileExists("")).toStrictEqual(false);
});
