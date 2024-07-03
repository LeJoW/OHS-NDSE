#!php
<?php

function gabc2words(string $gabc): array
{
    $deleteNotes = preg_replace("/\(.*\)/U", "=", $gabc);
    $deleteSymbols = preg_replace("#(<sp>.+</sp>)|(\d)#", "", $deleteNotes);
    $deleteTags = preg_replace("#(</?\w>)#", "", $deleteSymbols);
    $deleteStrongHyphen = str_replace('-', '', $deleteTags);
    $given_hyphenated_words = preg_split("/\s+/", $deleteStrongHyphen);
    $given_hyphenated_words = array_map(function (string $word) {
        $trimed = trim($word, " \n\r\t\v\0=.:,;~*«»+_");
        return strtolower($trimed);
    }, $given_hyphenated_words);
    return array_filter($given_hyphenated_words);
}

function cmp(string $a, string $b): array
{
    $wordsA = preg_split("/\n/", $a, -1, PREG_SPLIT_NO_EMPTY);
    $wordsB = preg_split("/\n/", $b, -1, PREG_SPLIT_NO_EMPTY);

    return array_reduce(array_keys($wordsA), function (array $acc, int $key) use ($wordsA, $wordsB): array {
        if ($wordsA[$key] !== $wordsB[$key]) {
            return [...$acc, [$wordsA[$key], $wordsB[$key]]];
        }
        return $acc;
    }, []);
}

$files = preg_split("/\n/", `find . ! -name main.tex | grep -E '\.tex|\.gabc'`, -1, PREG_SPLIT_NO_EMPTY);

array_map(function (string $file) {
    $content = file_get_contents($file);
    $gabc = preg_replace("/^[\S\s]+gabc\w+\{([\S\s]+)\}[\S\s]+$/U", "$1", $content);
    if (strpos($gabc, "document")) {
        echo "Cannot parse file $file";
    } else {
        $given_hyphenated_words = gabc2words($gabc);
        $given_hyphenated_words = join("\n", $given_hyphenated_words);

        $raw_words = str_replace("=", "", $given_hyphenated_words);
        $compute_hyphenated_words = `echo "$raw_words" | example ../../process/tex2pdf/hyphen/hyph_la_VA_all.dic /dev/stdin`;

        $a = trim($compute_hyphenated_words);
        $b = trim($given_hyphenated_words);

        if ($a !== $b) {
            echo "File $file has wrong splits : \n";
            echo "expected\tgiven\n";
            $cmp = cmp($a, $b);
            array_map(function ($diff) {
                echo join("\t", $diff) . "\n";
            }, $cmp);
            echo "=============\n";
        }
    }
    echo PHP_EOL;
}, $files);
