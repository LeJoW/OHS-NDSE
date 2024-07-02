export class Table {
    content: {
        mode: number;
        label: string;
        anchor: string;
        type: string;
    }[] = [];

    addChant(title: string, ton: number, type: string): string {
        const anchor = this.generateAnchor(title, this.content.length);
        this.content.push({ mode: ton, label: title, anchor, type });
        return anchor;
    }

    getTableSorted(): {
        [type: string]: {
            mode: number;
            label: string;
            anchor: string;
        }[];
    } {
        const table = this.content.reduce(function (
            acc: ReturnType<typeof Table["prototype"]["getTableSorted"]>,
            { mode, label, anchor, type }
        ) {
            const next = { mode, label, anchor };
            if (acc[type]) {
                acc[type].push(next);
            } else {
                acc[type] = [next];
            }
            return acc;
        },
        {});
        Object.entries(table).map(function ([type, list]) {
            table[type] = list.sort(function ({ label: a }, { label: b }) {
                return a.localeCompare(b);
            });
        });
        return table;
    }

    private generateAnchor(title: string, id: number): string {
        return `n${id}-${title.replace(/(\W)/g, "-")}`;
    }
}
