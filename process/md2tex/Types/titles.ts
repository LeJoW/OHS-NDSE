import { GenericElement } from "./GenericElement";

class Title extends GenericElement {
    title: string;

    constructor(title: string) {
        super(title);
        this.title = title;
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
}

export class OfficeTitle extends Title {
    shortTitle: string;
    anchor: string | null = null;

    constructor(title: string) {
        super(title);
        this.shortTitle = title;
    }
}

export class LessonTitle extends Title {
    addendum: string | null = null;

    constructor(title: string) {
        super(title);
        this.title = title;
    }
}

export class PsalmTitle extends Title {}

export class SectionTitle extends Title {}
