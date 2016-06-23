
//Gets an html element by ID.
var dom = function(id) { return document.getElementById(id); }

var answer = 0; 			//Holds the answer to the random operation.
var index = 3;				//Holds the number of tries allowed.
var numQuestions = 0; 		//Holds the number of questions answered.
var answeredCorrectly = 0; 	//Holds the number of questions answered correctly.
var score = 0;				//Holds the score.
var inGame = false;
var isValid = true;

/* ARRAYS
 * @easyOperations - Holds the 5-7 arithmatic operations.
 * @hardOperations - Holds the 7-10 arithmatic operations.
 */
var easyOperations = [ function(randNum1, randNum2) { return randNum1 + randNum2; },
					   function(randNum1, randNum2) { return randNum1 - randNum2; }
];

var hardOperations = [ function(randNum1, randNum2) { return randNum1 + randNum2; },
					   function(randNum1, randNum2) { return randNum1 - randNum2; },
					   function(randNum1, randNum2) { return randNum1 * randNum2; },
					   function(randNum1, randNum2) { return randNum1 / randNum2; }
];

/* FUNCTION - getRandNumEasy
 * Gets a random number between 0-100.
 */
function getRandNumEasy() { return Math.floor((Math.random() * 100) + 1); }

/* FUNCTION - getRandNumHard
 *	gets a random number between 0-1000.
 */
function getRandNumHard() { return Math.floor((Math.random() * 1000) + 1); }

/* FUNCTION - hideButton
 * Hides the play button and shows the arithmatic game elements.
 */

function hideStuff() {
	//Hide the age group button and success/error/wrong message, name & name label.
	dom("hard").setAttribute("class", "hide");
	dom("easy").setAttribute("class", "hide");
	dom("message").setAttribute("class", "hide");
	dom("name").setAttribute("class", "hide");
	dom("message").setAttribute("class", "hide");
	dom("next").setAttribute("class", "hide");
	dom("equation").setAttribute("class", "hide");
	dom("answer").setAttribute("class", "hide");
	dom("playAgain").setAttribute("class", "hide");
	dom("quit").setAttribute("class", "hide");
	dom("subtitleRight").setAttribute("class", "hide");
}

/*	FUNCTION - playHard
 *	Executes the game, gets random numbers, plugs them into a random function from the array,
 *  shows the problem on the screen, sets the answer for the equation for comparison with user'dom
 *  answer.
 */
function playHard() {
	
	if ((dom("name").value).length < 1)
	{
		dom("name").setAttribute("placeholder", "Error: Enter your name.");
		dom("name").focus();
	}
	else
	{	
		nextProblem();
	}
}

function nextButton() {
	checkAnswer();	

	if(isValid) {
/////////Timeout until next problem/////
		nextProblem();
	}
}

function keyPressEnter(element, event) {
//////////When	
	if (event.keyCode == 13) {
		checkAnswer();
/////////if isvalid and timeout 
		nextProblem();
	}
}

function nextProblem() {

		hideStuff();

		dom("subtitleRight").innerHTML = "<h6 class=\"right-align\">Question " + ((numQuestions++) + 1) + "</h6>";
		dom("subtitleRight").setAttribute("class", "show");

		//set the class types for the equation, answer textbox, and the quit button.
		dom("quit").setAttribute("class", "waves-effect waves-light cyan lighter-1  white-text btn");
		
		//Show the next button.
		dom("next").setAttribute("class", "waves-effect waves-light white-text lighter-2 btn");

		//Set the answer text box back to it'dom default style, keep it focused, 
		//editable, and clear the value.d
		dom("answer").focus();
		dom("answer").readOnly = false;
		dom("answer").value = "";

		var num1 = getRandNumEasy();	//Random number 1.
		var num2 = getRandNumEasy();	//Random number 2.
		var html = "";					//String for creating output.

		//Variable holds the index of the random function from hardOperations array.
		var randomProblem = Math.floor(Math.random() * (hardOperations.length-1));	

		//Get the answer to the problem from the function in the hardOperations array.
		answer = hardOperations[randomProblem](num1, num2);

		//Using the index, we can determine which operation will be performed and create our output.
		switch (randomProblem) {

			case 0:
				html += num1 + " + " + num2; 
				break;
			case 1:
				html += num1 + " - " + num2;
				break;
			case 2:
				html += num1 + " * " + num2;
				break;
			case 3:
				html += num1 + " / " + num2;
		}

		//Show the problem and input line for answer.
		dom("equation").innerHTML = html + " = ";
		dom("equation").setAttribute("class", "grey-text lighten-2 inlineLabel");
		dom("answer").setAttribute("class", "box");
} 

/*	FUNCTION checkAnswer(element, event)
 *	@ element - takes an element as an argument.
 *  @ event - Holds the event that happened when a key was pressed.
 *	This will check for 'Enter' key pressed and check the answer of the textbox against the correct
 * 	answer.
 */
function checkAnswer() {
	
		//If the input from the user is NOT the answer AND the counter is not at 0,
		//clear the input and display a message to try again.
		if (parseInt(dom("answer").value) !== answer && index !== 0) {
			//Clear textbox.
			dom("answer").value = "";
			//Select the textbox.
			dom("answer").focus();
			//Set the message to try again.
			dom("message").innerHTML = "Try Again. " + index-- + " tries left. ";
			isValid = false;
		//If the answer is correct, show a congratulatory message, the next button, and set the
		//text box to read-only. Reset the index.
		} else if (parseInt(dom("answer").value) === answer) {
			//Update the message.
			dom("message").innerHTML = "GOOD JOB!";
			//Set the textbox to a green outline.
			dom("answer").setAttribute("class", "correct");
			//Set the textbox to read-only.
			dom("answer").readOnly = true;
			//Reset the index.
			index = 3;
			//Increment the number of questions answered correctly.
			answeredCorrectly++;
			isValid = true;
		//Otherwise, show the correct answer.
		} else {
			//Update the message with the correct answer.
			dom("message").innerHTML = "0 Tries left. Correct Answer : " + answer;
			//set the textbox to a red outline.
			dom("answer").setAttribute("class", "showAnswer");
			//set the value in the text box to the correct answer.
			dom("answer").value = answer;
			//Make the text box uneditable.
			dom("answer").readOnly = true;
			//Reset the index.
			index = 3;
			isValid = true;
////////////Figure out a way to stop them from pressing enter and getting a correct on this
		}
		
		inGame = true;

		//Show the message that was set by the if-else-if statement.
		dom("message").setAttribute("class", "show");
}

function endGame() {

	hideStuff();
	
	score = (answeredCorrectly / numQuestions) * 100;

	var topTenString = "";

	localStorage["name"] = dom("name").value;
	localStorage["correct"] = answeredCorrectly;

	try{
		JSON.parse(localStorage["scores"]);
	}
	catch(err){
		var fakeNames = ["Chris","Abby","Nate","Jessica","Paul","Sarah","Andy","Jenny","Harry","Amy"];
		var fakeScores = [10,9,8,7,6,5,4,3,2,1];
		var fakeHighScore = [fakeNames,fakeScores];
		localStorage.setItem("scores", JSON.stringify(fakeHighScore));
	}
	var newScores = [];
	var newNames = [];

	//alert("1. "+JSON.parse(localStorage["names"])[0][0] + ": " + JSON.parse(localStorage["names"])[1][0]);
	for(var index1 = 0;index1<10;index1++){
		newNames[index1] = JSON.parse(localStorage["scores"])[0][index1];
		newScores[index1] = JSON.parse(localStorage["scores"])[1][index1];
	}
	for(var index = 0;index<10;index++){
		if(parseInt(localStorage["correct"]) >= parseInt(JSON.parse(localStorage["scores"])[1][index])){
			//alert(index);
			//alert(newNames);
			newNames.splice(index,0,localStorage["name"]);
			newScores.splice(index,0,localStorage["correct"]);
			newNames.pop();
			newScores.pop();
			//alert(newNames);
			localStorage["scores"] = JSON.stringify([newNames,newScores]);
			
			index = 10;
			
		}
	}

	topTenString += "<h2 class=\"center\">";	
	topTenString += "<i class=\"fa fa-star fa-spin fa-fw yellow-text\" aria-hidden=\"true\"></i>";
	topTenString += "<span class=\"yellow-text darker-5\">  TOP TEN  </span>";
	topTenString += "<i class=\"fa fa-star fa-spin fa-fw yellow-text\" aria-hidden=\"true\"></i>";
	topTenString += "</h2><br>";
	topTenString += "Name Highscore<br><hr>";

	for(var index = 0;index<10;index++){
		topTenString += (index+1) + ". "+JSON.parse(localStorage["scores"])[0][index] + ": " + JSON.parse(localStorage["scores"])[1][index] + "<br>";
	}

	//dom("message").innerHTML = "Your score is " + score.toFixed(2) + "%. Questions : " + numQuestions + " Correct : " + answeredCorrectly;
	dom("message").innerHTML = topTenString;
	dom("message").setAttribute("class", "show");
	dom("playAgain").setAttribute("class", "waves-effect waves-light btn pink lighten-1");

	inGame = false;
}

/* FUNCTION - window.onload
 * Sets focus to the answer textbox on page load.
 */
window.onload = function() {
	dom("name").focus();
	dom("message").innerHTML = "How old are you?";
	dom("easy").setAttribute("class", "show waves-effect waves-light white-text btn-large amber lighten-2 left");
	dom("hard").setAttribute("class", "show waves-effect waves-light white-text btn-large purple lighten-3");
}

//Dynamically set font size on window resize
$(document).ready(function() {

	var fontSize = $(window).width()/55;
	$('body').css('font-size', fontSize);
	
	$(window).resize(function() {
		var fontSize = $(window).width()/55;
		$('body').css('font-size', fontSize);
	});

});
