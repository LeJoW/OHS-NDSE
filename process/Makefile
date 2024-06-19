MARKDOWN=../content
WORK_DIR=tex2pdf
SOURCE=$(WORK_DIR)/source
OUTPUT_DIR=$(WORK_DIR)/build

MD_FILES=$(wildcard $(MARKDOWN)/*.md)
TEX_FILES_FROM_MD=$(MD_FILES:$(MARKDOWN)/%.md=$(SOURCE)/%.tex)

LATEX_FILES=$(wildcard $(MARKDOWN)/*.tex)
COPIED_LATEX_FILES=$(LATEX_FILES:$(MARKDOWN)/%.tex=$(SOURCE)/%.tex)

all: $(OUTPUT_DIR)/core.pdf

$(OUTPUT_DIR)/core.pdf: $(TEX_FILES_FROM_MD) $(COPIED_LATEX_FILES) $(WORK_DIR)/*.tex $(SOURCE)/hyphens.tex | $(OUTPUT_DIR)
	cd $(WORK_DIR) && lualatex --output-directory=build core.tex

$(SOURCE)/%.tex: $(MARKDOWN)/%.md | $(SOURCE)
	ts-node md2tex/main.ts parse $< -o $@ -w $(basename $@).wds

$(SOURCE)/%.tex: $(MARKDOWN)/%.tex | $(SOURCE)
	cp $< $@

$(SOURCE)/hyphens.tex: $(TEX_FILES_FROM_MD)
	echo "\\hyphenation{" > $@
	cat $(SOURCE)/*.wds | example $(WORK_DIR)/hyphen/hyph_la_VA.dic /dev/stdin | sed 's/=/-/g' >> $@
	echo "}" >> $@

$(SOURCE):
	mkdir -p $(SOURCE)

$(OUTPUT_DIR):
	mkdir -p $(OUTPUT_DIR)

clean:
	rm -rf $(OUTPUT_DIR) $(SOURCE)

.PHONY: all clean
