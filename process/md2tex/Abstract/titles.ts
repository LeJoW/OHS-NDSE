import { adapterType } from "../../tex2pdf/adapter/adapter.t";
import { GenericElement } from "./GenericElement";

class Title extends GenericElement {
    title: string;

    constructor(title: string) {
        super(title);
        this.title = title;
    }

    toString({ blocks }: adapterType, translation: boolean): string {
        return blocks.makeSectionTitle(this.title);
    }
}

export class DayTitle extends Title {
    shortTitle: string;
    dayClass: string | null = null;
    translation:
        | { title: string; dayClass: string; short: string }
        | false = false;

    constructor(title: string) {
        super(title);
        this.shortTitle = title;
    }

    setTranslation(translation: DayTitle["translation"]): void {
        this.translation = translation;
    }

    toString({ blocks }: adapterType, translation: boolean): string {
        if (translation && this.translation) {
            this.title = this.translation.title;
            this.dayClass = this.translation.dayClass;
            this.shortTitle = this.translation.short;
        }
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
