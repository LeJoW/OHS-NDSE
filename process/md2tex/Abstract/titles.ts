import { adapterType } from "../../tex2pdf/adapter/adapter.t";

class Title {
    title: string;

    constructor(title: string) {
        this.title = title;
    }

    toString({ blocks }: adapterType): string {
        return blocks.makeSectionTitle(this.title);
    }
}

export class DayTitle extends Title {
    shortTitle: string;
    dayClass: string | null = null;

    constructor(title: string) {
        super(title);
        this.shortTitle = title;
    }

    toString({ blocks }: adapterType): string {
        return blocks.makeDayTite(this.title, this.dayClass, this.shortTitle);
    }
}

export class OfficeTitle extends Title {
    shortTitle: string;
    anchor: string | null = null;

    constructor(title: string) {
        super(title);
        this.shortTitle = title;
    }

    toString({ blocks }: adapterType): string {
        return [
            this.anchor ? blocks.setAnchor(this.anchor) : undefined,
            blocks.makeOfficeTitle(this.title, this.shortTitle),
        ].join("");
    }
}

export class LessonTitle extends Title {
    addendum: string | null = null;

    constructor(title: string) {
        super(title);
        this.title = title;
    }

    toString({ blocks }: adapterType): string {
        return blocks.makeChapterTitle(this.title, this.addendum);
    }
}

export class PsalmTitle extends Title {
    toString({ blocks }: adapterType): string {
        return blocks.makePsalmTitle(this.title);
    }
}

export class SectionTitle extends Title {}
