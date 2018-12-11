<?php
/**
 * Created by PhpStorm.
 * User: K56
 * Date: 11.12.2018
 * Time: 17:08
 */

class MainFunction
{
public function __construct()
{
    ob_start(); // Начинаем сохрание выходных данных в буфер
    include ('../tpl/footer.tpl'); // Отправляем в буфер содержимое файла
    $text = ob_get_clean(); // Очищаем буфер и возвращаем содержимое
//    return $text; // Возвращение текста из файла
    echo $text;
}
}