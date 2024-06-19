import { Converter as ConverterInterface } from "./Converter.i";
import { System, NotADirError } from "./System.i";

export class Converter implements ConverterInterface {
    inputDir: string;
    outputDir: string;

    system: System;

    constructor(input: string, output: string, system: System) {
        if (!system.isDir(input)) throw new NotADirError(input);
        this.inputDir = input;
        if (!system.isDir(output)) throw new NotADirError(output);
        this.outputDir = output;

        this.system = system;
    }

    tryConvertingFromFile(inputPath: string): boolean {
        const targetFile = `${this.outputDir}/${inputPath}.pdf`;

        if (this.system.fileExists(targetFile)) {
            return true;
        }

        const file = `${this.inputDir}/${inputPath}`;
        const sourceFile = this.system.getAbsolutePath(`${file}.tex`);

        if (!this.system.fileExists(sourceFile)) {
            return false;
        }

        const hierarchy = this.system.getFileRelativeHierarchy(inputPath);
        const fileName = this.system.getFileName(inputPath);

        this.system.createRelativeHierarchy(this.outputDir, hierarchy);

        const cmd = [
            `cd "${this.system.parentDir(sourceFile)}"`,
            `lualatex --shell-escape --output-directory="${this.system.tmp}" "${sourceFile}"`,
            `mv "${this.system.tmp}/${fileName}.pdf" "${this.system.parentDir(
                targetFile
            )}"`,
        ].join(" && ");

        return this.system.exec(cmd);
    }
}
