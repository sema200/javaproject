<?php
/**
 * Created by PhpStorm.
 * User: K56
 * Date: 11.12.2018
 * Time: 18:57
 */

class Template {

    private $_tmpl;
    private $_vars = array();

    public function __construct($filename) {
        $this->_tmpl = $filename;
    }

    public function assign($name, $value) {
        $this->_vars[$name] = $value;
    }

    public function render() {
        if (count($this->_vars) > 0) {
            extract($this->_vars);
        }

        $tmplPath = "tpl/{$this->_tmpl}.tpl";

        if (file_exists($tmplPath)) {
            require $tmplPath;
        } else {
 //           throw new Exception("Шаблон <strong>{$this->_tmpl}</strong> не найден");
        }
    }

}
