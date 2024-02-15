<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: true');

date_default_timezone_set('America/Mexico_City');
	

    include("conexion.php");
    include("compartido.php");

    //Articulos
    $account = utf8_decode($_GET["account"]);
    $amount = utf8_decode($_GET["amount"]);
    $fecha = date("Y-m-d")."T".date("H:i");
    
    if($amount != 0){
        
    
    
    //Retirar de Account
    $tipo = 'gasto';
    
    if($account=="Jobad Credit Card" || "Maddie Credit Card")
        $descripcion = $account.' payment';
    if($account=="Cash")
        $descripcion = 'Cash disposition';
        
    $method = 'Debit Card';
        
    mysqli_query($conexion,"INSERT INTO FinanzasMovimientos (tipo, cantidad, descripcion, fecha_mov, method) VALUES
                ('$tipo','$amount','$descripcion','$fecha','$method')");
                
    UpdateMethod($method, $tipo, $amount,"insert");
    
    //Insertar en cuenta
    $tipo = 'ingreso';
    
    if($account=="Jobad Credit Card" || "Maddie Credit Card")
        $descripcion = 'Card payment';
    if($account=="Cash")
        $descripcion = 'Cash available';
        
    $method = $account;
        
    mysqli_query($conexion,"INSERT INTO FinanzasMovimientos (tipo, cantidad, descripcion, fecha_mov, method) VALUES
                ('$tipo','$amount','$descripcion','$fecha','$method')");
            
    UpdateMethod($method, $tipo, $amount,"insert");
    
    }

	mysqli_close($conexion);



?>