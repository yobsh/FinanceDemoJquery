<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

	        
        $id = $_GET["idR"];
        $apartado = $_GET["a"];
        $cantidad = $_GET["c"];
        $tipo = $_GET["t"];
        
        include("conexion.php");
        include("total.php");     

        mysqli_query($conexion,"DELETE FROM FinanzasMovimientos WHERE id='$id'");
                
        calcularTotal($apartado);
        
        
        if ($apartado == "Imprevistos"){
        
               mysqli_query($conexion,"INSERT INTO FinanzasMovimientos (tipo, apartado, cantidad, descripcion, fecha_mov) VALUES
                ('ingreso','Disponible','$cantidad','Remuneracion de imprevisto','$fecha')"); 
        
               calcularTotal('Disponible');
                
        }
          
          
	mysqli_close($conexion);


?>