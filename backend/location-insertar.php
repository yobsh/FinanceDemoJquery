<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

date_default_timezone_set('America/Mexico_City');

    include("conexion.php");

    //Articulos
    $la = utf8_decode($_GET["la"]);
    $lo = utf8_decode($_GET["lo"]);
    $label = utf8_decode($_GET["l"]);

    if ($apartado == $sourceName){
        $source = '';
    }

    mysqli_query($conexion,"INSERT INTO FinanzasLocations (la, lo, label) VALUES
                ('$la','$lo','$label')");

	mysqli_close($conexion);

print $sourceName;

?>
