<?php
include 'Users.php';
if (isset($_POST)) {
    $login = $_POST['login'];
    $password = $_POST['password'];
    $option = Users::get_users($PDO, $login, $password);
    echo json_encode($option);
}