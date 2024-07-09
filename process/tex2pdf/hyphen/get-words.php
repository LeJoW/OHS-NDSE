<?php

function getWords(string $text): array
{
    $raw_list = preg_split("/[^\wáéíóúæǽœàèùäëïöüÿ]+/i", $text, -1, PREG_SPLIT_NO_EMPTY);
    $filtered_list = array_filter($raw_list, function (string $word) {
        return strlen($word) > 2 && !preg_match("/\d|_/", $word);
    });
    return $filtered_list;
}

$input = file_get_contents("php://stdin");

echo join("\n", getWords($input));
