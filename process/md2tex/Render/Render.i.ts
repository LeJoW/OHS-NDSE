export interface Render {
    symbol(name: string): string;
    inline(type: string, attributes?: { [attr: string]: any }): string;
    block(
        type: string,
        content: any,
        attributes?: { [attr: string]: any }
    ): string;
    join(lines: (string | undefined)[]): string;
    concat(lines: (string | undefined)[]): string;
}