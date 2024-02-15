<?php
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

// https://finanzas.visssible.com/backend/custom-search.php?b=all&fi=2023-06-01&ff=2023-06-32&s=Cantidad

$budget = 'all'; //'all' to show all
$fi = '2021-01-01';
$ff = '2021-01-32'; //Poner 1 dia de mas

/////////////////////////////

  include("conexion.php");
  include("compartido.php");

  if(isset($_GET['b']))
    $budget = $_GET["b"];
  if(isset($_GET['fi']))
    $fi = $_GET["fi"];
  if(isset($_GET['ff']))
    $ff = $_GET["ff"];
  if(isset($_GET['s']))
    $sort = $_GET["s"];
  else 
    $sort = 'fecha_mov';

  $query = query($fi,$ff);
  if($budget=="none")
    // $query = $query." AND apartado IN ('unplanned', '') ";
    $query = $query." AND apartado NOT IN ('Groceries', 'Services', 'Jobad', 'Maddie', 'Leon', 'Transport', 'Tithe', 'Floating Week', 'Levi', 'Jobad Credits', 'Seguros GNP', 'Hang out', 'Laundry', 'Home', 'eBay') ";
  else if($budget!="all") $query = $query." AND apartado = '$budget'";
  


	$result = mysqli_query($conexion, $query."ORDER BY `".$sort."` DESC, `fecha_mov` DESC");


  $theData = array();

  $suma = 0;
  $cont = 0;

  echo'
  <html>
  <head>
    <title>Log CashCulator</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://visssible.com/resources/css/bootstrap.css">
  </head>  
  <body>
  ';

  echo '<a href="https://finanzas.visssible.com">< Go Back</a><br>';
  echo '<b>From</b>: '.$fi;
  echo ' <b>To</b>: '.$ff;
  echo ' <b>Budget</b>: '.$budget;
  

  echo '<table class="table table-striped table-condensed" style="width:100%">
    <thead>
      <tr>
        <th>Fecha_mov</th>
        <th>Apartado</th>
        <th>Descripcion</th>
        <th>Cantidad</th>
        <th>Method</th>
      </tr>
    </thead>
  ';

	while ($row = mysqli_fetch_array($result) ){
    if( utf8_encode($row["tipo"]) == 'gasto'){
      echo '<tr>';
      echo '<td>'.utf8_encode($row["fecha_mov"]).'</td>';
      echo '<td>'.utf8_encode($row["apartado"]).'</td>';
      echo '<td>'.utf8_encode($row["descripcion"]).'</td>';
      echo '<td>'.utf8_encode($row["cantidad"]).'</td>';
      echo '<td>'.utf8_encode($row["method"]).'</td>';
      echo '</tr>';

      $suma = $suma + utf8_encode($row["cantidad"]);
      $cont ++;
    }
	}
  echo '</table>
    <hr>
  <h3>Total: $'.$suma.' / Records: ' .$cont.'</h3></body></html>';

mysqli_close($conexion);

?>
