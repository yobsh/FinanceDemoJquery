<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

date_default_timezone_set('America/Mexico_City');

        include("conexion.php");
        include("compartido.php");

        //Articulos
        $apartado = utf8_decode($_GET["a"]);
        $cantidad = utf8_decode($_GET["c"]);
        $fecha = utf8_decode($_GET["d"]);

        if ($fecha == '')
                $fecha = date("Y-m-d")."T".date("H:i");
        
        if($apartado!="Source"){

                //Apartado
                mysqli_query($conexion,"INSERT INTO FinanzasMovimientos (tipo, apartado, cantidad, descripcion, fecha_mov) VALUES
                        ('ingreso','$apartado','$cantidad','Weekly distribution','$fecha')");
                        
                calcularTotal($apartado);
        }   
        else{
                //Es reparticion de Ingreso a Disponible
                mysqli_query($conexion,"INSERT INTO FinanzasMovimientos (tipo, apartado, cantidad, descripcion, fecha_mov, method) VALUES
                        ('ingreso','Source','$cantidad','Integrass Wage','$fecha', 'Debit Card')");
                        
                calcularTotal('Source');
                UpdateMethod('Debit Card', 'ingrso', $cantidad,"insert");
        }
    
	mysqli_close($conexion);

?>

