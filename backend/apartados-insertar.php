<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

        include("conexion.php");
        include("compartido.php");

        $orden = '100';
        $nombre = utf8_decode($_GET["n"]);
        $saldo = '0';
        $icono = 'fas fa-envelope';
        $reparticion = utf8_decode($_GET["r"]);
        $estatus = '1';
        $budget = '1';

        mysqli_query($conexion,"INSERT INTO FinanzasApartados (orden, nombre, saldo, icono, reparticion, estatus, budget) VALUES
                ('$orden','$nombre','$saldo','$icono','$reparticion','$estatus','$budget') ");

	mysqli_close($conexion);

?>

