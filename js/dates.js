
//Variables de fecha
var hoy = new Date();
var hoyDia = hoy.getDate();
var hoyDiaS = hoy.getDay();
// https://www.w3schools.com/jsref/jsref_getday.asp
var hoyMes = hoy.getMonth()+1;
var hoyAnio = hoy.getFullYear();
var numd = hoy.getDay();
var hour = hoy.getHours();
var mins = hoy.getMinutes();

var fechaAyer = new Date();
fechaAyer.setDate(fechaAyer.getDate() - 1);

var fechaAntier = new Date();
fechaAntier.setDate(fechaAntier.getDate() - 2);

fechaHoy = moment(hoy).format('YYYY-MM-DD');
fechaAyer = moment(fechaAyer).format('YYYY-MM-DD');
fechaAntier = moment(fechaAntier).format('YYYY-MM-DD');


var date = {
	hoy: new Date(),
	hoyDia: hoy.getDate(),
	hoyDiaS: hoy.getDay(),
	hoyMes: hoy.getMonth()+1,
	hoyAnio: hoy.getFullYear(),
	numd: hoy.getDay(),
	hour: hoy.getHours(),
	mins: hoy.getMinutes(),

	fechaAyer: hoy.getDate()-1,

	fechaHoy: moment(hoy).format('YYYY-MM-DD'),
	fechaHoyFull: moment(hoy).format('YYYY-MM-DDTHH:mm'),
	fechaAyer: moment(fechaAyer).format('YYYY-MM-DD'),
	fechaAyerFull: moment(hoy).format('YYYY-MM-DDTHH:mm'),
}


function getPromises(){

// y = today.getFullYear();
// m = today.getMonth();

// var fi1 = y+'-'+m+'-01';
// var ff1 = y+'-'+m+'-31';

// var fi2 = y+'-'+m+'-01';
// var ff2 = y+'-'+m+'-31';

// var fi3 = y+'-'+m+'-01';
// var ff3 = y+'-'+m+'-31';

// var fi4 = y+'-'+m+'-01';
// var ff4 = y+'-'+m+'-31';

// var fi5 = y+'-'+new Date(date.setMonth(hoyMes-1))+'-01';
// var ff5 = y+'-'+new Date(date.setMonth(hoyMes-1))+'-31';

// var fi5 = y+'-'+new Date(date.setMonth(hoyMes))+'-01';
// var ff5 = y+'-'+new Date(date.setMonth(hoyMes))+'-31';

MonthP = [
// countExpenses('2019-03-01','2019-03-32', 'Mr'),
// countExpenses('2019-04-01','2019-04-32', 'Ap'),
// countExpenses('2019-05-01','2019-05-32', 'My'),
// countExpenses('2019-06-01','2019-06-32', 'Jn'),
// countExpenses('2019-07-01','2019-07-32', 'Jl'),
// countExpenses('2019-08-01','2019-08-32', 'Ag'),
// countExpenses('2019-09-01','2019-09-32', 'Sp'),
// countExpenses('2019-10-01','2019-10-32', 'Oc'),
// countExpenses('2019-11-01','2019-11-32', 'Nv'),
// countExpenses('2019-12-01','2019-12-32', 'Dc'),
// countExpenses('2020-01-01','2020-01-32', 'Jn'),//2020
// countExpenses('2020-02-01','2020-02-32', 'Fb'),
// countExpenses('2020-03-01','2020-03-32', 'Mr'),
// countExpenses('2020-04-01','2020-04-32', 'Ap'),
// countExpenses('2020-05-01','2020-05-32', 'My'),
// countExpenses('2020-06-01','2020-06-32', 'Jn'),
// countExpenses('2020-07-01','2020-07-32', 'Jl'),
// countExpenses('2020-08-01','2020-08-32', 'Au'),
// countExpenses('2020-09-01','2020-09-32', 'Sp'),
// countExpenses('2020-10-01','2020-10-32', 'Oc'),
// countExpenses('2020-11-01','2020-11-32', 'Nv'),
// countExpenses('2020-12-01','2020-12-32', 'Dc'),
// countExpenses('2021-01-01','2021-01-32', 'Jn'),//2021
// countExpenses('2021-02-01','2021-02-32', 'Fb'),
// countExpenses('2021-03-01','2021-03-32', 'Mr'),
// countExpenses('2021-04-01','2021-04-32', 'Ap'),
// countExpenses('2021-05-01','2021-05-32', 'My'),
// countExpenses('2021-06-01','2021-06-32', 'Jn'),
// countExpenses('2021-07-01','2021-07-32', 'Jl'),
// countExpenses('2021-08-01','2021-08-32', 'Au'),
// countExpenses('2021-09-01','2021-09-32', 'Sp'),
// countExpenses('2021-10-01','2021-10-32', 'Oc'),
// countExpenses('2021-11-01','2021-11-32', 'Nv'),
// countExpenses('2021-12-01','2021-12-32', 'Dc'),

//AUTOMATIC ROLLING 12
countExpenses(autoF(1,-12),autoF(32,-12),autoLb(-12)),
countExpenses(autoF(1,-11),autoF(32,-11),autoLb(-11)),
countExpenses(autoF(1,-10),autoF(32,-10),autoLb(-10)),
countExpenses(autoF(1,-9),autoF(32,-9),autoLb(-9)),
countExpenses(autoF(1,-8),autoF(32,-8),autoLb(-8)),
countExpenses(autoF(1,-7),autoF(32,-7),autoLb(-7)),
countExpenses(autoF(1,-6),autoF(32,-6),autoLb(-6)),
countExpenses(autoF(1,-5),autoF(32,-5),autoLb(-5)),
countExpenses(autoF(1,-4),autoF(32,-4),autoLb(-4)),
countExpenses(autoF(1,-3),autoF(32,-3),autoLb(-3)),
countExpenses(autoF(1,-2),autoF(32,-2),autoLb(-2)),
countExpenses(autoF(1,-1),autoF(32,-1),autoLb(-1)),
countExpenses(autoF(1,0),autoF(32,0),autoLb(0))
];



function autoF(d,n){
	y = currentYear;
	m = currentMonth + n;

	if(m < 1){
		m = 12+m;
		y = currentYear -1;
	}
	
	if(m<10) m = '0'+m;
	if (d<10) d = '0'+d;

	return y+'-'+m+'-'+d;
}

function autoLb(n){

	m = currentMonth + n;

	if(m < 1){
		m = 12+m;
	}

	var label = '';
	if(m=='1') label = 'Ja';
	if(m=='2') label = 'Fb';
	if(m=='3') label = 'Mr';
	if(m=='4') label = 'Ap';
	if(m=='5') label = 'My';
	if(m=='6') label = 'Jn';
	if(m=='7') label = 'Jl';
	if(m=='8') label = 'Au';
	if(m=='9') label = 'Sp';
	if(m=='10') label = 'Oc';
	if(m=='11') label = 'Nv';
	if(m=='12') label = 'Dc';

	return label;
}




// if(m<10) m = '0'+m;

WeekP = [
// countExpenses('2020-01-05','2020-01-11', 'Ja11')
// ,countExpenses('2020-01-12','2020-01-18', 'Ja18')
// ,countExpenses('2020-01-19','2020-01-25', 'Ja25')
// ,countExpenses('2020-01-26','2020-02-01', 'Fe1')
// ,countExpenses('2020-02-02','2020-02-08', 'Fe8')
// ,countExpenses('2020-02-09','2020-02-15', 'Fe15')
// ,countExpenses('2020-02-16','2020-02-22', 'Fe22')
// ,countExpenses('2020-02-23','2020-02-29', 'Fe29')
// ,countExpenses('2020-03-01','2020-03-07', 'Ma7')
// ,countExpenses('2020-03-08','2020-03-14', 'Ma14')
// ,countExpenses('2020-03-15','2020-03-21', 'Ma21')
// ,countExpenses('2020-03--08','2020-03-14', 'Ma28')
// ,countExpenses('2020-03-29','2020-04-04', 'Ap4')
// ,countExpenses('2020-04-05','2020-04-11', 'Ap11')
// ,countExpenses('2020-04-12','2020-04-18', 'Ap18')
// ,countExpenses('2020-04-19','2020-04-25', 'Ap25')
// ,countExpenses('2020-04-26','2020-05-02', 'My2')
// ,countExpenses('2020-05-03','2020-05-09', 'My9')
// ,countExpenses('2020-05-10','2020-05-16', 'My16')
// ,countExpenses('2020-05-17','2020-05-23', 'My23')
// ,countExpenses('2020-05-24','2020-05-30', 'My30')
// ,countExpenses('2020-05-31','2020-06-06', 'Jn6')
// ,countExpenses('2020-06-07','2020-06-13', 'Jn13')
// ,countExpenses('2020-06-14','2020-06-20', 'Jn20')
// ,countExpenses('2020-06-21','2020-06-27', 'Jn27')
// ,countExpenses('2020-06-28','2020-07-04', 'Jl4')
// ,countExpenses('2020-07-05','2020-07-11', 'Jl11')
// ,countExpenses('2020-07-12','2020-07-18', 'Jl18')
// ,countExpenses('2020-07-19','2020-07-25', 'Jl25')
];

}


function getDate(a,m,d){
    return a+'-'+m+'-'+d;
}

function getWeekDates(){

    var anio = '';
    var mes = '';
    var dia = '';

    dia = hoyDia-hoyDiaS;


}
getWeekDates();


function getSunday(d) {
    d = new Date(d);
    var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6:0); // adjust when day is sunday
    // return new Date();

    return moment(d.setDate(diff)).format('YYYY-MM-DD')
}

function getSaturday(d) {
    d = new Date(d);
    var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6:6); // adjust when day is sunday
    // return new Date();

    return moment(d.setDate(diff)).format('YYYY-MM-DD')
}

// console.log( getSunday(hoy) );
// console.log( getSaturday(hoy) );

//LOAD CHARTS
function loadCharts(){
	getPromises();
	loadChart(MonthP,'monthChart','Month');
	// loadChart(WeekP,'weekChart','Week');
}