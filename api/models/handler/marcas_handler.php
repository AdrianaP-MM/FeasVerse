<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class MarcasHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id_marca = null;
    protected $nombre_marca = null;
    protected $foto_marca = null;
    protected $descripcion_marca = null;

    const RUTA_IMAGEN = '../../images/marcas/';

    public function readAll(){
        $sql = 'SELECT foto_marca FROM tb_marcas';
        return Database::getRows($sql);
    }
    public function createRow()
    {
        $sql = 'INSERT INTO tb_marcas(nombre_marca, foto_marca, descripcion_marca) VALUES (?,?,?)';
        $params = array(
            $this->nombre_marca,
            $this->foto_marca,
            $this->descripcion_marca
        );
        return Database::executeRow($sql, $params);
    }

    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_marca WHERE nombre_marca = ?';
        $params = array($value, $value);
        return Database::getRow($sql, $params);
    }
}