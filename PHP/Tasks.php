<?php

include 'db.php';

class Tasks
{
    public $id;
    public $username;
    public $mail;
    public $taskinfo;
    public $work;

    static public function get_page_tasks($PDO, $page)
    {
        $res = $PDO->query("SELECT * FROM `tasks`")->fetchAll();
        $resturn = [];
        $max = count($res);
        $page--;
        for ($i = $page * 3; $i < $page * 3 + 3; $i++) {
            $resturn[] = [
                "id" => $res[$i]["id"],
                "username" => $res[$i]["username"],
                "mail" => $res[$i]["mail"],
                "taskinfo" => $res[$i]["taskinfo"],
                "work" => $res[$i]["on_work"],
            ];
        }
        return[$resturn, $max];
    }
}
