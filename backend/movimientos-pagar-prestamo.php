<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');
	

        include("conexion.php");
        include("total.php"); 

        $id = utf8_decode($_GET["i"]);
        $cantidad = utf8_decode($_GET["c"]);
        $descripcion = utf8_decode($_GET["d"]);
        $fecha = date("Y-m-d")."T".date("H:i");
              
        mysqli_query($conexion,"UPDATE FinanzasMovimientos 
                                SET apartado='Imprevistos'
                                WHERE id='$id'");
                                
        $descripcionDisponible = 'Pago de prestamo '.$descripcion;
        mysqli_query($conexion,"INSERT INTO FinanzasMovimientos (tipo, apartado, cantidad, descripcion, fecha_mov) VALUES
                ('gasto','Disponible','$cantidad','$descripcionDisponible','$fecha')");
                                                          
        calcularTotal('Prestamos');
        calcularTotal('Imprevistos');
        calcularTotal('Disponible');
                
	mysqli_close($conexion);

?>


