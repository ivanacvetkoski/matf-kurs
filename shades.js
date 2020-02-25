var clicks = 0;
var level = 1;
var shades = [];
var oneShade;
var boxes = document.querySelectorAll(".box");
var mainBox = document.querySelector(".mainBox");
var message = document.querySelector("#message");

main();

function main(){
	message.textContent="Ready?";
	set();
	checkBoxes();
}

function set(){

	// pravimo niz random boja pozivom funkcije randomShades
	shades = randomShades();
	
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
}

function randomShades(){

	// slucajno biramo jednu boju, a ostale dobijamo menjanjem nje
	var array = []
	
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);

	array.push("rgb(" + red + ", " + green + ", " + blue + ")");

	var newRed=red;
	var newGreen=green;
	var newBlue=blue;

	for(var i = 1; i < 10; i++){
		if(i<10/3){
			if(newRed<100)
				newRed=newRed+30;
			else
				newRed=newRed-40;
			array.push("rgb(" + newRed + ", " + green + ", " + blue + ")");
		}else if(i<10/3*2){
			if(newGreen<100)
				newGreen=newGreen+30;
			else
				newGreen=newGreen-40;
			array.push("rgb(" + red + ", " + newGreen + ", " + blue + ")");
		}else{
			if(newBlue<100)
				newBlue=newBlue+30;
			else
				newBlue=newBlue-40;
			array.push("rgb(" + red + ", " + green + ", " + newBlue + ")");
		}
	}
	return array;
}

function nextLevel(){
	set();
	checkBoxes();
}

function checkBoxes(){

	// proveravamo da li je korisnik pogodio boju
	for(var i = 0; i < boxes.length; i++){
		boxes[i].addEventListener("click", check);
	}
}

function check(){
	
	if(this.style.background === oneShade){
		
		if(level < 6){
			level = level + 1;
			nextLevel();
		}else{
			var username = loadUsername();
            sendResult(username, 50-clicks);
            getResult(); 
			clicks=0;
			level = 1;
			message.textContent = "Ready?";
			set();
			return;
		}

	} else {
			clicks=clicks+1;
			this.style.background = "#232323";
			
	}
	message.textContent = "Score:" + (50-clicks);
}

const sendResult = async (username, result) => {
    try { 
        const URL = 'http://localhost:3002/';
        const response = await fetch(URL, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            mode : 'cors',
            body : JSON.stringify({
                name : username,
                score : result
            })
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        
    } catch (err) {
        console.error(err);
    }
}


function loadUsername() {
	//kraj igre, korisnik upisuje ime
    let name = prompt("Enter your name", "Name");
    let username = "";

    if (name == null || name == "") {
        username = "User cancelled the prompt.";
    } else {
        username = name;
    }
    
    return username;
};