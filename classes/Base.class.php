<?php
/**
 * Created by PhpStorm.
 * User: K56
 * Date: 11.12.2018
 * Time: 18:43
 */

class Base
{
    protected $db_name;
    protected $db_user;
    protected $db_pass;
    protected $db_host;
    public function connect() {
        /*
         * try {
         *
         * $conn = new PDO('mysql:host=localhost;dbname='.$this->db_name , $this->db_user, $this->db_pass);
         * $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         * } catch(PDOException $e) {
         * echo 'ERROR: ' . $e->getMessage();
         * }
         */
        $connection = mysql_connect ( $this->db_host, $this->db_user, $this->db_pass, true );
        mysql_select_db ( $this->db_name );
        return true;
    }
    public function close($zapros) {
//        mysql_close ( $zapros );
    }
    public function __construct($bd, $user, $pass, $localhost) {
        $this->db_name = $bd;
        $this->db_user = $user;
        $this->db_pass = $pass;
        $this->db_host = $localhost;
    }
    public function insrtTable($table, $pole, $values) {
        $sql = mysql_query ( "insert into $table ($pole) values ($values) " );
    }
    public function checkTable($table, $pole, $value) {
        $sql = mysql_query ( "select * from $table where $pole=$value " );
        if (! $sql)
            return false;
    }
    public function processRowSet($rowSet, $singleRow = false) {
        $resultArray = array ();
        while ( $row = mysql_fetch_assoc ( $rowSet ) ) {
            array_push ( $resultArray, $row );
        }
        if ($singleRow === true)
            return $resultArray [0];
        return $resultArray;
    }

    public function select($table, $pole, $where, $if, $attribute, $values) {
        // $pole="*";
        $sql = "SELECT $pole FROM $table $where $if $attribute $values";
        $result = mysql_query ( $sql );
        if (mysql_num_rows ( $result ) == 1)
            return $this->processRowSet ( $result, true );
        return $this->processRowSet ( $result );
    }
    public function insert($data, $table) {
        $columns = "";
        $values = "";
        foreach ( $data as $key => $value ) {
            $columns .= '`' . $key . '`,';
            $values .= '"' . $value . '",';
        }
        $columns = substr ( $columns, 0, - 1 );
        $values = substr ( $values, 0, - 1 );
        $sql = "insert into $table ($columns) values ($values)";
        mysql_query ( $sql ) or die ( mysql_error () );
        return mysql_insert_id ();
    }
    public function deleteTable($table, $pole, $propeties, $values) {
        $sql = "delete from $table where $pole $propeties $values";
        mysql_query ( $sql ) or die ( mysql_error () );
        echo mysql_error ();
    }
    // ������ ��������� � ��
    public function update($data, $table, $where, $attribute, $value) {
        foreach ( $data as $column => $values ) {
            $sql = "UPDATE $table SET $column = '$values' WHERE $where $attribute $value";
            mysql_query ( $sql ) or die ( mysql_error () );
        }
        echo mysql_error ();
    }
    public function saveDB ($tablename, $namefile) {
        $sql="select * from $tablename into outfile '/var/www/html/base_provaider/data/$tablename$namefile.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'";
        mysql_query ( $sql ) or die ( mysql_error () );
    }
    public function openDir() {
        $dir = opendir ('/var/www/html/base_provaider/data/');
        $mass = 'good';
        $i=0;
        while (false !== ($file = readdir($dir))) {
            $mass[$i]=$file;
            $i++;
        }
        return $mass;
    }
}
?>