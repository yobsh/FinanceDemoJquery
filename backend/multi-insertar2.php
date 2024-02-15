<?php

header('Access-Control-Allow-Origin: *');


// $source = $_POST['data'];
// // $source = 'https://jsonplaceholder.typicode.com/users'; // Replace with your desired URL

// // $jsonData = file_get_contents($source);

// $data = json_decode($source,true);

// var_dump($data);

// // echo "1--".$source;

// // print($data);
// // echo $data;

$json = file_get_contents('php://input');
$php_arr = json_decode($json);

var_dump($json);

foreach ($php_arr as $row) {
    echo $row['descripcion'];
}


?>