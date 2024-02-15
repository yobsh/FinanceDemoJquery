<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

date_default_timezone_set('America/Mexico_City');


				include("conexion.php");
				include("compartido.php");

        //Articulos
        $origen = utf8_decode($_GET["o"]);
        $apartado = utf8_decode($_GET["a"]);
        $cantidad = utf8_decode($_GET["c"]);
        $descripcion = utf8_decode($_GET["d"]);
        $id = utf8_decode($_GET["id"]);

        $fecha = date("Y-m-d")."T".date("H:i");

        //Retiro

        if ($descripcion != "") {
                $descOrig = "Sent to ".$apartado. " for ".$descripcion;
        }
        else{
                $descOrig = "Sent to ".$apartado;
        }

        mysqli_query($conexion,"INSERT INTO FinanzasMovimientos (tipo, apartado, cantidad, descripcion, fecha_mov, etiqueta) VALUES
                ('gasto','$origen','$cantidad','$descOrig','$fecha','$id')");


        calcularTotal("$origen");


        //Ingreso

        if ($descripcion != "") {
                $descDest = "Received from ".$origen. " por ".$descripcion;
        }
        else{
                $descDest = "Received from ".$origen;
        }

        mysqli_query($conexion,"INSERT INTO FinanzasMovimientos (tipo, apartado, cantidad, descripcion, fecha_mov, etiqueta) VALUES
                ('ingreso','$apartado','$cantidad','$descDest','$fecha','$id')");

        calcularTotal("$apartado");

				echo $origen." ";
				echo $apartado." ";
				echo $cantidad." ";
				echo $descripcion." ";
				echo $host." ";


	mysqli_close($conexion);


?>
