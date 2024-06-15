export interface Converter {
    inputDir: string;
    outputDir: string;

    tryConvertingFromFile(fileName: string): boolean;
}
