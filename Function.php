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

function fill()
{
    foreach ($_SESSION['history'] as $value) {
        echo <<<HTML
<div class="table-content">
    <table>
        <tr>
            <td><?php echo $value[0] ?></th>
            <td><?php echo $value[1] ?></th>
            <td><?php echo $value[2] ?></th>
            <td><?php echo $value[3] ?></th>
            <td><?php echo $value[4] ?></th>
            <td><?php echo number_format($value[5], 10, ".", "")*1000000 ?></td>
        </tr>
    </table>
</div>
HTML;
    }
}
function tableFill(){    echo "<div class=\"table\" id=\"table\">
    <div class=\"table-header\" style=\"overflow-x: auto\">
        <span>X</span>
        <span>Y</span>
        <span>R</span>
        <span>Script time</span>
        <span>Time</span> 
    </div>
    <div class=\"table\">";

    foreach ($_SESSION['dataHistory'] as $value) {
        echo "<div class=\"table-row\">
                    <span>$value[0]</span>
                    <span>$value[1]</span>
                    <span>$value[2]</span>
                    <span>$value[3]</span>
                    <span>$value[4]</span>
                    <span>$value[5]</span>
                </div>";
    }
    echo "</div>
        </div>";}

    session_start();

    date_default_timezone_set('Europe/Moscow');
    $currentTime = date("H:i:s");
    $start = microtime(true);

    $x = (int)$_POST['x_val'];
    $y = (float)$_POST['y_val'];
    $r = (int)$_POST['r_val'];

    if (checkArea($x, $y, $r)) {
        http_response_code(400);
        return;
    }

    $res = check($x, $y, $r);
    $time = microtime(true) - $start;
    $result = array($x, $y, $r, $res, $time, $currentTime);

    if (!isset($_SESSION['history'])) {
        $_SESSION['history'] = array();
    }
    array_push($_SESSION['history'], $result);
    tableFill();
//include "table.php";
 /*   echo "<div class=\"table\" id=\"table\">
    <table class="table-header" style="overflow-x: auto">
        <tr>
            <th><a id="x-table" class="filter__link" href="#">X</a></th>
            <th><a id="y-table" class="filter__link filter__link--number" href="#">Y</a></th>
            <th><a id="r-table" class="filter__link filter__link--number" href="#">R</a></th>
            <th><a id="result-table" class="filter__link filter__link--number" href="#">Result</a></th>
            <th><a id="time-table" class="filter__link filter__link--number" href="#">Script Time</a></th>
            <th><a id="cr-time-table" class="filter__link filter__link--number" href="#">Time</a></th>
        </tr>
    </table>
    <?php 
         fill(); 
         ?>
</div>*/
