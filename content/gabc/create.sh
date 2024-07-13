#!zsh

inputTex=$1
name=$(basename "$inputTex" .tex)
outputPdf="build/$name.pdf"

lualatex --shell-escape --output-directory=build "$inputTex"
./pdfcrop --bbox "-1 * * *" "$outputPdf" "$outputPdf"
