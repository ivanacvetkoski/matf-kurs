var numberOfBoxes = 10;
var shades = [];
var oneShade;
var body = document.querySelector("body");
var boxes = document.querySelectorAll(".box");
var mainBox = document.querySelector(".mainBox");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");

main();

function main(){
	set();
	alignBoxes();
}

function set(){

	// pravimo niz random boja pozivom funkcije randomShades
	shades = randomShades(numberOfBoxes);
	
	// biramo jednu od njih da bude trazena 
	var random = Math.floor(Math.random() * shades.length);
	oneShade = shades[random];
	mainBox.style.background = oneShade;
	
	// postavljamo boje kockama
	for(var i = 0; i < boxes.length; i++){
		if(shades[i]){
			boxes[i].style.background = shades[i];
		}
	}
	h1.style.background = "white";
}

function randomShades(num){

	// slucajno biramo jedn boju, a ostale dobijamo menjanjem nje
	var array = []
	
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	array.push("rgb(" + r + ", " + g + ", " + b + ")");

	var nR=r;
	var nG=g;
	var nB=b;

	for(var i = 1; i < num; i++){
		if(i<num/3){
			if(nR<100)
				nR=nR+30;
			else
				nR=nR-40;
			array.push("rgb(" + nR + ", " + g + ", " + b + ")");
		}else if(i<num/3*2){
			if(nG<100)
				nG=nG+30;
			else
				nG=nG-40;
			array.push("rgb(" + r + ", " + nG + ", " + b + ")");
		}else{
			if(nB<100)
				nB=nB+30;
			else
				nB=nB-40;
			array.push("rgb(" + r + ", " + g + ", " + nB + ")");
		}
	}
	return array;
}

function alignBoxes(){

	// proveravamo da li je korisnik pogodio boju
	for(var i = 0; i < boxes.length; i++){
		boxes[i].addEventListener("click", function(){

			if(this.style.background === oneShade){
				message.textContent = "YES";
				h1.style.background = "pink";
				body.style.background = "pink";

				for(var i = 0; i < boxes.length; i++){
					if(boxes[i].style.background !== oneShade)
						boxes[i].style.background="pink";
					}
					
			} else {
					this.style.background = "#232323";
					message.textContent = "No...Try again"
			}
		});
	}
}
