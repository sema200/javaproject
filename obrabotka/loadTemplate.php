<?php
/**
 * Created by PhpStorm.
 * User: K56
 * Date: 07.01.2019
 * Time: 12:42
 */
$data = json_decode($_POST['data'], true);
ob_start();

// Подключаем шаблонизатор
require_once ('../classes/Template.class.php');
require_once ('../classes/Base.class.php');
$zapros = new Base('PERSONAL', 'root', 'petro200sema', '127.0.0.1');
$zapros -> connect();
$sql = $zapros ->select('clients', 'uid', 'where', 'id', 'in', '(select max(id) from clients)');

// Производим проверку маршрутизации и включаем необходимые шаблоны
// Если не один из шаблонов не найден, отправляем клиенту код ошибки и показываем шаблон 404.tpl
// Если маршрут не задан, выводим главную страницу
/**/
    $tmpl = new Template($data['templateName']);
    $tmpl-> assign('uid', $sql['uid']);
    $tmpl->render(1);
$content = ob_get_clean();
echo json_encode($content);