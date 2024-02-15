<?php
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');



        
        include("conexion.php");  
                
        $apartado = $_GET["a"];
        //$apartado = "Disponible";

        $query = "SELECT * FROM FinanzasMovimientos WHERE apartado = '$apartado' ORDER BY `id` DESC";
                
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

		//return json_encode( $theData );

                
        mysqli_close($conexion);
                
        echo $total;
                



                        


?>