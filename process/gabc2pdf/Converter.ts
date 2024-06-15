import { Converter as ConverterInterface } from "./Converter.i";
import { System, NotADirError } from "./System.i";

export class Converter implements ConverterInterface {
    inputDir: string;
    outputDir: string;

    system: System;

    tmp = "./build";

    constructor(input: string, output: string, system: System) {
        if (!system.isDir(input)) throw new NotADirError(input);
        this.inputDir = input;
        if (!system.isDir(output)) throw new NotADirError(output);
        this.outputDir = output;

        this.system = system;
    }

    tryConvertingFromFile(inputPath: string): boolean {
        const file = `${this.inputDir}/${inputPath}.tex`;
        const hierarchy = this.system.getFileRelativeHierarchy(inputPath);
        const fileName = this.system.getFileName(inputPath);

        this.system.createRelativeHierarchy(this.outputDir, hierarchy);

        return this.system.exec(
            [
                `lualatex --output-directory=${this.tmp} ${file}`,
                `mv ${this.tmp}/${fileName}.pdf ${this.outputDir}/${inputPath}.pdf`,
            ].join(";")
        );
    }
}
