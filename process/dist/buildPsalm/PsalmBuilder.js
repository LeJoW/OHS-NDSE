"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PsalmBuilder = void 0;
const tons_1 = require("./tons");
class PsalmBuilder {
    constructor(syllabifier, { strings }, psalmList, psalmCache) {
        this.syllabifier = syllabifier;
        this.strAdapter = strings;
        this.psalmList = psalmList;
        this.psalmCache = psalmCache;
    }
    buildPsalm(psalmDivision, ton) {
        const cached = this.psalmCache.getPsalmBuild(psalmDivision, ton);
        if (cached) {
            return cached;
        }
        const psalm = this.setUpPsalm(this.psalmList.getPsalm(psalmDivision), ton);
        this.psalmCache.setPsalmBuild(psalmDivision, ton, psalm);
        return psalm;
    }
    setUpPsalm(verses, ton) {
        if (tons_1.tons[ton] === undefined) {
            throw new Error(`The ton ${ton} is not configured.`);
        }
        const tonConfig = tons_1.tons[ton];
        return verses.map((verse) => this.setUpVerse(verse, tonConfig));
    }
    setUpVerse(verse, { mediante, end }) {
        if (verse.length < 2) {
            throw new Error("A verse must contain at least two elements.");
        }
        const protase = verse.slice(0, -2).join(" ");
        const [apex, appodose] = verse.slice(-2);
        return [
            protase + (protase.length > 0 ? this.strAdapter.cruxSymbol : ""),
            this.setUpHalfVerse(apex, mediante) + this.strAdapter.starSymbol,
            this.setUpHalfVerse(appodose, end),
        ]
            .join(" ")
            .trim();
    }
    setUpHalfVerse(halfVerse, [preparationSyllabsCount, accents]) {
        const rec = (output, accentsLeft, before) => {
            if (accentsLeft > 0 && before.length >= 2) {
                const { before: newBefore, accent, after } = this.getLastAccent(before);
                return rec(this.setUpPostTonicSyllabs(accent, after) + output, accentsLeft - 1, newBefore);
            }
            return (this.setUpPreparationSyllabs(before, preparationSyllabsCount) +
                output);
        };
        const syllabs = this.syllabifier.getSyllabsOf(halfVerse);
        return rec("", accents, syllabs);
    }
    getLastAccent(syllabs) {
        const syllab1 = syllabs.pop();
        const syllab2 = syllabs.pop();
        if (syllab1 === undefined || syllab2 === undefined) {
            throw new Error("This verse is too short");
        }
        const output = {
            before: syllabs,
            accent: syllab2,
            after: [syllab1],
        };
        if (this.isFalseAccent(output)) {
            return this.shiftSyllabsRight(output);
        }
        return output;
    }
    setUpPostTonicSyllabs(accent, after) {
        return (this.setSyllabStyle(accent, this.strAdapter.bold) + after.join(""));
    }
    setUpPreparationSyllabs(versePart, preparationSyllabsCount) {
        if (preparationSyllabsCount === 0) {
            return versePart.join("");
        }
        const roman = versePart.slice(0, -preparationSyllabsCount).join("");
        const italic = versePart.slice(-preparationSyllabsCount).join("");
        return roman + this.setSyllabStyle(italic, this.strAdapter.italic);
    }
    isFalseAccent({ before, accent, after }) {
        const beforeReversed = before.reduce(function (acc, item) {
            return [item, ...acc];
        }, []);
        return (beforeReversed.length !== 0 &&
            !this.isLastSyllab(beforeReversed[0]) &&
            (this.isAccentuatedSyllab(beforeReversed[0]) ||
                ((beforeReversed.length === 1 ||
                    this.isLastSyllab(beforeReversed[1])) &&
                    this.isLastSyllab(accent))));
    }
    isLastSyllab(syllab) {
        return /\s$/.test(syllab);
    }
    isAccentuatedSyllab(syllab) {
        return /[áéíóúǽœ́]/i.test(syllab);
    }
    shiftSyllabsRight({ before, accent, after, }) {
        const trueAccent = before.pop();
        if (trueAccent === undefined) {
            throw new Error("This selection cannot be empty before accent to shift right.");
        }
        return {
            before: before,
            accent: trueAccent,
            after: [accent, ...after],
        };
    }
    setSyllabStyle(syllab, style) {
        return syllab.replace(/([\wáéíóúǽæœ́œ]+)/gi, (_, syllab) => style(syllab));
    }
}
exports.PsalmBuilder = PsalmBuilder;
