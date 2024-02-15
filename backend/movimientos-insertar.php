<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

date_default_timezone_set('America/Mexico_City');
	

    include("conexion.php");
    include("compartido.php");

    //Articulos
    $tipo = utf8_decode($_GET["tipo"]);
    $apartado = utf8_decode($_GET["apar"]);
    $cantidad = utf8_decode($_GET["cant"]);
    $descripcion = utf8_decode($_GET["desc"]);
    $cuenta = utf8_decode($_GET["cuen"]);
    $fecha = utf8_decode($_GET["fech"]);
    $source = utf8_decode($_GET["esp"]);
    $method = utf8_decode($_GET["m"]);
    
    if ($apartado == $sourceName){
        $source = '';
    }
    
    mysqli_query($conexion,"INSERT INTO FinanzasMovimientos (tipo, apartado, cantidad, descripcion, fecha_mov, etiqueta, method, source) VALUES
                ('$tipo','$apartado','$cantidad','$descripcion','$fecha','$cuenta','$method','$source')");
            
    calcularTotal($apartado);

    UpdateMethod($method, $tipo, $cantidad,"insert");

	mysqli_close($conexion);

print $sourceName;

?>

