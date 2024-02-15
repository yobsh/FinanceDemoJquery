<?php
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');


        function get_data(){
        
                include("conexion.php");  
                
                $apartado = $_GET["a"];

                $query = "SELECT * FROM FinanzasApartados ORDER BY `id` ASC";
                
		$result = mysqli_query($conexion, $query);
                $theData = array();


		while ($row = mysqli_fetch_array($result) )
		{
			$theData [] = array(
                        'nombre' => utf8_encode($row["nombre"])
			);
		}

		return json_encode( $theData );

                
                mysqli_close($conexion);
                
        }

	print_r(get_data());
                        


?>