MARKDOWN=../content
WORK_DIR=tex2pdf
SOURCE=$(WORK_DIR)/source
OUTPUT_DIR=$(WORK_DIR)/build

TXT_FILES=$(wildcard $(MARKDOWN)/psalms/*.txt)
JSON_FILES_FROM_TXT=$(TXT_FILES:$(MARKDOWN)/psalms/%.txt=buildPsalm/psalms/%.json)

MD_FILES=$(wildcard $(MARKDOWN)/*.md)
TEX_FILES_FROM_MD=$(MD_FILES:$(MARKDOWN)/%.md=$(SOURCE)/%.tex)

LATEX_FILES=$(wildcard $(MARKDOWN)/*.tex)
COPIED_LATEX_FILES=$(LATEX_FILES:$(MARKDOWN)/%.tex=$(SOURCE)/%.tex)

WDS_FILES_FROM_MD=$(MD_FILES:$(MARKDOWN)/%.md=$(SOURCE)/%.wds)
WDS_FILES_FROM_TXT=$(TXT_FILES:$(MARKDOWN)/psalms/%.txt=$(SOURCE)/%.wds)

all: $(OUTPUT_DIR)/core.pdf

$(OUTPUT_DIR)/core.pdf: $(TEX_FILES_FROM_MD) $(COPIED_LATEX_FILES) $(JSON_FILES_FROM_TXT) $(WORK_DIR)/core.tex $(SOURCE)/hyphens.tex | $(OUTPUT_DIR)
	cd $(WORK_DIR) && lualatex --output-directory=build core.tex

$(SOURCE)/%.tex: $(MARKDOWN)/%.md | $(SOURCE)
	node dist/md2tex/main.js parse $< -o $@

$(SOURCE)/%.tex: $(MARKDOWN)/%.tex | $(SOURCE)
	cp $< $@

buildPsalm/psalms/%.json: $(MARKDOWN)/psalms/%.txt | buildPsalm
	cat $< | php buildPsalm/parsePsalms.php > $@

$(SOURCE)/hyphens.tex: $(WDS_FILES_FROM_MD) $(WDS_FILES_FROM_TXT)
	echo "\\hyphenation{" > $@
	cat $(SOURCE)/*.wds | example $(WORK_DIR)/hyphen/hyph_la_VA.dic /dev/stdin | php tex2pdf/hyphen/adjust-hyphenation.php >> $@
	echo "}" >> $@

$(SOURCE)/%.wds: $(MARKDOWN)/%.md | $(SOURCE)
	cat $< | php $(WORK_DIR)/hyphen/get-words.php > $@

$(SOURCE)/%.wds: $(MARKDOWN)/psalms/%.txt | $(SOURCE)
	cat $< | php $(WORK_DIR)/hyphen/get-words.php > $@

$(SOURCE):
	mkdir -p $(SOURCE)

$(OUTPUT_DIR):
	mkdir -p $(OUTPUT_DIR)

buildPsalm:
	mkdir -p buildPsalm

clean:
	rm -rf $(OUTPUT_DIR) $(SOURCE)

.PHONY: all clean
