<?php
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

include("conexion.php");
include("total.php");

        //ASIGNACION VARIABLES

        $id = utf8_decode($_GET["id"]);
        $cantidadAbono = utf8_decode($_GET["c"]);
        $apartado = utf8_decode($_GET["a"]);
        $descripcionAbono = utf8_decode($_GET["d"]);
        $fecha = date("Y-m-d")."T".date("H:i");


        $query = "SELECT * FROM FinanzasMovimientos WHERE id = '$id' ";
        $result = mysqli_query($conexion, $query);
        while ($row = mysqli_fetch_array($result) ){
                $descripcion = $row["descripcion"];
                $original = $row["original"];
                $abonado = $row["abonado"];
                $cantidad = $row["cantidad"];
        }

        //Si es virgen respaldar original
        if($original==0){
                mysqli_query($conexion,"UPDATE FinanzasMovimientos
                                SET original='$cantidad'
                                WHERE id='$id'");
        }

        //Se actualiza prestamo
        $abonado = $abonado. " +$".$cantidadAbono;
        $cantidad = $cantidad - $cantidadAbono;
        echo $cantidad;

        mysqli_query($conexion,"UPDATE FinanzasMovimientos
                                SET cantidad='$cantidad', abonado='$abonado'
                                WHERE id='$id'");


        //Registrar gasto en apartado

        $descripcionApartado = "Abono a ".$descripcion;

        if($descripcionAbono!= "")
                $descripcionApartado = $descripcionApartado." por ".$descripcionAbono;

        mysqli_query($conexion,"INSERT INTO FinanzasMovimientos (tipo, apartado, cantidad, descripcion, fecha_mov) VALUES
                ('gasto','$apartado','$cantidadAbono','$descripcionApartado','$fecha')");




        //Si es Imprevistos
        if ($apartado == "Imprevistos"){

           mysqli_query($conexion,"INSERT INTO FinanzasMovimientos (tipo, apartado, cantidad, descripcion, fecha_mov) VALUES
                ('$tipo','Disponible','$cantidadAbono','transferencia a imprevistos','$fecha')");

           calcularTotal("Disponible");

        }


        calcularTotal("Prestamos");
        calcularTotal($apartado);



?>
