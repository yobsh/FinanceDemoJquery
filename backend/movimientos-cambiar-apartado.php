<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');
	
        include("conexion.php");
        include("compartido.php"); 

        $id = utf8_decode($_GET["i"]);
        $apartadoOrigen = utf8_decode($_GET["aO"]);
        $apartadoDestino = utf8_decode($_GET["aD"]);
        $cantidad = utf8_decode($_GET["c"]);
        $tipo = utf8_decode($_GET["t"]);
        
        echo "origen:".$apartadoOrigen;
        echo " | destino:".$apartadoDestino;
        echo " | cantidad:".$cantidad;
        echo " | id:".$id;
       
        
        mysqli_query($conexion,"UPDATE FinanzasMovimientos 
                                SET apartado='$apartadoDestino'
                                WHERE id='$id'");
                                        
        calcularTotal($apartadoOrigen);
        calcularTotal($apartadoDestino);


	mysqli_close($conexion);

?>


