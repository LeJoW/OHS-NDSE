#!zsh

inputTex=$1
name=$(basename "$inputTex" .tex)
inputGabc="${inputTex/.tex/.gabc}"

outputGabc="build/$name.gtex"
outputPdf="build/$name.pdf"

gregorio "$inputGabc" -o "$outputGabc"
lualatex --output-directory=build "$inputTex"
pdfcrop "$outputPdf" "$outputPdf"
