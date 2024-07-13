import { Cantus } from "../Types/Cantus";
import { GenericElement } from "../Types/GenericElement";
import { Lesson, ParagraphLettrine, Rubric } from "../Types/paragraphs";
import { Psalmus, Psalterium } from "../Types/Psalterium";
import { TableOfContents } from "../Types/TableOfContents";
import { DayTitle, LessonTitle, OfficeTitle, Title } from "../Types/titles";

export interface Adapter {
    translation: boolean;

    render(element: DayTitle): string;
    render(element: OfficeTitle): string;
    render(element: LessonTitle): string;
    render(element: Title): string;
    render(element: ParagraphLettrine): string;
    render(element: Cantus): string;
    render(element: Psalmus): string;
    render(element: Psalterium): string;
    render(element: Rubric): string;
    render(element: Lesson): string;
    render(element: TableOfContents): string;
    render(element: GenericElement): string;

    chars: {
        italic(text: string): string;
        bold(text: string): string;
        roman(text: string): string;
    };

    symbols: {
        star: string;
        cross: string;
        nbsp: string;
        ampersand: string;
        parnumber: string;
    };
}
