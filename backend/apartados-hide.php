<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

        include("conexion.php");

        $id = utf8_decode($_GET["i"]);

        mysqli_query($conexion,"UPDATE FinanzasApartados 
                                SET estatus='0'
                                WHERE id='$id'");

	mysqli_close($conexion);

?>

