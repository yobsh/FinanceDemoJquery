//Locations
function findLocation(){

	if(la.match(/36.35/) && lo.match(/94.25/)) lLabel = "Walmart"; //14th
	if(la.match(/36.33/) && lo.match(/94.22/)) lLabel = "Walmart"; //I
	if(la.match(/36.36/) && lo.match(/94.22/)) lLabel = "Walmart"; //Super Center
	if(la.match(/36.369/) && lo.match(/94.221/)) lLabel = "Panda Express";
	if(la.match(/36.35/) && lo.match(/94.22/)) lLabel = "Aldi"; 
	if(la.match(/36.35/) && lo.match(/94.29/)) lLabel = "Guanajuato"; //Centertone
	if(la.match(/36.34/) && lo.match(/94.12/)) lLabel = "Goddwill"; //Goodwill
	if(la.match(/36.30/) && lo.match(/94.17/)) lLabel = "TJ Maxx"; //TJ MAXX
	if(la.match(/36.33/) && lo.match(/94.17/)) lLabel = "Ross"; //Ross walnut
	if(la.match(/36.28/) && lo.match(/94.14/)) lLabel = "Ross"; //De burlinton
	// if(la.match(/36.31/) && lo.match(/94.26/)) lLabel = "Parc at Bentonville "; 

}