import { Render } from "./Render.i";

const symbols: { [symb: string]: string } = {
    nbsp: "~",
};

export class TexRender implements Render {
    symbol(name: string): string {
        return symbols[name] || name;
    }
    orphan(type: string, attributes?: { [attr: string]: any }): string {
        return `{\\${type}${
            attributes
                ? Object.values(attributes)
                      .map(function (attr) {
                          return `{${attr}}`;
                      })
                      .join("")
                : ""
        }}`;
    }
    container(
        type: string,
        content: any,
        attributes?: { [attr: string]: any }
    ): string {
        return `\\begin{${type}}${
            attributes
                ? Object.values(attributes)
                      .map(function (attr) {
                          return `{${attr}}`;
                      })
                      .join("")
                : ""
        }${content || ""}\\end{${type}}`;
    }
    join(lines: (string | undefined)[]): string {
        return lines.join("\n\n");
    }
    concat(lines: (string | undefined)[]): string {
        return lines.join("\n");
    }
}
