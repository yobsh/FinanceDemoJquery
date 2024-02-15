<?php




header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');


        include("conexion.php");
        include("compartido.php");

        $anteriorN = "Personal";
        $nuevoN = "Jobad";

        // $anteriorN = utf8_decode($_GET["a"]);
        // $nuevoN = utf8_decode($_GET["n"]);

        mysqli_query($conexion,"UPDATE FinanzasMovimientos
                                SET apartado='$nuevoN'
                                WHERE apartado='$anteriorN'");


        mysqli_query($conexion,"UPDATE FinanzasApartados
                                SET nombre='$nuevoN'
                                WHERE nombre='$anteriorN'");


	mysqli_close($conexion);

    print "anterior:".$anteriorN." > nuevo:".$nuevoN;

/*CORRER ARCHIVO:
https://financedemo.visssible.com/backend/nombre-cambiar.php
*/


?>
