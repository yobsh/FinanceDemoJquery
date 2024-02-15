<?php
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

        $dolar = 20.3075;

        include("conexion.php"); 
        
        $cuenta = $_GET["c"];

        $query = "SELECT * FROM FinanzasMovimientos WHERE etiqueta = '$cuenta'";
        
        $result = mysqli_query($conexion, $query);
        
        $theData = array();

        $total = 0;

        while ($row = mysqli_fetch_array($result) )
        {
        
                if($row["tipo"]=="ingreso")
                        $total += $row["cantidad"];
                else
                        $total -= $row["cantidad"];
        }
        
        //if($cuenta=="Ahorro Dolares")
        //        $total = round($total * $dolar);
        
        $theData [] = array(
                'nombre' => $cuenta,
                'total' => $total
        );
        
        print json_encode( $theData );;
                               
	mysqli_close($conexion);


?>