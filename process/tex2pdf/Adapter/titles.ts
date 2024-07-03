function setTitleSpace(title: string): string {
    return title.replace(/\s+/g, "{\\titleSpace}");
}

export function makeDayTite(title: string, dayClass: string, short: string) {
    return `\\dayTitle{${setTitleSpace(title)}}{${dayClass}}{${short}}`;
}

export function makeOfficeTitle(title: string, short: string, anchor: string) {
    return `\\label{${anchor}}\\officeTitle{${setTitleSpace(title)}}{${
        short.length > 0 ? short : title
    }}`;
}

export function makeSectionTitle(title: string) {
    return `\\sectionTitle{${title}}`;
}

export function makeChapterTitle(title: string, addendum: string) {
    return `\\chapterTitle{${title}}{${addendum}}`;
}

export function makePsalmTitle(title: string) {
    return `\\psalmTitle{${title}}`;
}
