import { Render } from "../Render/Render.i";
import { GenericElement } from "./GenericElement";
import { DayTitle, OfficeTitle } from "./titles";

type tableEntry = { office: OfficeTitle; anchor: string };

export class TableOfContents extends GenericElement {
    lastDayTitle: string | null = null;

    contents: { day: DayTitle | null; entries: tableEntry[] }[] = [];

    addDay(title: DayTitle): void {
        this.contents.push({ day: title, entries: [] });
    }
    addOffice(office: OfficeTitle) {
        const anchor = this.generateAnchor(
            this.contents.length.toString(),
            office.shortTitle
        );
        if (this.contents.length === 0) {
            this.contents.push({
                day: null,
                entries: [{ office: office, anchor }],
            });
        } else {
            const lastDay = this.contents[this.contents.length - 1];
            lastDay.entries.push({ office, anchor });
        }
        office.anchor = anchor;
    }

    private generateAnchor(dayTitle: string, officeTitle: string): string {
        return `e-${dayTitle}-${officeTitle}`;
    }

    toString(render: Render): string {
        return render.block(
            "tableOfContents",
            render.join(
                this.contents.map(function ({ day, entries }) {
                    return render.block(
                        "tableSection",
                        render.join([
                            day === null
                                ? undefined
                                : render.inline("tableSectionTitle", {
                                      value: day.shortTitle,
                                  }),
                            render.block(
                                "sectionEntries",
                                render.join(
                                    entries.map(function ({ office, anchor }) {
                                        return render.inline("sectionEntry", {
                                            value: office.shortTitle,
                                            anchor,
                                        });
                                    })
                                )
                            ),
                        ])
                    );
                })
            )
        );
    }
}
