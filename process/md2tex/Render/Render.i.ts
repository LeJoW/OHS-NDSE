export interface Render {
    symbol(name: string): string;
    orphan(type: string, attributes?: { [attr: string]: any }): string;
    container(
        type: string,
        content: any,
        attributes?: { [attr: string]: any }
    ): string;
    join(lines: (string | undefined)[]): string;
    concat(lines: (string | undefined)[]): string;
}
