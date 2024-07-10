import { GenericElement } from "../Types/GenericElement";
import { DayTitle, OfficeTitle } from "../Types/titles";

export interface Adapter {
    render(dayTitle: DayTitle): string;
    render(officeTitle: OfficeTitle): string;
    render(element: GenericElement): string;
}
