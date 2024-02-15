<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');


        include("conexion.php");
        include("compartido.php");


        mysqli_query($conexion,"UPDATE FinanzasMovimientos
                                SET highlight='' ");


	mysqli_close($conexion);

?>
