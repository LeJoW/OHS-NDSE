<?php

const lefthyphenmin = 3;
const righthyphenmin = 3;

$input_hypheantion = file_get_contents("php://stdin");

$hyphenatesWords = preg_split("/\n/", $input_hypheantion);

$corrected = array_map(function ($line) {
    $syllabes = explode('=', trim($line));
    $first = array_shift($syllabes) ?? "";
    $last = array_pop($syllabes) ?? "";

    $output = $first;
    if (strlen($first) < lefthyphenmin) {
        $output .= join('-', $syllabes);
    } else if (count($syllabes) > 0) {
        $output .= '-' . join('-', $syllabes);
    }

    if (strlen($last) < righthyphenmin) {
        $output .= $last;
    } else if ($last !== "") {
        $output .= "-$last";
    }

    return $output;
}, $hyphenatesWords);

echo join("\n", $corrected);
