#!zsh

inputTex=$1
name=$(basename "$inputTex" .tex)
outputPdf="build/$name.pdf"

#lualatex --shell-escape --output-directory=build "$inputTex"

script='
#<?php
$pages_boxes_str = file_get_contents("php://stdin");
$pages_boxes_arr = preg_split("/\n/", $pages_boxes_str, -1, PREG_SPLIT_NO_EMPTY);
$data = array_map(function ($line) {
    return preg_replace("/^.+\:(.+)$/", "$1", $line);
}, $pages_boxes_arr);
print_r($data);
#?>
'

pdfcrop --verbose "$outputPdf" /dev/null | grep "* Page" | php -r "$script"
#pdfcrop "$outputPdf" "$outputPdf"
