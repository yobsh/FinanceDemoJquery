<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

        include("conexion.php");
        include("compartido.php");
	        
        $id = $_GET["id"];
        $apartado = $_GET["a"];
        
        //Obtener apartado antes de borrar
        $query = "SELECT apartado FROM FinanzasMovimientos WHERE id='$id' ";
    	$result = mysqli_query($conexion, $query);
        
        while ($row = mysqli_fetch_array($result) )
        {$relacionado = $row["apartado"];}
          
          
        //Actualizar metodos
        $query = "SELECT * FROM FinanzasMovimientos WHERE id = '$id' ";
        $result = mysqli_query($conexion, $query);
    
        $saldo = 0;
        while ($row = mysqli_fetch_array($result) )
        {
                $method = $row["method"];
                $tipo = $row["tipo"];
                $cantidad = $row["cantidad"];
        }
          
        UpdateMethod($method, $tipo, $cantidad,"delete");  
          
          
        //Borrar
        mysqli_query($conexion,"DELETE FROM FinanzasMovimientos WHERE id='$id'");
                
        calcularTotal($apartado);
        calcularTotal($relacionado);
          
	mysqli_close($conexion);


?>