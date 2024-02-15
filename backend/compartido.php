<?php
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');


//VARIABLES
$sourceName = "Source";


//FUNCIONES

//Calcular el total de un apartado
function calcularTotal($apartado){

    include("conexion.php");

    //Se seleccionan todos los registros del apartado en cuestion para recalcular saldo
    $query = "SELECT * FROM FinanzasMovimientos WHERE apartado = '$apartado' ";
    $result = mysqli_query($conexion, $query);

    //Se suman ingresos y restan gastos para recalcular el nuevo saldo del apartado
    $total = 0;
    while ($row = mysqli_fetch_array($result) )
    {
            if($row["tipo"]=="ingreso")
                    $total += $row["cantidad"];
            else
                    $total -= $row["cantidad"];
    }

    //Se actualiza el saldo del apartado con lo calculado en el while anterior
    mysqli_query($conexion,"UPDATE FinanzasApartados SET saldo='$total' WHERE nombre = '$apartado' ");

	mysqli_close($conexion);

	calcularSource();

}


//Calcular el total Source
function calcularSource(){
    include("conexion.php");

    $total = 0;
    $sourceName = $GLOBALS['sourceName'];

    //Contar todos los registros directos en Source
    $query = "SELECT * FROM FinanzasMovimientos WHERE apartado='$sourceName' ";
	$result = mysqli_query($conexion, $query);

    while ($row = mysqli_fetch_array($result) )
    {
        if($row["tipo"]=="gasto")
            $total -= $row["cantidad"];
        else
            $total += $row["cantidad"];
    }

    //Contar todos los registros ligados a Source desde otros apartados
    $query = "SELECT * FROM FinanzasMovimientos WHERE source='true' ";
	$result = mysqli_query($conexion, $query);

    while ($row = mysqli_fetch_array($result) )
    {
        if($row["tipo"]=="gasto")
            $total -= $row["cantidad"];
        else
            $total += $row["cantidad"];
    }

    //Remplazar saldo con total
    mysqli_query($conexion,"UPDATE FinanzasApartados SET saldo='$total' WHERE nombre = '$sourceName' ");

    mysqli_close($conexion);
}


//ACTUALIZAR METODO
function UpdateMethod($method,$tipo,$cantidad,$operation){

    if($method!="None"){

        include("conexion.php");


        $nombre = $method;
        if($method=="Jobad Credit Card")
            $nombre = "Jobad CC";
        if($method=="Maddie Credit Card")
            $nombre = "Maddie CC";
        if($method=="Debit Card")
            $nombre = "Account";

        $query = "SELECT * FROM FinanzasMethods WHERE nombre = '$nombre' ";
        $result = mysqli_query($conexion, $query);

        $saldo = 0;
        while ($row = mysqli_fetch_array($result) )
        {
                $saldo = $row["saldo"];
        }

        //INSERT
        if($operation=="insert"){
            if($tipo=="gasto")
                    $saldo -= $cantidad;
            else
                    $saldo += $cantidad;
        }

        //DELETE
        if($operation=="delete"){
            if($tipo=="gasto")
                    $saldo += $cantidad;
            else
                    $saldo -= $cantidad;
        }

        mysqli_query($conexion,"UPDATE FinanzasMethods
                                    SET saldo='$saldo'
                                    WHERE nombre='$nombre'");

        mysqli_close($conexion);
    }
}

//QUERY FOR CHART REPORT AND CUSTOM SEARCH

function query($fi,$ff){

    $exeptions = "
    AND descripcion NOT LIKE '%recibido%'
    AND descripcion NOT LIKE '%remuneracion%'
    AND descripcion NOT LIKE '%card payment%'
    AND descripcion NOT LIKE '%CC payment%'
    AND descripcion NOT LIKE '%savings payment%'
    AND descripcion NOT LIKE '%ajuste%'
    AND descripcion NOT LIKE '%transfer%'
    AND descripcion NOT LIKE '%sent to%'
    AND descripcion NOT LIKE '%Received from%'
    AND descripcion NOT LIKE '%retirado%'
    AND descripcion NOT LIKE '%aportaci%'
    AND descripcion NOT LIKE '%ahorro%'
    AND descripcion NOT LIKE '%cash disposition%'    
    AND descripcion NOT LIKE '%#hide%'
    AND descripcion NOT LIKE '%#regresar%'
    AND descripcion NOT LIKE '%#not%'
    AND descripcion NOT LIKE '%#prestamo%'
    AND descripcion NOT LIKE '%#reembol%'
    AND descripcion NOT LIKE '%#rembol%'

    AND apartado NOT LIKE '%(MXP)%'
    AND apartado NOT LIKE '%pesos%'
    AND apartado NOT LIKE '%savings%'
    AND apartado NOT LIKE '%AdMob%'
    ";

    $query = "SELECT * FROM FinanzasMovimientos
                WHERE
                fecha_mov between '$fi' AND '$ff'
                AND method NOT LIKE '%amazon%'
                AND method NOT LIKE '%savings%'
                ";

    return $query.$exeptions;
}

?>
