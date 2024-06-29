export interface PsalmCache {
    getPsalmBuild(psalmDivision: string, ton: string): string[] | false;

    setPsalmBuild(psalmDivision: string, ton: string, psalm: string[]): boolean;
}
