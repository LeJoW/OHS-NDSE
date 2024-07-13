import { GenericElement } from "../Types/GenericElement";
import { Adapter as AdapterInterface } from "./Adapter.i";
import { Render } from "../Render/Render.i";
import { DayTitle, LessonTitle, OfficeTitle, Title } from "../Types/titles";
import { Psalmus, Psalterium } from "../Types/Psalterium";
import { Cantus } from "../Types/Cantus";
import { Lesson, ParagraphLettrine, Rubric } from "../Types/paragraphs";
import { TableOfContents } from "../Types/TableOfContents";

export class Adapter implements AdapterInterface {
    translation: boolean = false;
    engine: Render;
    symbols: {
        star: string;
        cross: string;
        nbsp: string;
        ampersand: string;
        parnumber: string;
    };
    chars = {
        italic: (text: string) => this.engine.orphan("italic", { value: text }),
        bold: (text: string) => this.engine.orphan("bold", { value: text }),
        roman: (text: string) => this.engine.orphan("roman", { value: text }),
    };

    constructor(render: Render) {
        this.engine = render;
        this.symbols = {
            star: this.engine.orphan("gstella"),
            cross: this.engine.orphan("gcrux"),
            ampersand: this.engine.orphan("ampersand"),
            nbsp: this.engine.symbol("nbsp"),
            parnumber: this.engine.orphan("forcebreak"),
        };
    }

    render(element: GenericElement): string {
        if (element instanceof DayTitle) {
            return this.renderDayTitle(
                element.title,
                element.dayClass,
                element.shortTitle
            );
        } else if (element instanceof OfficeTitle) {
            return this.renderOfficeTitle(
                element.title,
                element.anchor,
                element.shortTitle
            );
        } else if (element instanceof LessonTitle) {
            return this.renderLessonTitle(element.title, element.addendum);
        } else if (element instanceof Title) {
            return this.renderTitle(element.title);
        } else if (element instanceof Psalterium) {
            return this.renderPsalterium(element.intonation, element.psalms);
        } else if (element instanceof Psalmus) {
            return this.renderPsalmus(element);
        } else if (element instanceof ParagraphLettrine) {
            return this.renderParLettrine(element.text);
        } else if (element instanceof Cantus) {
            return this.renderCantus(element.scorePath, element.anchor);
        } else if (element instanceof Rubric) {
            return this.renderRubric(element.text);
        } else if (element instanceof Lesson) {
            return this.renderLesson(element.text);
        } else if (element instanceof TableOfContents) {
            return this.renderTableOfContents(element.contents);
        } else {
            return element.content;
        }
    }

    private renderDayTitle(
        title: string,
        dayClass: string | null,
        short: string
    ): string {
        return this.engine.orphan("dayTitle", {
            title,
            dayClass: dayClass || "",
            short,
        });
    }

    private renderOfficeTitle(
        title: string,
        anchor: string | null,
        short: string
    ): string {
        return this.engine.concat([
            anchor ? this.engine.orphan("anchor", { href: anchor }) : undefined,
            this.engine.orphan("officeTitle", {
                title,
                short,
            }),
        ]);
    }

    private renderLessonTitle(title: string, ref: string | null): string {
        return this.engine.orphan("lessonTitle", {
            title,
            ref: ref || "",
        });
    }

    private renderPsalterium(
        intonation: Cantus | false,
        psalms: Psalmus[]
    ): string {
        const beforePsalmBody: string[] = [];
        let psalmBody;
        if (intonation && psalms.length > 0) {
            const firstPsalm = psalms[0];
            beforePsalmBody.push(
                this.engine.concat([
                    firstPsalm.title
                        ? this.engine.orphan("psalmTitle", {
                              title: firstPsalm.title,
                          })
                        : undefined,
                    firstPsalm.anchor
                        ? this.engine.orphan("anchor", {
                              href: firstPsalm.anchor,
                          })
                        : undefined,
                ]),
                this.render(intonation)
            );
            psalmBody = [
                this.engine.container(
                    "psalm",
                    this.engine.join(firstPsalm.versi.slice(1))
                ),
                ...psalms.slice(1).map((psalm) => this.render(psalm)),
            ];
        } else {
            psalmBody = psalms.map((psalm) => this.render(psalm));
        }

        return this.engine.container(
            "psalterium",
            this.engine.join([
                ...beforePsalmBody,
                this.engine.container("psalmBody", this.engine.join(psalmBody)),
            ])
        );
    }

    private renderPsalmus(psalm: Psalmus): string {
        return this.engine.join([
            this.engine.concat([
                psalm.title
                    ? this.engine.orphan("psalmTitle", { title: psalm.title })
                    : undefined,
                psalm.anchor
                    ? this.engine.orphan("anchor", { href: psalm.anchor })
                    : undefined,
            ]),
            this.render(new ParagraphLettrine(psalm.versi[0])),
            this.engine.container(
                "psalm",
                this.engine.join(psalm.versi.slice(1))
            ),
        ]);
    }

    private renderParLettrine(text: string): string {
        return this.engine.container("paragraphLettrine", text.slice(1), {
            initial: text[0] || "",
        });
    }

    private renderCantus(file: string, anchor: string | null): string {
        return this.engine.concat([
            anchor ? this.engine.orphan("anchor", { href: anchor }) : undefined,
            this.engine.orphan("cantus", { file }),
        ]);
    }

    private renderRubric(text: string): string {
        return this.engine.container("rubric", text);
    }

    private renderLesson(text: string): string {
        return this.engine.container("lesson", this.renderParLettrine(text));
    }

    private renderTitle(title: string): string {
        return this.engine.orphan("sectionTitle", { title });
    }

    private renderTableOfContents(
        contents: TableOfContents["contents"]
    ): string {
        return this.engine.container(
            "tableOfContents",
            this.engine.join(
                contents.map(({ day, entries }) =>
                    this.engine.container(
                        "tableSection",
                        this.engine.join([
                            day !== null
                                ? this.engine.orphan("tableSectionTitle", {
                                      day: day.shortTitle,
                                  })
                                : undefined,
                            this.engine.container(
                                "sectionEntries",
                                this.engine.join(
                                    entries.map(({ office, anchor }) =>
                                        this.engine.orphan("sectionEntry", {
                                            office: office.shortTitle,
                                            anchor,
                                        })
                                    )
                                )
                            ),
                        ])
                    )
                )
            )
        );
    }
}
