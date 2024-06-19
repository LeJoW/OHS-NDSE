import { Converter } from "./Converter";
import { System } from "./System";

test("Converter", function () {
    const converter = new Converter(
        "../content/gabc",
        "tex2pdf/build",
        new System()
    );
    expect(converter.tryConvertingFromFile("Nothing")).toBe(false);
});
