#!zsh

inputTex=$1
name=$(basename "$inputTex" .tex)
outputPdf="build/$name.pdf"

lualatex --shell-escape --output-directory=build "$inputTex"
#pdfcrop "$outputPdf" "$outputPdf"
c