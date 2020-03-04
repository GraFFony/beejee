<?php
include 'Tasks.php';
include 'db.php';

if (isset($_GET)) {
    if ($_GET['page']) {
        $page = $_GET['page'];
        $pages = Tasks::get_page_tasks($PDO, $page);
        echo json_encode($pages);
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
        $work = $_POST['work'];
        $id = $_POST['id'];
        echo $work;
        echo $id;
        $res = $PDO->query("UPDATE `tasks` SET`on_work`=" . $work . " WHERE `id` = '" . $id . "'")->fetchAll();
    }
}