<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */

class ZapatosHandler
{

    protected $id_zapato = null;
    protected $id_trabajador = null;
    protected $id_marca = null;
    protected $nombre_zapato = null;
    protected $genero_zapato = null;
    protected $descripcion_zapato = null;
    protected $estado_zapato = null;
    protected $precio_unitario_zapato = null;
    protected $foto_detalle_zapato = null;
    protected $id_color = null;
    protected $nombre_color = null;
    protected $id_talla = null;
    protected $cantidad_zapato = null;
    protected $cantidad_talla = null;

    const RUTA_IMAGEN = '../../helpers/images/zapatos/';


    public function readAll()
    {
        $sql = 'SELECT  zapatos.id_zapato, zapatos.nombre_zapato,  detalle_zapatos.foto_detalle_zapato  FROM  tb_zapatos AS zapatos
    INNER JOIN tb_detalle_zapatos AS detalle_zapatos ON zapatos.id_zapato = detalle_zapatos.id_zapato;';
        return Database::getRows($sql);
    }


    public function readAllColores()
    {
        $sql = 'SELECT nombre_color, id_color FROM tb_colores;';
        return Database::getRows($sql);
    }

    public function readOneColores()
    {
        $sql = 'SELECT id_color, nombre_color FROM tb_colores WHERE id_color = ?;';
        $params = array($this->id_color);
        return Database::getRows($sql, $params);
    }

    public function ActColores()
    {
        $sql = 'UPDATE tb_colores 
        SET nombre_color = ?
        WHERE id_color = ?;';
        $params = array($this->nombre_color, $this->id_color); // Parámetros para la consulta SQL
        return Database::executeRow($sql, $params); // Ejecución de la consulta SQL
    }


    public function addColores()
    {
        $sql = 'INSERT INTO tb_colores(nombre_color) VALUES (?)';
        $params = array(
            $this->nombre_color
        );
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT foto_detalle_zapato
                FROM tb_detalle_zapatos
                WHERE id_detalle_zapato = ?;';
        $params = array($this->id_zapato);
        return Database::getRow($sql, $params);
    }

    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_color WHERE nombre_color = ?';
        $params = array($value);
        return Database::getRow($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_zapatos(id_trabajador, id_marca , nombre_zapato, genero_zapato, descripcion_zapato, precio_unitario_zapato, estado_zapato) VALUES (?,?,?,?,?,?,"Activo");';
        $params = array(
            $_SESSION['idTrabajador'],
            $this->id_marca,
            $this->nombre_zapato,
            $this->genero_zapato,
            $this->descripcion_zapato,
            $this->precio_unitario_zapato
        );
        return Database::executeRow($sql, $params);
    }

    public function createRowPT2()
    {
        $sql = 'CALL InsertarDetalleZapato(?, ?, ?, ?);';
        $params = array(
            $this->id_talla,
            $this->cantidad_zapato,
            $this->id_color,
            $this->foto_detalle_zapato
        );
        return Database::executeRow($sql, $params);
    }
    // Método para leer todos los niveles
    public function readMarcas()
    {
        $sql = 'SELECT id_marca, nombre_marca from tb_marcas; '; // Consulta SQL para obtener todos los niveles
        return Database::getRows($sql); // Ejecución de la consulta SQL
    }


    public function readOneZapato()
    {
        $sql = 'SELECT id_zapato, nombre_zapato, genero_Zapato, descripcion_zapato, id_marca, precio_unitario_zapato FROM tb_Zapatos 
        WHERE id_Zapato = ?;'; // Consulta SQL para obtener los datos de un zapato por ID
        $params = array($this->id_zapato); // Parámetros para la consulta SQL
        return Database::getRow($sql, $params); // Ejecución de la consulta SQL
    }

    public function readDetallesZapatos()
    {
        $sql = 'SELECT id_detalle_zapato, id_talla, cantidad_zapato, id_color, foto_detalle_zapato FROM tb_detalle_Zapatos 
        WHERE id_zapato = ?;'; // Consulta SQL para obtener los datos de un zapato por ID
        $params = array($this->id_zapato); // Parámetros para la consulta SQL
        return Database::getRow($sql, $params); // Ejecución de la consulta SQL
    }
}
