import { adapterType } from "../../tex2pdf/adapter/adapter.t";
import { GenericElement } from "./GenericElement";
import { DayTitle, OfficeTitle } from "./titles";

type tableEntry = { office: string; anchor: string };

export class TableOfContents extends GenericElement {
    lastDayTitle: string | null = null;

    contents: { day: string | null; entries: tableEntry[] }[] = [];

    addDay(title: DayTitle): void {
        this.contents.push({ day: title.shortTitle, entries: [] });
    }
    addOffice(office: OfficeTitle) {
        const anchor = this.generateAnchor(
            this.contents.length.toString(),
            office.shortTitle
        );
        if (this.contents.length === 0) {
            this.contents.push({
                day: null,
                entries: [{ office: office.shortTitle, anchor }],
            });
        } else {
            const lastDay = this.contents[this.contents.length - 1];
            lastDay.entries.push({ office: office.shortTitle, anchor });
        }
        office.anchor = anchor;
    }

    private generateAnchor(dayTitle: string, officeTitle: string): string {
        return `e-${dayTitle}-${officeTitle}`;
    }

    toString({ blocks }: adapterType): string {
        return blocks.makeTableOfContents(this);
    }
}
