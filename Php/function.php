<?php
function check($x, $y, $r)
{
    if (($x >= -$r / 2 && $x <= 0 && $y <= $r && $y >= 0) ||
        ($y >= ($x - $r ) && $y <= 0 && $x <= 0) ||
        (($x * $x + $y * $y) <= $r * $r / 4 && $x >= 0 && $y >= 0)) {
        return "<span style='color: green'>True</span>";
    } else {
        return "<span style='color: red'>False</span>";

    }
}

function checkArea($x, $y, $r)
{
    return !in_array($x, array(-3, -2, -1, 0, 1, 2, 3, 4, 5))
        || !is_numeric($y) || $y < -3 || $y > 5 ||
        !in_array($r, array(1, 2, 3, 4, 5));
}

session_start();

date_default_timezone_set('Europe/Moscow');
$currentTime = date("H:i:s");
$start = microtime(true);

//console.log("time");


$x = (int)$_POST['x_val'];
$y = (float)$_POST['y_val'];
$r = (int)$_POST['r_val'];

//console.log("vals");

if (checkArea($x, $y, $r)) {
    http_response_code(400);
    return;
}

$res = check($x, $y, $r);
$time = microtime(true) - $start;
$result = array($x, $y, $r, $currentTime, $time, $res);

//console.log("ready");


if (!isset($_SESSION['history'])) {
    $_SESSION['history'] = array();
   // console.log("session");

}

array_push($_SESSION['history'], $result);
//console.log("array");

include "table.php";
