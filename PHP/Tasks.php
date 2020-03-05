<?php

include 'db.php';

class Tasks
{
    public $id;
    public $username;
    public $mail;
    public $taskinfo;
    public $work;

    static public function get_page_tasks($PDO)
    {
            $res = $PDO->query("SELECT * FROM `tasks`")->fetchAll();
            return $res;

    }
    static  public  function  get_page_orders($PDO, $order, $desc)
    {
        $desc = $desc === '0' ? 'ASC' : 'DESC';
            $res = $PDO->query("SELECT * FROM `tasks` ORDER BY `".$order."` ".$desc)->fetchAll();
        return $res;
    }
}
