<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');


        include("conexion.php");
        include("compartido.php");

        $id = utf8_decode($_GET["i"]);
        $apartado = utf8_decode($_GET["a"]);
        $tipo = utf8_decode($_GET["t"]);
        $cantidadAnterior = utf8_decode($_GET["cA"]);
        $cantidadNueva = utf8_decode($_GET["cN"]);
        $descripcion = utf8_decode($_GET["d"]);
        $source = utf8_decode($_GET["s"]);
        $previousMethod = utf8_decode($_GET["pM"]);
        $newMethod = utf8_decode($_GET["nM"]);
        $fecha = utf8_decode($_GET["f"]);

        //$cuenta = utf8_decode($_GET["c"]);


        //Obtener apartado de registro que se modifica
        $query = "SELECT apartado FROM FinanzasMovimientos WHERE id='$id' ";
    		$result = mysqli_query($conexion, $query);

        while ($row = mysqli_fetch_array($result) ){
					$relacionado = $row["apartado"];}

				//Do the Update
        mysqli_query($conexion,"UPDATE FinanzasMovimientos
                                SET cantidad='$cantidadNueva', descripcion='$descripcion', fecha_mov='$fecha', method='$newMethod', source='$source', etiqueta='$cuenta'
                                WHERE id='$id'");

        calcularTotal($apartado);
        calcularTotal($relacionado);

        //Actualizar metodos
        UpdateMethod($previousMethod, $tipo, $cantidadAnterior,"delete");
        UpdateMethod($newMethod, $tipo, $cantidadNueva,"insert");


	mysqli_close($conexion);

?>
