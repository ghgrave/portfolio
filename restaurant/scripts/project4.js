
/*var arrays for menu page*/
var menuPrices = new Array(5, 6, 2, 1, 1.25, 2.25);
var menuImage = new Array("<img src='images/hamburger.jpg' alt='hamburger' width='50px' height='50px'>",
	 "<img src='images/cheeseburger.jpg' alt='cheeseburger' width='50px' height='50px'>",
	 "<img src='images/curleyFries.jpg' alt='curley french fries' width='50px' height='50px'>",
	 "<img src='images/fries.jpg' alt='french fries' width='50px' height='50px'>",
	 "<img src='images/soda.jpg' alt='soda in a glass' width='50px' height='50px'>",
	 "<img src='images/shake.jpg' alt='milk shake' width='50px' height='50px'>");
var menuDesc = new Array("Hamburger: USDA ground beef, lettuce, tomato, pickles, mayo",
	"Cheeseburger: USDA ground beef, lettuce, tomato, pickles, mayo, cheese",
	"Curley Fries: Idaho potatoes fried in 100% vegetable oil, seasoned salt hint of red pepper",
	"Fries: Idaho potatoes fried in 100% vegetable oil, seasoned salt",
	"Soda: Coke, Diet Coke, Iced Tea, Lemonade, Sprite - FREE refills",
	"Shakes: Chocolate, Strawberry, Vanilla, Mixed - whipped cream, nuts, cherry");
	
	
/*var arrays for specials*/	
var specialMenuPrices = new Array(2.5, 5, 7, 3, 1.25, .10, .25);
var specialMenuImage = new Array("<img src='images/hamburger.jpg' alt='hamburger' width='50px' height='50px'>",
	 "<img src='images/kids.jpg' alt='cartoon kids' width='50px' height='50px'>",
	 "<img src='images/burgerFries.jpg' alt='cheeseburger and fries' width='50px' height='50px'>",
	 "<img src='images/cheeseFries.jpg' alt='chili cheese fries' width='50px' height='50px'>",
	 "<img src='images/hotDog.jpg' alt='hotdog' width='50px' height='50px'>",
	 "<img src='images/fries.jpg' alt='french fries' width='50px' height='50px'>",
	 "<img src='images/dancing.jpg' alt='cartoon kids dancing' width='50px' height='50px'>");
var specialMenuDesc = new Array("Half-priced hamburgers <b>3pm-7pm</b>",
	"Kids under 6 ---> all-they-can-eat for $5.00",
	"Cheeseburger, french fries and your choice of soda",
	"Chili Cheese Fries: Idaho potatoes fried in 100% vegetable oil, seasoned salt, cheese, chili, and bacon",
	"Hot Dogs: Your choice of TOPPINGS -> cheese, chili, onions, relish, ketchup, mustard, bacon",
	"50's French Fry-days = get your french fries for 50's prices!!!",
	"Come and join our Saturday sock hop and get 25 cent sodas - Coke, Diet Coke, Iced Tea, Lemonade, Sprite - FREE refills");
	
var BANNERFIGURE = new Array ("images/hamburger.jpg", "images/shake.jpg", "images/cheeseburger.jpg");
var counter = 0;
var bannerImages = setInterval(banner, 3000);

	
/*populates menu page*/
function tableImage(imagePlace) {
	var imageVar = new Array();
	imageVar.src = menuImage[imagePlace];
	document.write(imageVar.src).innerHTML;
	}
	
function tableDesc(descPlace){
	var descVar = menuDesc[descPlace];
	document.write(descVar);
	}
	
function prices(inPlace){
	var priceDec = menuPrices[inPlace].toFixed(2);
	document.write('$' + priceDec);
	}

/*populates specials page*/
function tableImageSpec(imagePlace) {
	var imageVar = new Array();
	imageVar.src = specialMenuImage[imagePlace];
	document.write(imageVar.src).innerHTML;
	}
	
function tableDescSpec(descPlace){
	var descVar = specialMenuDesc[descPlace];
	document.write(descVar);
	}
	
function pricesSpec(inPlace){
	var priceDec = specialMenuPrices[inPlace].toFixed(2);
	document.write('$' + priceDec);
	}
	
//runs the banner on home page	
function banner (){
	var newImage = document.getElementById("bannerImg");
	if (counter < BANNERFIGURE.length) {
		newImage.src = BANNERFIGURE[counter];
		counter ++;
	} else {
		newImage.src = "images/fries.jpg";
		return counter = 0;
	}//closes if/else statements	
}//closes banner function


//calculate total order
function calculate (){
	//var menuPrices = new Array(5, 6, 2, 1, 1.25, 2.25);
	var list = document.getElementsByClassName("menuItem");
	var subTotal = 0;
	var tax = .0625;
	var total = 0;
	
	
	//resets all boxes to original styles
	for (var i = 0; i < list.length; i ++){
			list[i].style.backgroundColor = "white";
			list[i].style.border = "";
	}//closes for loop
	
	//tests to see if any input boxes are empty
	for (var i = 0; i < list.length; i ++){
		if(list[i].value === "") {
			list[i].style.backgroundColor = "pink";
			list[i].style.border = "red solid 1px";
			return alert("Please enter a qty");
		}//closes empty string test
	}//closes for loop
	
	//tests to see if any values are NaN
	for (var i = 0; i < list.length; i ++){
		if(isNaN(list[i].value)) {
			list[i].style.backgroundColor = "pink";
			list[i].style.border = "red solid 1px";
			return alert("Please enter a number");
		}//closes empty string test
	}//closes for loop
	
	//tests to see if any values are NaN
	for (var i = 0; i < list.length; i ++){
		var x = menuPrices[i];
		var y = parseInt(list[i].value);
		subTotal += (x * y);
	}//closes for loop
	tax = (subTotal * tax);
	total = subTotal + tax;
	alert("Your total is as follows:" + 
		"\nSubtotal: $" + subTotal.toFixed(2) +
		"\nTax (6.25%): $" + tax.toFixed(2) +
		"\nTOTAL = $" + total.toFixed(2));		
}//closes calculate function

//form validation and prevention of submission
		//event handler
function createSubmitListener(){

	var FORM = document.getElementsByTagName("form")[0];

	if (FORM.addEventListener) {
		FORM.addEventListener("submit", formValidate, false);
			} else if (FORM.attachEvent) {
			FORM.attachEvent("onsubmit", formValidate);
		}//closes if statements	
}//closes createListener function

function formValidate(evt){
	var emp = document.getElementsByName("position");
	var errorBorder = document.getElementById("openings");
	for (i = 0; i < emp.length; i ++) {
		if (emp[i].checked) {
			open("confirmation.html");
			return;
		}//closes radio button test	
	}//closes for loop
	
	
	evt.preventDefault();
	errorBorder.style.border = "red solid 3px";
	alert("Form has not been sent. \nPlease indicate which position you are applying for");	
}//closes formValidate function

if (window.addEventListener) {
	window.addEventListener("load", createSubmitListener, false);
	} else if (window.attachEvent) {
		window.attachEvent("onload", createSubmitListener);
	}//closes window listener





