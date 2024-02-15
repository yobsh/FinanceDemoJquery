
//INIT -----------------------------
var version = "8.0.2";
$("#version").html(version);

var serverURL = 'https://financedemo.visssible.com/backend/';


$("#principal").show();


//Variables
var that = "";
var title = "";
var search = "";
var methods = false;
var apartados = false;
var etiquetas = false;
var ventanaPrincipal = true;
var apartado = "";
var method = "";
var today = new Date();
var ammount = "";
var budgetsCount = 0;
var methodsCount = 0;
var budgetsToDistribute = []

//Date
currentDate = new Date();
currentMonth = currentDate.getMonth()+1;
currentYear = currentDate.getFullYear();


//PAGOS TARJETA -----------------------------

// diaCorte = 16;
// diaPago = 6;
// mesCorte = 0;

// if(hoyDia <= (diaCorte-1)) //1-15
// 	mesCorte = hoyMes
// if(hoyDia >= diaCorte) //16-20
// 	mesCorte = hoyMes+1
// if(mesCorte==12) //12
// 	mesCorte = 0

// fechaCorte = new Date(hoyAnio,mesCorte,diaPago);
// fechaCorte = moment(fechaCorte).format('DD MMMM');

// switch (mesCorte){
// 	case 0: mesCorte = "Ene"; break;
// 	case 1: mesCorte = "Feb"; break;
// 	case 2: mesCorte = "Mar"; break;
// 	case 3: mesCorte = "Abr"; break;
// 	case 4: mesCorte = "May"; break;
// 	case 5: mesCorte = "Jun"; break;
// 	case 6: mesCorte = "Jul"; break;
// 	case 7: mesCorte = "Ago"; break;
// 	case 8: mesCorte = "Sep"; break;
// 	case 9: mesCorte = "Oct"; break;
// 	case 10: mesCorte = "Nov"; break;
// 	case 11: mesCorte = "Dic"; break;
// }

// fechaCorte = diaPago+"/"+mesCorte;

//Ventana Principal

function principal(t=ventanaPrincipal){
	ventanaPrincipal = t;
	if (ventanaPrincipal==true){
		apartado = '';
		method = '';
	}
	console.log('ventanaPrincipal:'+ventanaPrincipal);
	console.log('apartado:'+apartado);
	console.log('method:'+method);
	console.log('search:',search);
}principal(true);


//TRANSACTION -----------------------------

$(document).on('click', '#apartados i.transaction', function(event){
	apartado = $(this).parent().attr("apartado");
	search = { 'apartado' : apartado };
});

$(document).on('click', 'i.transaction', function(event){
	newTransaction("expense");
});

$("#transaction .tabs .expense").click(function(){
	newTransaction("expense","no-clean");
});
$("#transaction .tabs .income").click(function(){
	newTransaction("income","no-clean");
});

//Show transaction

function showTransaction(type){

	$("#transaction").show();

	if(type=="expense"){
		$("#transaction").addClass('newExpense');
		$("#transaction").removeClass('newIncome');
		$("#transaction").removeClass('newModify');
	}
	if(type=="income"){
		$("#transaction").addClass('newIncome');
		$("#transaction").removeClass('newExpense');
		$("#transaction").removeClass('newModify');
	}
	if(type=="modify"){
		$("#transaction").addClass('newModify')
		$("#transaction").removeClass('newIncome');
		$("#transaction").removeClass('newExpense');
	}

	$("#transaction .cantidad").focus();
	$("#transaction #apartados-holder").show();
	$("#transaction #method-holder").show();

}

var transactionType = '';
//New form
function newTransaction(type,clean=''){

	console.log('New Transaction')
	console.log('apartado',apartado)
	console.log('method',method)
	transactionType = type;

	showTransaction(type);

	if(clean != 'no-clean'){

		//Cantidad
		$("#transaction .cantidad").val(ammount);

		//Descripcion
		autocompleteLocation();

		//Fecha
		$("#transaction .fecha").val( date.fechaHoyFull );

		//Update remaining

/*
if(apartado=='Unplanned' ||
apartado=='Groceries' ||
apartado=='Jobad' ||
apartado=='Maddie' ||
apartado=='Leon' ||
apartado=='Home' ||
apartado=='Transport' ||
apartado=='Services'
)
		 $('#remaining').show();
else
$('#remaining').hide();*/


	if(apartado!=''){
		showRemaining(apartado);
		$('#transaction .cantidad').on('input', function() {
			showRemaining(apartado);
		});
		$('#remaining').show();
	}
	else {
		$('#remaining').hide();
	}

	}

	function showRemaining(a){

		b = $('#apartados [apartado="'+a+'"] .saldo').html();
		b = b.substring(1,b.length);
		c = $('#transaction .cantidad').val();

		if (transactionType=="expense")
			rb = b - c;
		else
			rb = parseFloat(b) + parseFloat(c);

		$('#remaining .budget').html('$'+rb.toFixed(2));

		if(rb<0)
			$('#remaining .budget').addClass('red');
		else
			$('#remaining .budget').removeClass('red');



	//('#remaining .balance').html(balance);

	}

	//Source Checkbox
	// if(apartado=="Source"){
	// 	$("#transaction .checkbox").hide();
	// 	$("#transaction .checkbox input").prop( "checked", false );
	// }
	// else{
	// 	$("#transaction .checkbox").show();
	// 	$("#transaction .checkbox input").prop( "checked", true );
	// }

	//Apartados dropdown
	if(apartado==''){
		cargarNombresApartados('#transaction');
		// $("#transaction #apartado-holder").show();
	}
	else{
		cargarNombresApartados('#transaction',apartado);
		// $("#transaction #apartado-holder").hide();
	}

	//Methods dropdown
	if(method==''){
		$("#transaction .method").val(localStorage.getItem("method"));
		// $("#transaction #method-holder").show();
	}
	else{
		$("#transaction .method").val(method);
		// $("#transaction #method-holder").hide();
	}


}

//Load form
$(document).on('click', '#movimientos #lista > li .area', function(event){

	showTransaction('modify');

	that = $(this).parent();

	//Cantidad
	$("#transaction .cantidad").val(that.children(".cantidad").html());

	//Descripcion
	$("#transaction .descripcion").val(that.children(".main-line").children(".descripcion").html());

	//Fecha
	$("#transaction .fecha").val(that.children(".fecha").attr('fecha'));

	//Source
	// $("#transaction .checkbox").show();
	// if( that.attr("source")=='true' )
	// 	$("#transaction .checkbox input").prop( "checked", true );
	// else
	// 	$("#transaction .checkbox input").prop( "checked", false );

	//Methods
	$("#transaction .method").val(that.attr("method"));

	//Apartados
	cargarNombresApartados('#transaction', that.attr("apartado") );
	// if(apartado!='')
		// $("#transaction .apartados").hide();

});


// Cargar nombres apartados

function cargarNombresApartados(modal,seleccion=''){

	$(modal+" .apartados").html("");

	$.get(serverURL+"apartados-consultar.php",{ a:apartado})
	.done( function(respuesta) {

	    datos = JSON.parse(respuesta);

	    for (i=0;i<= datos.length-1; i++){

	        var output = '<option>'+datos[i].nombre+'</option>';

	        $(modal+" .apartados").append(output);

	    }

	    $('#transaction .apartados').val(seleccion);

			console.log("Se cargan nombres de apartados en dropdown");

	})
	.fail( function() {
	    console.log("no se pudo");
	});

}


//Toggle source
$(document).on('change', '#transaction .checkbox input', function(event){

	if( $("#transaction .checkbox input").prop( "checked") == true ){
		$("#transaction #method-holder").show();

		if(method=='')
			$("#transaction .method").val(localStorage.getItem("method"));
		else
			$("#transaction .method").val(method);

		console.log('Metodo activado para movimiento real')
	}
	else{
		$("#transaction #method-holder").hide();
		$("#transaction .method").val('');
		console.log('Metodo desactivado para movimiento interno')
	}

});


//Save last method
$(document).on('change', '#transaction .method', function(event){
	localStorage.setItem("method",$('#transaction .method').val());
});


// SAVE TRANSACTION
$("#newExpense").click(function(){
	guardar("gasto");
});
$("#newIncome").click(function(){
	guardar("ingreso");
});

$("#transaction .btn").click(function(){
	$("#transaction").hide();
});


//APARTADOS -----------------------------


// function nuevoRegistro(tipo){
// 	limpiar();
// 	abrir($("#"+tipo));
// 	$("#"+tipo+" .cantidad").focus();

// 	$("#"+tipo+" .checkbox input").prop( "checked", true );

// 	cargarAtajos(apartado,tipo);

// 	if(apartado=="Source")
// 		$("#"+tipo+" .checkbox").hide();
// 	else
// 		$("#"+tipo+" .checkbox").show();

// 	if(apartado=="Prestamos" && tipo=="gasto")
// 		$("#gasto .auxiliar").html("A pagar el "+fechaCorte)
// 	else
// 		$("#gasto .auxiliar").html("");

// 	selectCuentasAhorro(tipo);
// }

// $(document).on('click', '#apartados .ingreso', function(event){
// 	apartado = $(this).parent().attr("apartado");
//     nuevoRegistro('ingreso');
// });

// $(document).on('click', '#apartados .gasto', function(event){
// 	apartado = $(this).parent().attr("apartado");
// 	nuevoRegistro('gasto');
// });

// $("#ingreso .footer .btn").click(function(){
// 	$("#ingreso").hide();
// });

// $("#gasto .footer .btn").click(function(){
// 	$("#gasto").hide();
// });


// Pintar apartados

function cargarApartados(){

	var bs = 0;
	budgetsToDistribute = [];

	loader("show");

	$("#principal ul#apartados").html("");

	$.get(serverURL+"apartados-consultar.php",{ a:apartado})
	.done( function(respuesta) {

	    datos = JSON.parse(respuesta);

	    for (i=0;i<= datos.length-1; i++){

	        var output = '';

          output += '<li class="';
					if(datos[i].saldo < (datos[i].reparticion*-2) && datos[i].reparticion!=0)
						output += 'red';
					else if(datos[i].saldo < (datos[i].reparticion*-1) && datos[i].reparticion!=0)
						output += 'yellow';

				if(datos[i].estatus == "0")
					output += 'hide';
				else{
					if(datos[i].nombre == "Disponible")
					output += 'disponible';
					else if (datos[i].nombre == "Imprevistos")
					output += 'imprevisto';
				}
	            output += '" apartado="'+datos[i].nombre+'" id_apartado="'+datos[i].id+'" tipo="'+datos[i].tipo+'" reparticion="'+datos[i].reparticion+'" ';
				if(datos[i].orden == "100")
					output += 'custom="yes"';
				output += ' >'

	            	output += '<div class="info">';
	            		output += '<div class="nombre">';
	            			output += '<i class="'+datos[i].icono+'"></i> ';
	            			output += datos[i].nombre;

							dd = today.getDate();

	            			if(datos[i].fecha_pago != ""){
	            				output += '<small class="fecha ';
	            					if(dd == parseInt(datos[i].fecha_pago)+2 ||
	            					   dd == parseInt(datos[i].fecha_pago)+1 ||
	            					   dd == datos[i].fecha_pago   ||
	            					   dd == datos[i].fecha_pago-1 ||
	            					   dd == datos[i].fecha_pago-2 )
            							output += 'alerta';
	            				output += '">'+datos[i].fecha_pago+'</small>';
	            			}

            			output += '</div>';
	            		output += '<div class="saldo';

	            		var s = datos[i].saldo;
	            		s = parseFloat(s).toFixed(2);

	            		if(datos[i].saldo<0)
        					output += ' negativo';
	            		output += '">$'+s+'</div>';
	            	output += '</div>';

            		// output += '<i class="ingreso fas fa-plus-circle"></i>';
	            	// output += '<i class="gasto fas fa-minus-circle"></i>';

					//OPCIONES APARTADO
	            	output += '<i class="transaction fas fa-plus-circle"></i>';

            		output += '<div class="opciones">';
                		output += '<i class="fas fa-ellipsis-v"></i>';

                		output += '<ul>';
                			output += '<li class="transferencia">Transfer</li>';
                			if(datos[i].reparticion!=0)
								output += '<li class="reparticion" reparticion="'+datos[i].reparticion+'">Distribute ($'+datos[i].reparticion+')</li>';                				
                			else
            					output += '<li class="reparticion disabled">Distribute</li>';
							output += '<li class="change-name">Change Name</li>';
							output += '<li class="change-repartition">Change Repartition</li>';
							output += '<li class="hide-apartado">Hide</li>';
                		output += '</ul>';

                	output += '</div>';



	        $("#principal ul#apartados").append(output);


	        if(apartado == datos[i].nombre){
	        	$("h3.apartado .saldo").html("$"+datos[i].saldo);
	        }

			//Sumar todos los budgets
			if( datos[i].budget == 1 )
				bs += sumBudget(datos[i].nombre)

			//Guardar apartados a distribuir
			if( datos[i].reparticion!=0 )
				budgetsToDistribute.push([datos[i].nombre, datos[i].reparticion]);

	    }

		budgetsCount = bs;

        $("#principal ul#apartados").append('<div id="menu-btn"><i class="fas fa-bars"></i></div>');

	   //  output += '<li class="todo hide">';

	   //  	output += '<div class="info">';
	   //  		output += '<div class="nombre">';
	   //  			output += '<i class="fas fa-clipboard-list"></i>';
	   //  			output += "Ultimos movimientos";
				// output += '</div>';
	   //  	output += '</div>';

    // 	output += '</div>';

	   //  $("#principal ul#apartados").append(output);

	   loader("hide");

		 loadBalance();

	   console.log("Se cargaron apartados");

	})
	.fail( function() {
	    console.log("no se pudo");
	});

}cargarApartados();

//GUARDAR movimiento -----------------------------

// function guardar(tipo=tipo){

// 	loader("show");

// 	function descripcion(){

// 		descripcion = $("#transaction .descripcion").val();

// 		if(apartado=="Prestamos")
// 			descripcion += '<n>'+fechaCorte+'</n>';

// 		return descripcion;
// 	}

// 	//Pendiente{
// 	if(apartado=="Savings")
// 		cuen = $("#"+tipo+" .cuenta").val();
// 	else
// 		cuen = "";
// 	//}

// 	var objeto =
// 	{
// 	    'tipo' : tipo,
// 	    'apar' : apartado,
// 	    'cant' : $("#transaction .cantidad").val(),
// 	    'desc' : descripcion(),
// 	    'cuen' : cuen,
// 	    'esp' : $("#transaction .checkbox input").prop('checked'),
// 	    'm' : $("#transaction .method").val(),
// 	    'fech' : $("#transaction .fecha").val()

// 	};

// 	console.log(objeto);

// 	$.get(serverURL+"movimientos-insertar.php",objeto)
// 	.done( function() {

// 	    console.log("se dió de alta");
// 	    cargarApartados();
// 	    cargarMovimientos(apartado);

// 	})
// 	.fail( function() {
// 	    console.log("no se pudo");
// 	})

// }

function guardar(tipo=tipo, objeto){

	if(objeto==undefined){
		var objeto ={
			'tipo' : tipo,
			'apar' : $("#transaction .apartados").val(),
			'cant' : $("#transaction .cantidad").val(),
			'desc' : $("#transaction .descripcion").val(),
			'esp' : $("#transaction .checkbox input").prop('checked'),
			'fech' : $("#transaction .fecha").val(),
			'm' : $("#transaction .method").val()
		};
	}

	console.log(objeto);

	$.get(serverURL+"movimientos-insertar.php",objeto)
	.done( function() {

	    console.log("se dió de alta");

		if(ventanaPrincipal==true){
			loadMethods();
			cargarApartados();
			loadCharts();
		}
		else
			loadRecords(title,search,methods,apartados,etiquetas);
			

		ammount = "";

	})
	.fail( function() {
	    console.log("no se pudo");
	})

}


// Multiple insert

function insertar(objeto){
	$.get(serverURL+"movimientos-insertar.php",objeto)
}

function multiInsert(){

	a = prompt('Insertar JSON');
	b = a.replace(/'/g, '"');
	registros = JSON.parse(b);

	for(i=0; i < registros.length; i+=1){
		var objeto ={
			'tipo' : registros[i].tipo,
			'apar' : registros[i].apartado,
			'cant' : registros[i].cantidad,
			'desc' : registros[i].descripcion,
			'esp' : '',
			'fech' : registros[i].fecha_mov,
			'm' : registros[i].method 
		};

		insertar(objeto)
 	}

	cargarApartados();
	alert('Se insertaron ',registros.length,' registros');

}



//OPCIONES APARTADOS -----------------------------

$(document).on('click', '#apartados .opciones', function(event){

	$(this).children("ul").toggle();

});


//TRANSFERENCIA -----------------------------

var origen = "";

//Abrir modal transferencia

$(document).on('click', '#apartados .opciones .transferencia', function(event){

	abrir($("#transferencia"));
	$("#transferencia .cantidad").focus();
	origen = $(this).parent().parent().parent().attr("apartado")

	cargarNombresApartados("#transferencia");

});




//Confirmar transferencia

$("#transferencia .confirmar").click(function(){

	loader("show");

	var objeto =
	{
	    'o' : origen,
	    'a' : $("#transferencia select").val(),
	    'c' : $("#transferencia .cantidad").val(),
	    'd' : $("#transferencia .descripcion").val(),
	    'id' : js.MD5('',6)
	};

	console.log(objeto);

	$.get(serverURL+"transferencia-insertar.php",objeto)
	.done( function() {

	    console.log("se dió de alta");
	    cargarApartados();

	})
	.fail( function() {
	    console.log("no se pudo");
	})

});


//REPARTICIÓN -----------------------------

$(document).on('click', '#apartados .opciones .reparticion', function(event){

	var a = $(this).parent().parent().parent().attr("apartado");
	var r = $(this).attr("reparticion")

	repartir(a,r);
	cargarApartados();

});

function repartir(a, c, d=''){

	loader("show");

	var objeto =
	{
	    'a' : a,
	    'c' : c,
		'd' : d
	};

	console.log(objeto);

	$.get(serverURL+"repartir-insertar.php",objeto)
	.done( function() {

	    console.log("se hizo reparticion", a);

	})
	.fail( function() {
	    console.log("no se pudo");
	})

}

//Repartir todo
function distributeAll(){

	a = prompt("Are you sure you want to distribute all weekly budgets? \nSpecific date: YYYY-MM-DD");
	console.log(a)

	if(a!=null){

		if(a==""){
			const year = today.getFullYear();
			const month = String(today.getMonth() + 1).padStart(2, '0');
			const day = String(today.getDate()).padStart(2, '0');

			const formattedDate = `${year}-${month}-${day}`;

			f = formattedDate;
		}
		else{
			f=a;
		}
		
		for (i=0;i<= budgetsToDistribute.length-1; i++){
			repartir(budgetsToDistribute[i][0],budgetsToDistribute[i][1],f+'T12:00');
		}
		cargarApartados();

	}

}

//NAVEGACION -----------------------------

$(".cerrar").click(function(){
	cerrar();
});

function cerrar(){

	console.log('se manda cerrar');

	$(".modal").hide();
	$("#movimientos").hide();
	$("#reporte").hide();
	$("#reporte-gastos-fijos").hide();
	$("#principal").show();
	$("#apartados .opciones ul").hide();
	$("#cambio").hide();
	$("#transaction").hide();
	$("#cost-calc").hide();

	loadMethods();
	cargarApartados();
	loadCharts();

	principal(true);

	apartado = '';
	method = '';

}

document.addEventListener('deviceready',function(event) {
    document.addEventListener('backbutton', function(e) {

    	if(ventanaPrincipal == true){
    		navigator.app.exitApp();
    	}
    	else{
    		cerrar();
    	}

    	cerrar();

    });
}, false);


$(".quitar-desplegado").click(function(){
	cerrar();
	$(this).hide();
});


function abrir(screen){

	screen.show();

	principal(false);

	$("#principal").hide();
	$("#apartados .opciones ul").hide();
	$("#menu").hide();

	$("#movimientos").attr("apartado",apartado)

}


//APARTADOS -----------------------------


//Cargar Apartado

$(document).on('click', '#apartados li .info', function(event){

	title = $(this).children(".nombre").html() +" <span class='saldo'>"+ $(this).children(".saldo").html() + "</span>";
    apartado = $(this).parent().attr("apartado");

	search = { 'apartado' : apartado };

	if(apartado=='Source')
		loadRecords(title,search,methods=true,apartados=true);
	else
		loadRecords(title,search,methods=true);

});

// LOAD RECORDS / Cargar Movimientos-----------

function loadRecords(title='Search',search,methods=true,apartados=false,etiquetas=false){
//loadRecords(title,search,methods,apartados,etiquetas);
/*
var search = {
    'apartado' : '',
    'descripcion' : ''
};
loadRecords('',search,true,true);
*/

	title = title;
	search = search;
	methods = methods;
	apartados = apartados;
	etiquetas = etiquetas;

	console.log('search:');
	console.log(search);

	abrir($("#movimientos"));

	$("h3.apartado").html(title);
	console.log('title:'+title);
	$("#movimientos ul#lista").html("");
	//cuentasAhorro(); Pending


	//Carga generica
	loader("show");
	$.get(serverURL+"movimientos-consultar.php",search)
    .done( function(respuesta) {

        datos = JSON.parse(respuesta);

        for (i=0;i<= datos.length-1; i++){

            var output = '';
                output += '<li id_movimiento="'+datos[i].id+'" tipo="'+datos[i].tipo+'" method="'+datos[i].method+'" source="'+datos[i].source+'" apartado="'+datos[i].apartado+'" ';
            if(datos[i].etiqueta != "")
            	output += ' etiqueta="'+datos[i].etiqueta+'"';

            if(datos[i].highlight == 1)
            	output += ' class="'+'highlighted'+'"';

                output +=' >';

                	output +='<div class="area"></div>';

        		if(methods==true && datos[i].method!= ''){
                	output += '<i class="method ';
            		if(datos[i].method=='Debit Card')
                		output += 'fas fa-money-check-alt';
                	if(datos[i].method=='Jobad Credit Card')
                		output += 'fas fa-credit-card';
            		if(datos[i].method=='Maddie Credit Card')
                		output += 'fas fa-credit-card pink';
					if(datos[i].method=='Respaldo CC')
						output += 'fas fa-credit-card respaldo';
					if(datos[i].method=='Online CC')
						output += 'fas fa-credit-card aqua';
            		if(datos[i].method=='Cash')
                		output += 'fas fa-money-bill';
					if(datos[i].method=='Paypal CC')
						output += 'fab fa-paypal';
					if(datos[i].method=='Amazon CC')
						output += 'fab fa-cc-amazon-pay';
					if(datos[i].method=='Savings')
						output += 'fas fa-piggy-bank';
					if(datos[i].method=='Stock')
						output += 'fas fa-chart-line';
					

					output += '" method="'+datos[i].method+'"> </i>';
        		}

        			output += '<span class="fecha" fecha="'+datos[i].fecha_mov+'">';

                		str = datos[i].fecha_mov;
                		str = str.substr(0, 10);
                		//hora = str.substr(10, 13);
                		hora = moment(datos[i].fecha_mov).format('HH:mm')
                		if (~str.indexOf(date.fechaHoy))
                			output += "Today - "+hora;
                		else if (~str.indexOf(date.fechaAyer))
                			output += "Yesterday - "+hora;
                		else
                			output += moment(datos[i].fecha_mov).format('MMM/DD/YY - HH:mm');

                	output += '</span>';
                	output += '<div class="main-line">';

            	if(apartados==true && datos[i].apartado!= '')
            		output += '<span class="etiqueta">'+datos[i].apartado+'</span>';
	        	if(etiquetas==true && datos[i].etiqueta!= '')
            		output += '<span class="etiqueta">'+datos[i].etiqueta+'</span>';

            		output += '<span class="descripcion">'+datos[i].descripcion+'</span></div>';


                	if(datos[i].apartado=="Prestamos" && datos[i].abonado != ""){
            			output += '<div class="abono"><span class="gris">-Abonado</span> '+datos[i].abonado+' <span class="gris">de $'+datos[i].original+'</span></div>';
                	}


                	output += '<span class="cantidad ';
            		if(datos[i].tipo=="ingreso")
            			output += 'ingreso';
            		else
        				output += 'gasto';
                	output += '">'+datos[i].cantidad+'</span>';

                	output += '<div class="opciones">';
                		output += '<i class="fas fa-ellipsis-v"></i>';

                		output += '<ul>';
                			output += '<li class="cambiar">Change Budget</li>';
            			if(datos[i].apartado=="Prestamos"){
            				output += '<li class="pagar">Pagar y Mover a Imprevistos</li>';
            				output += '<li class="abonar">Abonar</li>';
            			}

            			if(datos[i].highlight == 0)
            				output += '<li class="highlight">Highlight</li>';
            			else
            				output += '<li class="unhighlight">Unhighlight</li>';

							output += '<li class="clone">Duplicate</li>';
                			output += '<li class="borrar">Delete</li>';
                		output += '</ul>';

                	output += '</div>';

                output += '</li>';

            $("#movimientos ul#lista").append(output);

        }

        console.log("Se cargaron movimientos");
        loader("hide");

    })
    .fail( function() {
        console.log("no se pudo");
    });

}


//Opciones movimientos

$(document).on('click', '#movimientos .opciones', function(event){

	$(this).children("ul").toggle();

});

//Modificar movimientos

// $(document).on('click', '#movimientos .modificar', function(event){

// 	abrir($("#modificar-movimiento"));
// 	selectCuentasAhorro("modificar-movimiento");

// 	that = $(this).parent().parent().parent();

// 	$("#modificar-movimiento .cantidad").focus();
// 	$("#modificar-movimiento .cantidad").val(that.children(".cantidad").html());
// 	$("#modificar-movimiento .descripcion").val(that.children(".descripcion").html());
// 	$("#modificar-movimiento .fecha").val(that.children(".fecha").attr("fecha"));
// 	$("#modificar-movimiento .cuenta").val(that.children(".etiqueta").html());


// });

// $("#modificar-movimiento .confirmar").click(function(){

// 	loader("show");

// 	var objeto =
// 	{
// 		'i'  : that.attr('id_movimiento'),
// 		'cA'  : that.children(".cantidad").html(),
// 	    'cN'  : $("#modificar-movimiento .cantidad").val(),
// 	    'd'  : $("#modificar-movimiento .descripcion").val(),
// 	    'f'  : $("#modificar-movimiento .fecha").val(),
// 	    't'  : that.attr('tipo'),
// 	    'a'  : apartado,
// 	    'c'  : $("#modificar-movimiento .cuenta").val(),
// 	};

// 	console.log(objeto);

// 	$.get(serverURL+"movimientos-modificar.php",objeto)
// 	.done( function() {

// 	    console.log("se modificó");
// 	    cargarMovimientos(apartado);
// 	    cargarApartados();

// 	})
// 	.fail( function() {
// 	    console.log("no se pudo");
// 	})


// });

// $("#modificar-movimiento .btn").click(function(){
// 	$("#modificar-movimiento").hide();
// });


//NEW MODIFY

//Apply Modification
$("#modifyRecord").click(function(){

	loader("show");

	var objeto =
	{
		'i'  : that.attr('id_movimiento'),
		'cA'  : that.children(".cantidad").html(),
	    't'  : that.attr('tipo'),
	    'a'  : that.attr("apartado"),
	    'pM'  : that.attr('method'),

	    'cN'  : $("#transaction .cantidad").val(),
	    'd'  : $("#transaction .descripcion").val(),
	    's'  : $("#transaction .checkbox input").prop('checked'),
	    'nM'  : $("#transaction .method").val(),
	    'f'  : $("#transaction .fecha").val()
	};

	console.log(objeto);

	$.get(serverURL+"movimientos-modificar.php",objeto)
	.done( function() {

	    console.log("se modificó");

	    // loadMethods();
		// cargarApartados();
		// loadCharts();

		loadRecords(title,search,methods,apartados,etiquetas);

	})
	.fail( function() {
	    console.log("no se pudo");
	})

});

//Cancel Transaction
$("#transaction .cancel").click(function(){
	$("#transaction").hide();
	apartado = '';
	method = '';
	ammount = '';
	console.log('se limpia apartado y method')
});


//Borrar movimientos

$(document).on('click', '#movimientos .borrar', function(event){

	abrir($("#borrar-movimiento"));
	that = $(this).parent().parent();

});

$("#borrar-movimiento .confirmar").click(function(){

	loader("show");

	var objeto =
	{
	    'id'  : that.parent().attr("id_movimiento"),
	    'idR' : that.parent().attr('id_relacion'),
	    'a'   : apartado,
	    'c'   : that.siblings(".cantidad").html(),
	    't'   : that.parent().attr("tipo")
	};

	//if(that.parent().attr('id_relacion') == undefined){
		$.get(serverURL+"movimientos-borrar.php",objeto)
		.done( function() {

		    console.log("se borró");
		    // loadMethods();
			// cargarApartados();
			// loadCharts();
		    loadRecords(title,search,methods,apartados,etiquetas);

		})
		.fail( function() {
		    console.log("no se pudo");
		})

	//}
	// else{
	// 	$.get(serverURL+"transferencia-borrar.php",objeto)
	// 	.done( function() {

	// 	    console.log("se borraron ambos movimientos");
	// 	    cargarMovimientos(apartado);
	// 	    cargarApartados();

	// 	})
	// 	.fail( function() {
	// 	    console.log("no se pudo");
	// 	})

	// }


});

$("#borrar-movimiento .btn").click(function(){
	$("#borrar-movimiento").hide();
});


// Highlight

$(document).on('click', '#lista li .highlight', function(event){

	$(this).html('Unhighlight');
	$(this).removeClass('highlight');
	$(this).addClass('unhighlight');
	$(this).parent().parent().parent().addClass('highlighted');

	var objeto = {
		'i'  : $(this).parent().parent().parent().attr('id_movimiento'),
		'hl'  : 1
	};
	$.get(serverURL+"movimientos-highlight.php",objeto);

});

$(document).on('click', '#lista li .unhighlight', function(event){

	$(this).html('Highlight');
	$(this).removeClass('unhighlight');
	$(this).addClass('highlight');
	$(this).parent().parent().parent().removeClass('highlighted');

	var objeto = {
		'i'  : $(this).parent().parent().parent().attr('id_movimiento'),
		'hl'  : 0
	};
	$.get(serverURL+"movimientos-highlight.php",objeto);

});

//Clean highlight

function cleanHighlight(){

	a = prompt('Are you sure you want to remove all highlights?')
	if(a!=null){
		$.get(serverURL+"movimientos-highlight-clean.php");
		console.log('se manda borrar highlights');
	}

}


//Cambiar apartado

var ApartadoOrigen = '';
$(document).on('click', '#movimientos .cambiar', function(event){

	console.log('>>>>>>>>>>>>>>>>>>>>>',apartado)

	cargarNombresApartados("#cambiar-apartado");
	$("#cambiar-apartado").show();
	that = $(this).parent().parent().parent();
	ApartadoOrigen = apartado;

});

$("#cambiar-apartado .confirmar").click(function(){


	var objeto = {
		'i'  : that.attr('id_movimiento'),
		'c'  : that.children(".cantidad").html(),
	    'aO'  : ApartadoOrigen,
	    'aD'  : $("#cambiar-apartado select").val(),
	    't'  : that.attr('tipo'),
	};

	console.log(objeto);

	loader("show");

	$.get(serverURL+"movimientos-cambiar-apartado.php",objeto)
	.done( function() {

	    console.log("se modificó");
	    cargarApartados();

	})
	.fail( function() {
	    console.log("no se pudo");
	})

});

$("#cambiar-apartado .btn").click(function(){
	$("#cambiar-apartado").hide();
});


//Pagar prestamo y mover a imprevistos

// $(document).on('click', '#movimientos .pagar', function(event){

// 	loader("show");

// 	that = $(this).parent().parent().parent();

// 	var objeto = {
// 		'i'  : that.attr('id_movimiento'),
// 		'c'  : that.children(".cantidad").html(),
// 		'd'  : that.children(".descripcion").html(),
// 	};

// 	console.log(objeto);

// 	$.get(serverURL+"movimientos-pagar-prestamo.php",objeto)
// 	.done( function() {

// 	    console.log("se modificó");
// 	    cargarMovimientos(apartado);
// 	    cargarApartados();

// 	})
// 	.fail( function() {
// 	    console.log("no se pudo");
// 	})

// });


//Ingreso o gasto desde movimientos

$(document).on('click', '#movimientos .ingreso', function(event){
    nuevoRegistro('ingreso');
});

$(document).on('click', '#movimientos .gasto', function(event){
    //nuevoRegistro('gasto');
});

//CARGAR ATAJOS-----------

function cargarAtajos(apartado,tipo){

	console.log("Se mandan cargar atajos");

	$(".atajos").html("");

	var atajos = new Array();

	switch (apartado){
		case "Source":
			if(tipo=="gasto")
				atajos = ["Energy", "Water", "Phone", "Lease"];
			if(tipo=="ingreso")
				atajos = ["Wage"];
		break;
		case "Groceries":
			if(tipo=="gasto")
				atajos = ["Walmart ", "Dollar Tree ", "Burger King"];
		break;
		case "Hang out":
			if(tipo=="gasto")
				atajos = ["Cinema"];
		break;
		case "Jobad":
			if(tipo=="gasto")
				atajos = ["Gift","Snack"];
		break;
		case "Maddie":
			if(tipo=="gasto")
				atajos = ["Ross","TJ Max"];
		break;
		case "Transport":
			if(tipo=="gasto")
				atajos = ["Lyft ","Uber ","Metro"];
		break;
		case "Bus Job":
			if(tipo=="gasto"){
				$("#gasto .cantidad").val("1.25");
				$("#gasto .descripcion").val("Pass");
				$("#gasto .checkbox input").prop( "checked", false );
			}
		break;
		case "Bus Mady":
			if(tipo=="gasto"){
				$("#gasto .cantidad").val("1.25");
				$("#gasto .descripcion").val("Pass");
				$("#gasto .checkbox input").prop( "checked", false );
			}
		break;
	}

	for (i=0;i<= atajos.length-1; i++){
    	var output = '';
        output += '<div class="btn btn-default">'+atajos[i]+'</div>';
        $(".atajos").append(output);
    }

}

$(document).on('click', '.atajos .btn', function(event){
    var atajo = $(this).html();
    $(this).parent().siblings(".descripcion").val(atajo);
    $(this).parent().siblings(".descripcion").focus();
});


//MOSTRAR Y OCULTAR LOADER-----------

function loader(e="show"){

	if(e=="show"){
		$(".loader").css('display','flex');
	}
	else if(e=="hide"){
		$(".loader").css('display','none');
	}

}

//ABONAR -----------

// $(document).on('click', '.abonar', function(event){

// 	limpiar();
// 	cargarNombresApartados("#abonar");
// 	abrir($("#abonar"));
// 	that = $(this).parent().parent().parent();
// 	$("#abonar .cantidad").focus();

// });

// $("#abonar .confirmar").click(function(){

// 	loader("show");

// 	var objeto =
// 	{
// 	    'c'  : $("#abonar .cantidad").val(),
// 		'a'  : $("#abonar select").val(),
// 	    'd'  : $("#abonar .descripcion").val(),
// 		'id'  : $(that).attr("id_movimiento")
// 	};

// 	console.log(objeto);

// 	$.get(serverURL+"abonar.php",objeto)
// 	.done( function() {

// 	    console.log("se modificó");
// 	    cargarMovimientos(apartado);
// 	    cargarApartados();

// 	})
// 	.fail( function() {
// 	    console.log("no se pudo");
// 	})


// });

// $("#abonar .btn").click(function(){
// 	$("#abonar").hide();
// });


//MENU -----------

$(document).on('click', '#menu-btn', function(event){

	$("#menu").toggle();

});

$(document).on('click', '#menu li', function(event){

	$("#menu").hide();

});


//REPORTE REGISTROS -----------

$(document).on('click', '#reporte-btn', function(event){

	abrir($("#reporte"));
	$("#principal").hide();

	calculaSemana(date.hoyAnio,getWeekNumber(new Date()))

	if(primerDia<10)
		d = "0"+primerDia
	else
		d = primerDia
	$("#reporte .fechaIni").val(date.hoyAnio+"-"+date.hoyMes+"-"+d);

	if(ultimoDia<10)
		d = "0"+ultimoDia
	else
		d = ultimoDia
	$("#reporte .fechaFin").val(date.hoyAnio+"-"+date.hoyMes+"-"+d);

	reportesaCargar();


});

$("#reporte .btn-primary").click(function(){
	reportesaCargar();
});

function reportesaCargar(){
	$("#reporte tbody").html("");

	cargarReporte('Disponible');
	cargarReporte('Comida');
	cargarReporte('Despensa');
	cargarReporte('Gasolina');
	cargarReporte('Libre Yob');
	cargarReporte('Libre Mada');
	cargarReporte('Ropa');
	cargarReporte('Regalos');
	cargarReporte('Imprevistos');
	cargarReporte('Ahorro');
}



function cargarReporte(apartado){


	var objeto = {
		'a'  : apartado,
		'fi'  : $("#reporte .fechaIni").val(),
		'ff'  : $("#reporte .fechaFin").val()
	};

	$.get(serverURL+"reporte.php",objeto)
	.done( function(respuesta) {


	    datos = JSON.parse(respuesta);

	    for (i=0;i<= datos.length-1; i++){

	        var output = '';
	        	output += '<tr>';
	        		output += '<td>'+datos[i].apartado+'</td>';
	        		output += '<td class="ingreso">'+datos[i].ingresos+'</td>';
	        		output += '<td class="gasto">'+datos[i].gastos+'</td>';
	        		output += '<td class="avance">'+datos[i].avance+'</td>';
	        	output += '</tr>';

	        $("#reporte tbody").append(output);

	    }


	})
	.fail( function() {
	    console.log("no se pudo");
	});

}


//REPORTE GASTOS-----------

$("#gastos-fijos-btn").click(function(){

	abrir($("#reporte-gastos-fijos"));
	$("#principal").hide();

	var semanal = 0;
	var mensual = 0;

	for (i=0;i<= $("#apartados > li").length-1; i++){

		if( $("#apartados > li:nth-child("+i+")").attr("tipo") == "semanal" ){
			semanal += parseInt($("#apartados > li:nth-child("+i+")").attr("reparticion"));
		}

		else if ( $("#apartados li:nth-child("+i+")").attr("tipo") == "mensual" ){
			mensual += parseInt($("#apartados > li:nth-child("+i+")").attr("reparticion"));
		}

		else if ( $("#apartados li:nth-child("+i+")").attr("tipo") == "bimestral" ){
			mensual += parseInt( $("#apartados > li:nth-child("+i+")").attr("reparticion") )/2;
		}

	}

	ingreso = $('#apartados li[apartado="Disponible"]').attr("reparticion");
	mensual += (semanal*4.33);

	// Mensual
	$("#gastosMensuales .ingreso span").html(Math.round(ingreso*4.33));
	$("#gastosMensuales .gasto span").html(mensual);
	$("#gastosMensuales .avance span").html( Math.round((ingreso*4.33)-mensual) );

	// Semanal
	$("#gastosSemanales .ingreso span").html(ingreso);
	$("#gastosSemanales .gasto span").html(semanal);
	$("#gastosSemanales .avance span").html(ingreso-semanal);

	//Por semana
	gastosSemana("#anteriorSemana",-1);
	gastosSemana("#estaSemana",0);
	gastosSemana("#siguienteSemana",1);
	gastosSemana("#dosDespues",2);
	gastosSemana("#tresDespues",3);


	function gastosSemana(s,w){

		calculaSemana(date.hoyAnio,getWeekNumber(new Date())+w);
		$(s+" ul").html("<li>Fijos ($"+semanal+")</li>");
		cc=0;

		for (i=1;i<= $("#apartados > li").length; i++){

			a = $("#apartados > li:nth-child("+i+")").attr("apartado");
			c = parseInt($("#apartados > li:nth-child("+i+")").attr("reparticion"));
			f = $("#apartados > li:nth-child("+i+") .fecha").html()

			if(primerDia>ultimoDia)
				ud = 31
			else
				ud = ultimoDia

			if( primerDia <= f && f<= ud){

				cc += c;
				$(s+" ul").append("<li>"+a+" ($"+c+")"+"</li>");

			}

		}

		$(s+" .rango").html(primerDia+" al "+ultimoDia);
		$(s+" .gasto .cantidad").html(semanal+cc);
		$(s+" .avance .cantidad").html(Math.round(ingreso-(semanal+cc)));

	}


});


//FUNCIONES -----------

// Calcular dias de la semana
var primerDia = 0;
var ultimoDia = 0;

function calculaSemana(y,w) {

	// Obtenemos el primer y último día de la semana del año indicado
	primer = new Date(y, 0, (w - 1) * 7 + 1);
	ultimo = new Date(y, 0, (w - 1) * 7 + 7);

	primerDia = primer.getDate()-1;
	ultimoDia = ultimo.getDate()-1;
}

//Calcular numero semana
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}

//ULTIMOS MOVIMIENTOS -----------

$("#ultimos").click(function(){



});


$("#cambio-btn").click(function(){
	abrir($("#cambio"));
	$("#cambio .aPagar").focus();
});

$("#cambio .input-lg").keyup(function(){

	a = parseFloat ($("#cambio .pagarCon").val());
	b = parseFloat ($("#cambio .aPagar").val());

	// console.log(b)

	$("#cambio .auxiliar").html( a - b );


});




//CUENTAS AHORRO -----------

var nombreCuentasAhorro = new Array();
var nombreCuentasAhorro = [
  "Vida Yob",
  "Vida Mada",
  "Ahorro Bancomer",
  "Ahorro Efectivo",
  "Ahorro Dolares",
  "Ahorro Monedas"
];

function cuentasAhorro(){

	if(apartado=="Savings"){

		$("#movimientos #lista").prepend('<li id="cuentas"><ul></ul></li>');

	    for (i=0;i<= 5; i++){

			$.get(serverURL+"cuentas-ahorro.php",{ c:nombreCuentasAhorro[i] })
			.done( function(respuesta) {
			    datos = JSON.parse(respuesta);

		        var output = '';
		        	output += '<li>';
		        		output += '<span class="nombre">'+datos[0].nombre+'</span>';
					    output += '<span class="total';
					    if(datos[0].total<0)
					    	output +=' gasto">-$'+datos[0].total+'</span>';
						else
							output +=' ingreso">$'+datos[0].total+'</span>';
        			output += '</li>';

        		$("#movimientos #cuentas ul").append(output);

			});

	    }

	}

}


function selectCuentasAhorro(tipo){

	console.log(tipo);

	$("#"+tipo+" .cuenta").hide();

	if(apartado=="Savings"){

		console.log("se muestra select ahorro")

		$("#"+tipo+" .cuenta").show();

		for (i=0;i<= 5; i++){
			output = '';
			output += '<option>'+nombreCuentasAhorro[i]+'</option>';

			$("#"+tipo+" .cuenta").append(output);
		}

	}

}


//PASSWORD -----------

var passYob = 5091;
var passPruebas = 1010;
var passMada = 3646;
var passEntrada = "";
var sesion = "";

function sesiones(i){
	switch(parseInt(i)){
		case passYob:
			$("#password").hide();
			sesion = "Yob";
			console.log("Sesión abierta como Yob");
			break;
		case passMada:
			$("#password").hide();
			sesion = "Mada";
			console.log("Sesión abierta como Madaim");
			break;
		case passPruebas:
			$("#password").hide();
			sesion = "Pruebas";
			console.log("Sesión abierta como pruebas");
			break;
		default:
			$("#password").show();
			break;
	}
}

if ( localStorage.getItem("primeraVez") == "no"){
	sesiones( localStorage.getItem("password") )
	console.log("primeravez = no")
}

$(document).on('click', '#password li', function(event){

	var caracter = $(this).html();
	passEntrada = parseInt(passEntrada + caracter);
	console.log(passEntrada);

	localStorage.setItem("password",passEntrada);

	sesiones(passEntrada);


});

//COOKIE -----------

// document.cookie = "galletita=100";
// console.log("cookie guardada");

//PASSWORD -----------

$("#menu").click(function(){
	// location.reload();
});


//LOAD METHODS -----------

var account = 0;
var jobadCC = 0;
var maddieCC = 0;
var respaldoCC = 0;
var cash = 0;
var onlineCC = 0;
var savings = 0;
var stock = 0;
var amazonCC = 0;
var paypalCC = 0;
function loadMethods(){

	$.get(serverURL+"methods-consult.php")
	.done( function(respuesta) {

	    datos = JSON.parse(respuesta);

	    for (i=0;i<= datos.length-1; i++){

	    	switch (datos[i].nombre){
					case 'Account':
											m='Account';
											account = datos[i].saldo;
											break;
					case 'Jobad CC':
											m='JobadCC';
											jobadCC = datos[i].saldo;
					 						break;
					case 'Maddie CC':
											m='MaddieCC';
											maddieCC = datos[i].saldo;
											break;
					case 'Online CC':
											m='OnlineCC';
											onlineCC = datos[i].saldo;
											break;
					case 'Respaldo CC':
											m='RespaldoCC';
											respaldoCC = datos[i].saldo;
											break;
					case 'Cash':
											m='Cash';
											cash = datos[i].saldo;
											break;
					case 'Savings':
											m='Savings';
											savings = datos[i].saldo;
											break;
					case 'Stock':
											m='Stock';
											stock = datos[i].saldo;
											break;
					case 'Amazon CC':
											m='AmazonCC';
											amazonCC = datos[i].saldo;
											break;
					case 'PayPal CC': 		
											m='PayPalCC';
											paypalCC = datos[i].saldo;
											break;
				}

				that = $('#methods .'+m+' .amount'); 
				that.html('$'+datos[i].saldo);
				if (datos[i].saldo < 0)
					that.addClass('negative')
				else
					that.removeClass('negative')



				realAmount = account-(jobadCC*-1)-(maddieCC*-1)-(onlineCC*-1)-(respaldoCC*-1);
				$('#methods .Account .realAmount span').html(realAmount.toFixed(2) );
			if(realAmount<0)
					$('#methods .account .realAmount').addClass('red')
				else
					$('#methods .account .realAmount').removeClass('red')


				console.log('account:',account)

	    }

			methodsCount = ( (parseFloat(realAmount) + parseFloat(cash)) ).toFixed(2);
			console.log('Se cuentan metodos:',methodsCount);

			loadBalance();
	    console.log("Se cargaron metodos");
	})
	.fail( function() {
	    console.log("No se pudo cargar metodos");
	});

}loadMethods();


//SEARCH METHODS -----------

function clickingMethods(m,i,that){
	method = m;
	search = { 'method' : m };
	title = '<i class="'+i+'"></i>' + " " + that.children('.name').html() + " " + that.children('.amount').html();
	loadRecords(title, search,methods=false, apartados=true);
}

$("#methods .Account").click(function(){
	clickingMethods('Debit Card','fas fa-money-check-alt',$(this));
});

$("#methods .JobadCC").click(function(){
	clickingMethods('Jobad Credit Card','fas fa-credit-card',$(this));
});

$("#methods .MaddieCC").click(function(){
	clickingMethods('Maddie Credit Card','fas fa-credit-card pink',$(this))
});

$("#methods .RespaldoCC").click(function(){
	clickingMethods('Respaldo CC','fas fa-credit-card respaldo',$(this))
});

$("#methods .Cash").click(function(){
	clickingMethods('Cash','fas fa-coins',$(this));
});

$("#methods .PayPalCC").click(function(){
	clickingMethods('PayPal CC','fab fa-paypal',$(this));
});

$("#methods .AmazonCC").click(function(){
	clickingMethods('Amazon CC','fab fa-cc-amazon-pay',$(this));
});

$("#methods .OnlineCC").click(function(){
	clickingMethods('Online CC','fas fa-credit-card aqua',$(this));
});

$("#methods .Savings").click(function(){
	clickingMethods('Savings','fas fa-piggy-bank',$(this));
});

$("#methods .Stock").click(function(){
	clickingMethods('Stock','fas fa-chart-line',$(this));
});


//SEARCH METHODS -----------

function methodsExchange(account,amount){
//methodsExchange('Maddie Credit Card',593.46)

	var objeto =
	{
	    'account' : account,
	    'amount' : amount
	};

	console.log(objeto);

	$.get(serverURL+"methods-exchange.php",objeto)
	.done( function() {

	    console.log("se dió de alta");

	    loadMethods();
    	cargarApartados();

	})
	.fail( function() {
	    console.log("no se pudo");
	})

}

//PAY CARDS -----------

$("#pay-card").click(function(){

	var amount = prompt("Amount");

	var selection = prompt("Account (1:Online CC / 2:Jobad CC / 3:Maddie CC / 4:Respaldo CC / 5:Cash / 6:Savings / 7:Stock / 8:AmazonCC / 9:PaypalCC)");
	
	var account = '';

	if (selection == 1) account = 'Online CC';
	if (selection == 2) account = 'Jobad Credit Card';
	if (selection == 3) account = 'Maddie Credit Card';
	if (selection == 4) account = 'Respaldo CC';
	if (selection == 5) account = 'Cash';
	if (selection == 6) account = 'Savings';
	if (selection == 7) account = 'Stock';
	if (selection == 8) account = 'Amazon CC';
	if (selection == 9) account = 'Paypal CC';

	if(amount!=null && account!=''){
		console.log(account,amount)
		methodsExchange(account,amount)
	}
		

});


//SEARCH -----------

$('#search').click(function(){

	var d = prompt("What do you want to search?");
	// var b = prompt("What budget? Groceries/Hangout/Jobad/Maddie/Transport");

	var search = {
    'descripcion' : d
    // 'apartado' : b
	};

	if(d!=null)
		loadRecords('Searching '+d,search,true,true);

});

//Search by Dates

function searchByDates(){
	var fi = prompt("From date to search? YYYY-MM-DD");
	var ff = prompt("To date to search? YYYY-MM-DD");

	var search = {
		'fechaI' : fi,
		'fechaF' : ff
	};

	if(fi!=null & ff!=null )
	loadRecords('Searching '+fi+' to '+ff,search,true,true);

}

//COST CALCULATOR -----------

// $('#cost-calc-btn').click(function(){
// 	$("#cambio").show();
// });

ccDiscount = 0;
function costCalculator(){

	ccAmount = prompt("Amount");
	ccDiscount = prompt("Discount",ccDiscount);

	bt = ccAmount - (ccDiscount*ccAmount/100);
	at = bt * 1.0825;

	alert( 'Before Taxes: '+bt.toFixed(2)+' / After Taxes: '+at.toFixed(2));

}

//PESOS TITHE -----------

function pesosTithe(){

	a = prompt("Income in mexican pesos");
	if(a!=null){
		ammount = (a * .1 / 19).toFixed(2);
		alert(ammount);
	}


}

//TIP CALCULATOR -----------

function tipCalculator(){
	a = prompt("Enter Ammount");
	alert( 'Ammount: '+a+' / Tip: '+(a*.15).toFixed(2)+' / Total: '+(a*1.15).toFixed(2) );
	ammount = (a*1.15).toFixed(2);
}

//CHART -----------

function url(f,a){
	u = serverURL+f;

	c = 0;
	for (prop in a){
		c==0 ? s ='?' : s ='&'
		u += s+prop+'='+a[prop];
		c ++;
	}

	return u;
}

function countExpenses(fi,ff,label) {


	// Return a new promise.
	return new Promise(function(resolve, reject) {
	  // Do the usual XHR stuff
	  var req = new XMLHttpRequest();

	  req.open('GET', url('reporte.php', {fi:fi,ff:ff} ) );

	  req.onload = function() {
		// This is called even on 404 etc
		// so check the status
		if (req.status == 200) {
		  // Resolve the promise with the response text
			resolve(
				[ JSON.parse(req.response)[0].gastos * -1 , label ]
			);
		}
		else {
		  // Otherwise reject with the status text
		  // which will hopefully be a meaningful error
		  reject(Error(req.statusText));
		}
	  };

	  // Handle network errors
	  req.onerror = function() {
		reject(Error("Network Error"));
	  };

	  // Make the request
	  req.send();
	});
}


WeekP = new Array();
MonthP = new Array();

loadCharts();

// Load Chart
function loadChart(p,t,chartRange){

	console.log('Se manda cargar chart')

	Promise.allSettled(p).then(function(r) {

		var ctx = document.getElementById(t).getContext('2d');

		// var gradientFill = ctx.createLinearGradient(0, 0, 0,400);
		// gradientFill.addColorStop(0, "rgba(51, 153, 255, 0.6)");
		// gradientFill.addColorStop(1, "rgba(42, 201, 64, 0.6)");
		var gradientFill = ctx.createLinearGradient(0, 0, 0,170);
		gradientFill.addColorStop(0, "rgba(232, 1, 50, 0.4)");
		gradientFill.addColorStop(1, "rgba(232, 1, 50, 0)");

		//Assign Labels
		chartLabels = new Array();
		for (i=0;i<= p.length-1 ; i++){
			chartLabels.push( r[i].value[1] );
		}

		//Assign Ammounts
		chartAmmounts = new Array();
		for (i=0;i<= p.length-1 ; i++){
			chartAmmounts.push( r[i].value[0] );
		}

		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: chartLabels,
				datasets: [{
					label: 'Expenses by '+chartRange,
					data: chartAmmounts,
					backgroundColor: gradientFill,
					// borderColor:'#3399FF',
					borderColor:'#E80132',
					lineTension: 0,
					borderWidth: 3,
					pointRadius: 4,
					pointHitRadius: 20,
					// pointBackgroundColor: '#3399FF',
					pointBackgroundColor: '#E80132',
					pointHoverRadius:8,
					// pointHoverBackgroundColor: '#3399FF'
					pointHoverBackgroundColor: '#E80132'
				}]
			},
			options: {
				scales: {
					yAxes: [{
						gridLines: {
							display: true,
							color: '#555555',
							zeroLineColor: '#999'
						},
						ticks: {
							beginAtZero: true,
							fontColor: 'white',
							maxTicksLimit: 7
						}
					}],
					xAxes: [{
						gridLines: {
							display: false,
							color: '#555555'
						},
						ticks: {
                fontColor: 'white'
            },
					}],
				},
				legend: {
						display: false,
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'white'
            }
        }
			}
		});

	})

}


// LOCATION

var la = '';
var lo = '';
var lLabel = 'Unknown';

//Save Location
function saveLocation(){

	var getPosition = function (options) {
		return new Promise(function (resolve, reject) {
			navigator.geolocation.getCurrentPosition(resolve, reject, options);
		});
	}

	getPosition(event).then((position) => {

		la = position.coords.latitude.toString();
		lo = position.coords.longitude.toString();

		findLocation();

		m = " Lat:" + la + "/ Lon:" + lo + "/ Place: "+lLabel;
		lLabel = prompt(m);

		if(lLabel!=null){
			var objeto ={
				'la' : la,
				'lo' : lo,
				'l' : lLabel,
			};
			$.get(serverURL+"location-insertar.php",objeto)
		}

		console.log('Se guarda location');
	});

}

//Load location in description
function autocompleteLocation(){

	lLabel = '';
	var getPosition = function (options) {
		return new Promise(function (resolve, reject) {
			navigator.geolocation.getCurrentPosition(resolve, reject, options);
		});
	}

	getPosition(event).then((position) => {

		la = position.coords.latitude.toString();
		lo = position.coords.longitude.toString();

		findLocation();

		$("#transaction .descripcion").val(lLabel);
		console.log('Se autocompleta location');
	});

}

// GOMEZ / ARTIFICIAL INTELLIGENCE

// Distribucion
if(hoyDiaS==0){
	m	= 'Today is Sunday. Click here to distribute budgets';
	e = 'distribute';
	$('#notifications').append('<li class='+e+'>'+m+'</li>')

	$('#notifications .'+e).click(function(){
		toDistribute();
	});
}

//Pagar renta
// if(hoyDia==1 || hoyDia==2 || hoyDia==3){

// 	m	= 'Today is leasing payment day. Click here to pay it now';
// 	e = 'leasing';
// 	$('#notifications').append('<li class='+e+'>'+m+'</li>')

// 	$('#notifications .'+e).click(function(){
// 		window.open(
// 			"https://zocalo.activebuilding.com/portal/payments/external?utm_source=Payments&utm_medium=email&utm_campaign=payments-email&utm_content=No-portal-account-electronic-payment", "_blank");

// 			a = prompt("Type the ammount to save the transaction")
// 			if(a!=null){
// 				var objeto ={
// 					'tipo' : 'gasto',
// 					'apar' : 'Services',
// 					'cant' : a,
// 					'desc' : 'Zocalo Leasing',
// 					'esp' : false,
// 					'fech' : date.fechaHoyFull,
// 					'm' : "Debit Card"
// 				};
// 				guardar("gasto",objeto);
// 			}
// 	});

// }

//Diezmo
// var tithe = 225.7;
// if(hoyDia==10 || hoyDia==25){

// 	m	= 'Today is tithe day. Click here to deliver it ($225.7)';
// 	e = 'tithe';
// 	$('#notifications').append('<li class='+e+'>'+m+'</li>')

// 	$('#notifications .'+e).click(function(){
// 		window.open("https://gracehouston.org/giving", "_blank");

// 		a = prompt("Type the ammount to save the transaction");
// 		if(a!=null){

// 			if(a=='') c = tithe;
// 			else c = a;

// 			//Ingreso
// 			var objeto ={
// 				'tipo' : 'ingreso',
// 				'apar' : 'Tithe',
// 				'cant' : tithe,
// 				'desc' : 'Integrass wage',
// 				'esp' : false,
// 				'fech' : date.fechaHoyFull,
// 				'm' : ""
// 			};
// 			guardar("ingreso",objeto);

// 			//Gasto
// 			var objeto ={
// 				'tipo' : 'gasto',
// 				'apar' : 'Tithe',
// 				'cant' : c,
// 				'desc' : 'Delivery',
// 				'esp' : true,
// 				'fech' : date.fechaHoyFull,
// 				'm' : "Debit Card"
// 			};
// 			guardar("gasto",objeto);

// 		}

// 	});
// }

//Pagar Bancomer
if(hoyDia==6){
	m	= "Today Bancomer's credit card has to be paid";
	$('#notifications').append('<li>'+m+'</li>')
}

//Pagar Bank of america
if(hoyDia==18){
	m	= 'Today Bank of America credit card has to be paid';
	$('#notifications').append('<li>'+m+'</li>')
}

//Budgets vs Available
function AvsB(){

	var bS = countBudgets();

	console.log('BUDGET SUM '+bS);

	var bP = 933.29;
	var d = (account-jobadCC-maddieCC)-bS;

	console.log('d '+d);

	alert('Available vs Budgets = $'+ d.toFixed(1) +' available / Enough for '+ ( d/bP ).toFixed(1) +' week(s) more');


}

//COUNT BUDGETS

// function countBudgets(){
// 	var bS = 0;

// 	for (i=0;i<= $('#apartados > li').length - 1; i++){

// 		var a = $( "#apartados > li:nth-child("+i+")" ).attr('apartado');
// 		console.log(a)
// 		// bS = bS + sumBudget(a);

// 		// bS = bS + sumBudget('Unplanned');
// 		// if( $( "#apartados > li:nth-child("+i+")").attr('budget') == 1 )
// 		sumBudget(a)

// 	} 

// 	//AQUI
// 	// bS = bS + sumBudget('Unplanned');
// 	// bS = bS + sumBudget('Groceries');
// 	// bS = bS + sumBudget('Jobad');
// 	// bS = bS + sumBudget('Maddie');
// 	// bS = bS + sumBudget('Leon');
// 	// bS = bS + sumBudget('Transport');
// 	// bS = bS + sumBudget('Services');
// 	// bS = bS + sumBudget('Tithe');
// 	// bS = bS + sumBudget('Floating Week');
// 	// bS = bS + sumBudget('Savings');
// 	// bS = bS + sumBudget('Travel');
// 	// bS = bS + sumBudget('Medical');
// 	// bS = bS + sumBudget('Judith');
// 	// bS = bS + sumBudget('Sharon Visit');

// 	console.log('Se cuentan apartados:'+bS);
// 	return bS;
// }

function sumBudget(b){
	if (parseFloat( $('#apartados li[apartado="'+b+'"] .saldo').html().substring(1, 20) ) < 0)
	return 0;
	//return parseFloat( $('#apartados li[apartado="'+b+'"] .saldo').html().substring(1, 20) ) * -1;
	else
	return parseFloat( $('#apartados li[apartado="'+b+'"] .saldo').html().substring(1, 20) )
}

//REPORT

function report(){

	var fi = prompt("From date to search? YYYY-MM-DD");
	var ff = prompt("To date to search? YYYY-MM-DD");

	var search = {
		'fechaI' : fi,
		'fechaF' : ff
	};

	if(fi!=null & ff!=null )
	loadRecords('Searching '+fi+' to '+ff,search,true,true);

}

//BALANCE

var balance = 0;
function loadBalance(){
	
//founds
	$('#balance .founds .amount').html('$'+methodsCount);
	if(methodsCount < 0){
		$('#balance .founds .amount').addClass('red');
	}
	else{
		$('#balance .founds .amount').removeClass('red');
	}

	//Budgets
	$('#balance .budgets .amount').html('$'+budgetsCount.toFixed(2));

	if(budgetsCount < 0){
		$('#balance .budgets .amount').addClass('red');
	}
	else{
		$('#balbudgetsudgets .amount').removeClass('red');
	}

	//Balance
	balance = (methodsCount - budgetsCount).toFixed(2);
	$('#balance .balance .amount').html('$'+balance);
	if(balance < 0){
		$('#balance .balance .amount').addClass('red');
		$('.colapsado').show();
	}
	else{
		$('#balance .balance .amount').removeClass('red');
		$('.colapsado').hide();
	}



	console.log('Se carga balance')
}

$('#balance').click(function(){
	// var ba = methodsCount - budgetsCount;
	// var n = 90 //Unplanned
	// 			+ 170 //Groceries
	// 			+ 40 //Hangout
	// 			+ 20 //Jobad
	// 			+ 20 //Maddie
	// 			+ 30 //Leon
	// 			+ 20 //Home
	// 			+ 30 //Transport
	// 			+ 380 //Services
	// 			;
	// console.log('weekly expenses:', n)
	// alert('Current balance: $'+(ba).toFixed(2)+
	// 		"\nNeeded for next week's budgets: $"+(n).toFixed(2)+
	// 		"\nNext week's balance: $"+(ba-n).toFixed(2));

	alert('Founds = Account + Cash \nBudgets = Unplanned + Jobad + Maddie, etc.\nBalance = Founds - Budgets (dinero sobrante)')
});


//STATUS
$('#status .date').html( moment(today).format('dddd, MMM DD') );

function daysTo(){

	t = today.getDate()
	d = 'Paycheck day';

	if (t < 10){
		d = 10 - t;
		d = d+' days to paycheck'
	}
	else if (t > 25){
		d = 10 + (31-t);
		d = d+' days to paycheck'
	}
	else if (t > 10 && t < 25){
		d = 25 - t;
		d = d+' days to paycheck'
	}

	return d;

}


$('#status .days').html( daysTo() );

//CHANGE NAME
$(document).on('click', '#apartados .change-name', function(event){

	var objeto ={
		'a' : $(this).parent().parent().parent().attr("apartado"),
		'n' : prompt("New budget name")
	}

	console.log(objeto);

	if(objeto.a!=null && objeto.n!=null){
		$.get(serverURL+"nombre-cambiar.php",objeto)
		.done( function() {
	
			console.log("se mando cambiar nombre");
	
			loadMethods();
			cargarApartados();
			loadCharts();
	
		})
		.fail( function() {
			console.log("no se pudo");
		})
	}

});


//NEW BUDGET
function newBudget(){

	var objeto ={
		'n' : prompt("Budget Name:"),
		'r' : prompt("Weekly Ammount:")
	}

	console.log(objeto);

	if(objeto.n!=null && objeto.r!=null){
		$.get(serverURL+"apartados-insertar.php",objeto)
		.done( function() {
	
			console.log("se manda crear nombre");
	
			loadMethods();
			cargarApartados();
			loadCharts();
	
		})
		.fail( function() {
			console.log("no se pudo");
		})
	}

}


// CHANGE REPARTITION

$(document).on('click', '#apartados .change-repartition', function(event){

	var objeto ={
		'i' : $(this).parent().parent().parent().attr("id_apartado"),
		'r' : prompt("Repartition Ammount:")
	}

	console.log(objeto);

	if(objeto.r!=null){
		$.get(serverURL+"apartados-cambiar-repartition.php",objeto)
		.done( function() {
	
			console.log("se cambiar reparticion");
	
			loadMethods();
			cargarApartados();
			loadCharts();
	
		})
		.fail( function() {
			console.log("no se pudo");
		})
	}

});

//HIDE APARTADO
$(document).on('click', '#apartados .hide-apartado', function(event){

	var objeto ={
		'i' : $(this).parent().parent().parent().attr("id_apartado"),
	}

	console.log(objeto);

		$.get(serverURL+"apartados-hide.php",objeto)
		.done( function() {
	
			console.log("se esconde apartado");
	
			loadMethods();
			cargarApartados();
			loadCharts();
	
		})
		.fail( function() {
			console.log("no se pudo");
		})

});

//ADVANCE REPORT
function advancedReport(){

	b = prompt('Budget\n Type "a" for all')
	fi = prompt('Starting Date (YYYY-MM-DD) \n Type "1" for current month');
	ff = prompt('Ending Date (YYYY-MM-DD) \n Type "1" for current month');

	d = new Date();
	m = d.getMonth()+1;
	if(m<10) m = '0'+m;

	if(ff!=null){
		if(b=='a') b = 'all';
		if(fi=='1') fi = '2023-'+m+'-01';
		if(ff=='1') ff = '2023-'+m+'-32';
	}

	window.location.href = 'https://financedemo.visssible.com/backend/custom-search.php?b='+b+'&fi='+fi+'&ff='+ff;

}

// CLONE
$(document).on('click', '#movimientos .clone', function(event){

	that = $(this).parent().parent().parent();

	var t = '';
	if(that.attr('tipo')=='gasto')
		t = 'expense';
	else if(that.attr('tipo')=='ingreso')
		t = 'income';
	newTransaction(t,'no-clean');

	$("#transaction .cantidad").val(that.children('.cantidad').html());
	$("#transaction .apartados").val(that.attr('apartado'));
	$("#transaction .descripcion").val(that.children('.main-line').children('.descripcion').html());
	$("#transaction .method").val(that.attr('method'));
	$("#transaction .fecha").val(fechaHoy);

	//Fecha
	$("#transaction .fecha").val( date.fechaHoyFull );

});