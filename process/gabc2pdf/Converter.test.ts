import { Converter } from "./Converter";

test("Converter", function () {
    const converter = new Converter("../content/gabc", "tex2pdf/build");
    expect(converter.tryConvertingFromFile("Deus_in_adiutorium"));
});
