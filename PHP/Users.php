<?php

include 'db.php';

class Users
{
    public $id;
    public $login;
    public $password;
    public $option;

    static public function get_users($PDO, $login, $password)
    {
        $res = $PDO->query("SELECT * FROM `users` WHERE `login` = '" . $login . "' AND `password` = '" . $password . "'")->fetchAll();
        if ($res) {
            $user = new Users();
            $user->id = $res[0]['id'];
            $user->login = $res[0]['login'];
            $user->password = $res[0]['password'];
            $user->option = $res[0]['opt'];
            return ['login' => 'OK', 'option' => $user->option];
        }
        return ['login' => 'FALSE', 'option' => 0];
    }

}

