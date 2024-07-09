function setTitleSpace(title: string): string {
    return title.replace(/\s+/g, "{\\titleSpace}");
}

export function makeDayTite(
    title: string,
    dayClass: string | null,
    short: string
) {
    return `\\dayTitle{${setTitleSpace(title)}}{${dayClass || ""}}{${short}}`;
}

export function makeOfficeTitle(title: string, short: string) {
    return `\\officeTitle{${setTitleSpace(title)}}{${short}}`;
}

export function makeSectionTitle(title: string) {
    return `\\sectionTitle{${title}}`;
}

export function makeChapterTitle(title: string, addendum: string | null) {
    return `\\chapterTitle{${title}}{${addendum || ""}}`;
}

export function makePsalmTitle(title: string | false) {
    return title ? `\\psalmTitle{${title}}` : "";
}
