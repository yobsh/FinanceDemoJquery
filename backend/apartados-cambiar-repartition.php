<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

        include("conexion.php");

        $id = utf8_decode($_GET["i"]);
        $reparticion = utf8_decode($_GET["r"]);

        mysqli_query($conexion,"UPDATE FinanzasApartados 
                                SET reparticion='$reparticion'
                                WHERE id='$id'");

	mysqli_close($conexion);

?>

