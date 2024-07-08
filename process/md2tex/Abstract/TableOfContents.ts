import { adapterType } from "../../tex2pdf/adapter/adapter.t";

type tableEntry = { office: string; anchor: string };

export class TableOfContents {
    lastDayTitle: string | null = null;

    contents: { day: string | null; entries: tableEntry[] }[] = [];

    addDay(title: string): void {
        this.contents.push({ day: title, entries: [] });
    }
    addOffice(office: string): string {
        const anchor = this.generateAnchor(
            this.contents.length.toString(),
            office
        );
        if (this.contents.length === 0) {
            this.contents.push({
                day: null,
                entries: [{ office, anchor }],
            });
        } else {
            const lastDay = this.contents[this.contents.length - 1];
            lastDay.entries.push({ office, anchor });
        }
        return anchor;
    }

    private generateAnchor(dayTitle: string, officeTitle: string): string {
        return `e-${dayTitle}-${officeTitle}`;
    }

    toString({ blocks }: adapterType): string {
        return blocks.makeTableOfContents(this);
    }
}
