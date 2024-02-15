<?php
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');



        include("conexion.php");
        include("compartido.php");

        $apartado = $_GET["a"];
        $fi = $_GET["fi"];
        $ff = $_GET["ff"];

        $query = query($fi,$ff);
        $result = mysqli_query($conexion, $query);
        
        $theData = array();
        $ingresos = 0;
        $gastos = 0;

        while ($row = mysqli_fetch_array($result) )
        {

                if($row["tipo"]=="ingreso")
                        $ingresos += $row["cantidad"];
                else
                        $gastos -= $row["cantidad"];

        }

        $theData [] = array(
                'ingresos' => $ingresos,
                'gastos' => $gastos,
                'avance' => $ingresos-($gastos*-1)
        );

        print json_encode( $theData );


        mysqli_close($conexion);



?>
