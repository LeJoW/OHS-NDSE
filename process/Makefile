OUTPUT_DIR=tex/build

all: $(OUTPUT_DIR)/core.pdf

$(OUTPUT_DIR)/core.pdf: tex/*.tex | $(OUTPUT_DIR)
	cd tex && lualatex --output-directory=build core.tex

tex/core.tex:
	ts-node md/main.ts ../content/dominica_in_palmis.md > build/dominica_in_palmis.tex

$(OUTPUT_DIR):
	mkdir -p $(OUTPUT_DIR)

clean:
	rm -rf $(OUTPUT_DIR)

.PHONY: all clean

gabc:
	rm -rf gabc;
	cp -r ../content/gabc gabc;
	for f in ./gabc/*.gabc; do echo $$f; gregorio $$f; done
	for f in ./gabc/**/*.gabc; do echo $$f; gregorio $$f; done
