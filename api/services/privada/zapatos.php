<?php
// Se incluye la clase del modelo.
require_once('../../models/data/zapatos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $zapatos= new ZapatosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idTrabajador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                // Verificar si el valor de búsqueda es válido
                if (!Validator::validateSearch($_POST['search'])) {
                    // Si no es válido, se asigna un mensaje de error
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $cliente->searchRows()) {
                    // Si la búsqueda es válida y se encuentran resultados, se establece el estado como éxito y se crea un mensaje
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    // Si la búsqueda es válida pero no se encuentran resultados, se asigna un mensaje de error
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                break;
            case 'readAll':
                if ($result['dataset'] = $zapatos->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen zapatos registrados';
                }
                break;
                case 'readAllColores':
                    if ($result['dataset'] = $zapatos->readAllColores()) {
                        $result['status'] = 1;
                        $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                    } else {
                        $result['error'] = 'No existen colores registrados';
                    }
                    break;
            case 'readOneColores':
                if (!$zapatos->setIdColor($_POST['idColor'])) {
                    $result['error'] = 'Color incorrecto';
                } elseif ($result['dataset'] = $zapatos->readOneColores()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Color inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setId($_POST['idCliente']) or
                    !$cliente->setNombre($_POST['nombreCliente']) or
                    !$cliente->setApellido($_POST['apellidosCliente']) or
                    !$cliente->setCorreo($_POST['correoCliente']) or
                    !$cliente->setTelefono($_POST['telefonoCliente']) or
                    !$cliente->setDUI($_POST['duiCliente']) or
                    !$cliente->setNacimiento($_POST['fechaDeNacimientoCliente']) or
                    !$cliente->setEstado($_POST['estadoCliente'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cliente modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el cliente';
                }
                break;
                case 'addColores':
                    $_POST = Validator::validateForm($_POST);
                    if (
                        !$zapatos->setNombreColor($_POST['nombreColorInput']) 
                    ) {
                        $result['error'] = $zapatos->getDataError();
                    } elseif ($zapatos->addColores()) {
                        $result['status'] = 1;
                        $result['message'] = 'Marca creada correctamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al añadir el color';
                    }
                    break;
            case 'updateStatus':
                if (
                    !$cliente->setEstado($_POST['estadoCliente']) or
                    !$cliente->setId($_POST['idCliente'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->updateStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'Estado del cliente modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el estado del cliente';
                }
                break;
            case 'deleteRow':
                if (!$cliente->setId($_POST['idCliente'])) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cliente eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el cliente';
                }
                break;
            default:
                // Si no se reconoce la acción, se asigna un mensaje de error
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
