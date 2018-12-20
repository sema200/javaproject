<?php
/**
 * Created by PhpStorm.
 * User: K56
 * Date: 18.12.2018
 * Time: 23:46
 */
include_once ('../classes/Base.class.php');
$data = json_decode($_POST['data'], true);
$zapros = new Base('PERSONAL', 'root', 'petro200sema');
$zapros -> connect();
//$result = $zapros -> select('clients', '*', '', '', '', '');
$result = $zapros -> select($data['table'], $data['pole'], $data['where'], $data['if'], $data['attribute'], $data['values']);
echo json_encode($result);
$zapros -> close($zapros);
unset($zapros);
?>