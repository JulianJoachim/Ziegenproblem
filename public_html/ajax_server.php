<?php

session_start();

if (isset($_POST["exit"])) {
    echo $_SESSION["firstPickGoat"] . "|";
    echo $_SESSION["firstPickCar"] . "|";
    echo $_SESSION["secondPickGoat"] . "|";
    echo $_SESSION["secondPickCar"] . "|";
    session_destroy();
    session_start();
}

if (isset($_POST["restart"])) {
    $_SESSION["round"] = 1;
}

if (!isset($_SESSION["round"])) {
    $_SESSION["round"] = 1;
    $_SESSION["firstPickCar"] = 0;
    $_SESSION["firstPickGoat"] = 0;
    $_SESSION["secondPickCar"] = 0;
    $_SESSION["secondPickGoat"] = 0;
}

if (isset($_POST["id"])) {
    switch ($_SESSION["round"]) {
        case 1:
            $_SESSION["doorIdCar"] = rand(0, 2);
            if ($_POST["id"] == $_SESSION["doorIdCar"]) {

                $_SESSION["firstPickCar"]++;

                $rng = rand(0, 1);
                switch ($_POST["id"]) {
                    case 0:
                        if ($rng === 0) {
                            $_SESSION["firstOpen"] = "1";
                        } else {
                            $_SESSION["firstOpen"] = "2";
                        }
                        break;
                    case 1:
                        if ($rng === 0) {
                            $_SESSION["firstOpen"] = "0";
                        } else {
                            $_SESSION["firstOpen"] = "2";
                        }
                        break;
                    case 2:
                        if ($rng === 0) {
                            $_SESSION["firstOpen"] = "0";
                        } else {
                            $_SESSION["firstOpen"] = "1";
                        }
                        break;
                }
                $_SESSION["round"]++;
                echo $_SESSION["firstOpen"];
            } else {

                $_SESSION["firstPickGoat"]++;

                switch ($_POST["id"]) {

                    case 0:
                        if ($_SESSION["doorIdCar"] == 1) {
                            $_SESSION["firstOpen"] = "2";
                        } else {
                            $_SESSION["firstOpen"] = "1";
                        }
                        break;
                    case 1:
                        if ($_SESSION["doorIdCar"] == 0) {
                            $_SESSION["firstOpen"] = "2";
                        } else {
                            $_SESSION["firstOpen"] = "0";
                        }
                        break;
                    case 2:
                        if ($_SESSION["doorIdCar"] == 0) {
                            $_SESSION["firstOpen"] = "1";
                        } else {
                            $_SESSION["firstOpen"] = "0";
                        }
                        break;
                }
                $_SESSION["round"]++;
                echo $_SESSION["firstOpen"];
            }

            break;
        case 2:
            if ($_POST["id"] == $_SESSION["doorIdCar"]) {
                $_SESSION["secondPickCar"]++;
                $_SESSION["round"]++;
                echo "win|";
                echo $_SESSION["doorIdCar"];
            } else {
                $_SESSION["secondPickGoat"]++;
                $_SESSION["round"]++;
                echo "lose|";
                echo $_SESSION["doorIdCar"];
            }
            break;
        default:
            echo "Starte neu bzw. Beende um fortzufahren.";
            break;
    }
}
?>
