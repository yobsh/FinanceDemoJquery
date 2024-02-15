<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');
	

        include("conexion.php");
        include("compartido.php"); 

        $id = utf8_decode($_GET["i"]);
        $hl = utf8_decode($_GET["hl"]);
    
        mysqli_query($conexion,"UPDATE FinanzasMovimientos 
                                SET highlight='$hl'
                                WHERE id='$id'");
                                
        calcularTotal($apartado);
        calcularTotal($relacionado);

	mysqli_close($conexion);

?>


