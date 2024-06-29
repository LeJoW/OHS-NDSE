<?php

$input = file_get_contents("php://stdin");

$psalmWithVersesPerLigne = preg_replace("/(\s*\n\s+)/", "=", $input);

$psalm = preg_split("/\n/", $psalmWithVersesPerLigne, -1, PREG_SPLIT_NO_EMPTY);

$output = array_map(function (string $verse): array {
    return preg_split("/\s*[=+]\s*/", $verse);
}, $psalm);

echo json_encode($output);
