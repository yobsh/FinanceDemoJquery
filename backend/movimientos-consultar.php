<?php
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');


        function get_data(){

            include("conexion.php");
            include("compartido.php");

            $type = $_GET["type"];
            $apartado = $_GET["apartado"];
            $descripcion = $_GET["descripcion"];
            $cantidad = $_GET["cantidad"];
            $method = $_GET["method"];
            $fechaInicio = $_GET["fechaI"];
            $fechaFin = $_GET["fechaF"];


            $and = '';
            if(isset($apartado)){
                $pApar = $and." apartado = '".$apartado."'";
                if($and=='') $and = ' AND ';
                if($apartado == "$sourceName")
                    $pApar = $pApar." OR source = 'true'";
            }
            if(isset($method)){
                $pMeth = $and." method LIKE '%".$method."%'";
                if($and=='') $and = ' AND ';
            }
            if(isset($descripcion)){
                $pDesc = $and." descripcion LIKE '%".$descripcion."%'";
                if($and=='') $and = ' AND ';
            }
            if(isset($cantidad)){
                $pCant = $and." cantidad LIKE '%".$cantidad."%'";
                if($and=='') $and = ' AND ';
            }

            if(isset($fechaInicio)){
                $pFech = $and." fecha_mov BETWEEN '".$fechaInicio."' AND '".$fechaFin."'";
                if($and=='') $and = ' AND ';
            }


            $query = "SELECT * FROM FinanzasMovimientos WHERE ".$pApar.$pMeth.$pDesc.$pCant.$pFech." ORDER BY `fecha_mov` DESC, `id` DESC LIMIT 150";
            //echo $query;

            /*
            if($apartado == "ultimos"){
                $query = "SELECT * FROM FinanzasMovimientos ORDER BY `id` DESC LIMIT 50";
            }
            elseif($apartado == "$sourceName"){
                $query = "SELECT * FROM FinanzasMovimientos WHERE source = 'true' or apartado = '$sourceName' ORDER BY `id` DESC";
            }
            else{
                $query = "SELECT * FROM FinanzasMovimientos WHERE apartado = '$apartado' ORDER BY `id` DESC";
            }
            */

    		$result = mysqli_query($conexion, $query);
                    $theData = array();

    		while ($row = mysqli_fetch_array($result) ){
    			$theData [] = array(
                            'id' => utf8_encode($row["id"]),
                            'tipo' => utf8_encode($row["tipo"]),
                            'apartado' => utf8_encode($row["apartado"]),
                            'cantidad' => utf8_encode($row["cantidad"]),
                            'descripcion' => utf8_encode($row["descripcion"]),
                            'fecha_mov' => utf8_encode($row["fecha_mov"]),
                            'source' => utf8_encode($row["source"]),
                            'method' => utf8_encode($row["method"]),
                            'original' => utf8_encode($row["original"]),
                            'abonado' => utf8_encode($row["abonado"]),
                            'etiqueta' => utf8_encode($row["etiqueta"]),
                            'highlight' => utf8_encode($row["highlight"]),
    			);

    		}

		    return json_encode( $theData );

            mysqli_close($conexion);

        }

	print_r(get_data());

?>
