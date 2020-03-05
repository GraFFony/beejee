<?php
include 'Tasks.php';
include 'db.php';

if (isset($_GET)) {
    if ($_GET['page']) {
        $order = $_GET['order'];
        $page = $_GET['page'];
        $desc = $_GET['desc'];
        if ($order !== ''){
            $res = Tasks::get_page_orders($PDO, $order, $desc);
        }else{
            $res = Tasks::get_page_tasks($PDO, $page);
        }
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
        echo json_encode([$resturn, $max]);
    }
}

if (isset($_POST)) {
    if ($_POST['username']) {
        $username = $_POST['username'];
        $username = htmlspecialchars($username);
        $mail = $_POST['mail'];
        $mail = htmlspecialchars($mail);
        $taskinfo = $_POST['text'];
        $taskinfo = htmlspecialchars($taskinfo);

        $res = $PDO->query("INSERT INTO `tasks`(`username`, `mail`, `taskinfo`) VALUES ('" . $username . "','" . $mail . "','" . $taskinfo . "')")->fetchAll();
        return NULL;
    }
    if ($_POST['id']) {
        $txt = $_POST['text'];
        $txt = htmlspecialchars($txt);
        $work = $_POST['work'];
        $id = $_POST['id'];
        echo $work;
        echo $id;
        $res = $PDO->query("UPDATE `tasks` SET`on_work`=" . $work . ", `taskinfo` = ".$txt." WHERE `id` = '" . $id . "'")->fetchAll();
    }
}