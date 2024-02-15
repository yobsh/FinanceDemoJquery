<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

$url = 'https://jsonplaceholder.typicode.com/users'; // Replace with your desired URL

$jsonData = file_get_contents($url);
$array = json_decode($jsonData, true);

// var_dump($array);


[
    {
        "fecha_mov":"45062",
        "descripcion":"PAYPAL *PYPL Payin4",
        "cantidad":"9.72",
        "apartado":"Jobad",
        "method":"Online CC",
        "tipo":"gasto"
    },
    {
        "fecha_mov":"45062",
        "descripcion":"Lego Mindstorms - PAYPAL *PYPL Payin4",
        "cantidad":"95.81",
        "apartado":"Jobad",
        "method":"Online CC",
        "tipo":"gasto"
    }
]

[
    {
        "name": "John", 
        "age": 30
    }, 
    {
        "name": "Jane", 
        "age": 25
    }
]

foreach ($array as $row)
{
    echo $row["name"]. '<br>';
}

?>

