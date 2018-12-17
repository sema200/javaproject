<?php
/**
 * Created by PhpStorm.
 * User: K56
 * Date: 11.12.2018
 * Time: 16:29
 */
/**
 * Буферизация вывода.
 * Все, что будет выводиться echo-м или print-ом, будет попадать в буфер, а не в браузер пользователю.
 */
ob_start();

// Подключаем шаблонизатор
require_once ('classes/Template.class.php');

// Производим проверку маршрутизации и включаем необходимые шаблоны
// Если не один из шаблонов не найден, отправляем клиенту код ошибки и показываем шаблон 404.tpl
// Если маршрут не задан, выводим главную страницу
if (isset($_GET['route']) && $_GET['route'] == 'econom') {
    $tmpl = new Template('Econom');
    $tmpl->assign('ID', $_GET['ID']);
    $tmpl->render();
} else if (($_GET['route']) && $_GET['route'] == 'security') {
    $tmpl = new Template('Security');
    $tmpl->assign('ID', $_GET['ID']);
    $tmpl->render();
} else if (!isset($_GET['route'])) {
    $tmpl = new Template('Index');
    $tmpl->render();
} else {
    header("HTTP/1.0 404 Not Found");
    $tmpl = new Template('404');
    $tmpl->render();
}

// Получаем содержимое буфера
$content = ob_get_clean();

// Инициализируем шаблон каркаса страницы и выводим ранее сгенерированное содержимое
$tmpl = new Template('Main');
$tmpl->assign('content', $content);
$tmpl->assign('head', $tmpl->getContent('tpl/head.tpl'));
$tmpl->assign('footer', $tmpl->getContent('tpl/footer.tpl'));
$tmpl->render();