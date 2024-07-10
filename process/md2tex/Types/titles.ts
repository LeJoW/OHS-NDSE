import { Render } from "../Render/Render.i";
import { GenericElement } from "./GenericElement";

class Title extends GenericElement {
    title: string;

    constructor(title: string) {
        super(title);
        this.title = title;
    }

    toString(render: Render): string {
        return render.block("sectionTitle", this.title);
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

    toString(render: Render): string {
        return render.block("dayTitle", this.title, {
            class: this.dayClass,
            short: this.shortTitle,
        });
    }
}

export class OfficeTitle extends Title {
    shortTitle: string;
    anchor: string | null = null;

    constructor(title: string) {
        super(title);
        this.shortTitle = title;
    }

    toString(render: Render): string {
        return render.concat([
            this.anchor
                ? render.inline("anchor", { label: this.anchor })
                : undefined,
            render.block("officeTitle", this.title, {
                short: this.shortTitle,
            }),
        ]);
    }
}

export class LessonTitle extends Title {
    addendum: string | null = null;

    constructor(title: string) {
        super(title);
        this.title = title;
    }

    toString(render: Render): string {
        return render.block("dayTitle", this.title, {
            addendum: this.addendum,
        });
    }
}

export class PsalmTitle extends Title {
    toString(render: Render): string {
        return render.block("psalmTitle", this.title);
    }
}

export class SectionTitle extends Title {}
