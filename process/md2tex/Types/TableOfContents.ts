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
}
