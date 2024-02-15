<?php
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

    include("conexion.php");  
    /*
    $query = "SELECT * FROM FinanzasApartados WHERE nombre = 'Dolares'";
	$result = mysqli_query($conexion, $query);
	$row = mysqli_fetch_array($result);

    $theData [] = array(
                'id' => utf8_encode($row["id"]),
                'icono' => utf8_encode($row["icono"]),
                'nombre' => utf8_encode($row["nombre"]),
                'saldo' => utf8_encode($row["saldo"]),
                'reparticion' => utf8_encode($row["reparticion"]),
                'fecha_pago' => utf8_encode($row["fecha_pago"]),
                'tipo' => utf8_encode($row["tipo"])
	);
    
    $query = "SELECT * FROM FinanzasApartados WHERE estatus = '1' AND nombre <> 'Dolares' ORDER BY `id` ASC";*/
    $query = "SELECT * FROM FinanzasApartados WHERE estatus = '1' ORDER BY `orden` ASC";
	$result = mysqli_query($conexion, $query);
    
	while ($row = mysqli_fetch_array($result) ) {
		$theData [] = array(
                    'id' => utf8_encode($row["id"]),
                    'icono' => utf8_encode($row["icono"]),
                    'nombre' => utf8_encode($row["nombre"]),
                    'saldo' => utf8_encode($row["saldo"]),
                    'reparticion' => utf8_encode($row["reparticion"]),
                    'fecha_pago' => utf8_encode($row["fecha_pago"]),
                    'tipo' => utf8_encode($row["tipo"]),
                    'budget' => utf8_encode($row["budget"])
		);
	}

    print_r (json_encode( $theData ));

    mysqli_close($conexion);


?>