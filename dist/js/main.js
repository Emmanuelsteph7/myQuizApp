//constants
const startBtn = document.querySelector(".start-btn");
const nextBtn = document.querySelector(".next-btn");
const backBtn = document.querySelector(".back-btn");
const submitBtn = document.querySelector(".submit-btn");
const questionDiv = document.querySelector("#questions");
const answerDiv = document.querySelector("#answer-div");
let shuffledQuestions, currentQuestionIndex, displayResult;
const form = document.querySelector("form");
const completeStatus = document.querySelector("#completeStatus");
let resultArray = [];

//start button clicks
startBtn.addEventListener("click", startGame);

function startGame(e) {
	e.preventDefault();
	reset();
	displayResult = false;

	// add hide class to startDiv
	var startDiv = document.querySelector(".start-div");
	startDiv.classList.add("hide");

	// remove hide class from other divs
	var displayQuiz = document.querySelectorAll(".quiz-start");
	for (var i = 0; i < displayQuiz.length; i++) {
		displayQuiz[i].classList.remove("hide");
	}

	nextBtn.innerHTML = "Next<i class='fas fa-arrow-right ml-1'></i>";

	//shuffle the questions
	shuffledQuestions = $questions.sort(() => Math.random() - 0.5);
	currentQuestionIndex = 0;
	displayQuestion(shuffledQuestions, currentQuestionIndex);
	timer();
}

function displayQuestion(shuffledQuestions, currentQuestionIndex) {
	// display the questions
	questionDiv.innerHTML = shuffledQuestions[currentQuestionIndex].question;

	//display the answers by creating buttons for each answer.
	// answer is the array of the answers object in questions.js
	shuffledQuestions[currentQuestionIndex].answers.forEach((answer) => {
		var answerBtn = document.createElement("button");
		answerBtn.innerText = answer.text;
		answerBtn.classList.add("btn");
		answerBtn.classList.add("btn-outline-info");
		answerBtn.classList.add("w-100");
		answerBtn.classList.add("my-2");
		answerBtn.classList.add("text-left");

		//set the data-content property of only the button that is correct
		answerBtn.dataset.correct = answer.correct;

		// add a click event to the button
		answerBtn.addEventListener("click", selectAnswer);
		answerDiv.appendChild(answerBtn);
	});
}

function selectAnswer(e) {
	var selectedBtn = e.target;
	var correctStatus = selectedBtn.dataset.correct;
	result(correctStatus);

	if (correctStatus == "true") {
		// style the button when answer is correct
		setStatus(selectedBtn, correctStatus);

		// make sure that you can't change the selected answer after clicking
		Array.from(answerDiv.children).forEach((button) => {
			button.classList.add("removePointer");
		});
	} else {
		// style the button when answer is false
		setStatus(selectedBtn, correctStatus);

		// if you click the wrong answer, it will style the correct answer too
		Array.from(answerDiv.children).find((button) => {
			if (button.dataset.correct == "true") {
				setStatus(button, button.dataset.correct);
			}
		});

		// if you click the wrong answer, it will make sure you can't click other button
		Array.from(answerDiv.children).forEach((button) => {
			button.classList.add("removePointer");
		});
	}
}

function result(correctStatus) {
	// update the result array
	resultArray.push(correctStatus);

	// calculate the result
	var score = resultArray.filter((answer) => {
		return answer == "true";
	});

	let totalScore = Math.round((score.length / shuffledQuestions.length) * 100);
	return totalScore;
}

function clearBtnStatus() {
	Array.from(answerDiv.children).find((button) => {
		if (button.target) {
			clearStatus(button);
		}
	});
}

function showResult(correctStatus) {
	// hide other elements
	questionDiv.classList.add("hide");
	answerDiv.classList.add("hide");
	nextBtn.classList.add("hide");

	// create elements for showing result
	const resultPage = document.createElement("div");
	const paragraph1 = document.createElement("p");
	paragraph1.innerText =
		"Thank you for completing the quiz. Here is your result";
	paragraph1.classList.add("text-center");
	paragraph1.classList.add("my-3");
	const paragraph2 = document.createElement("p");
	paragraph2.innerText = "You got " + result(correctStatus) + "% correct";
	paragraph2.classList.add("text-center");
	paragraph2.classList.add("display-4");
	resultPage.appendChild(paragraph1);
	resultPage.appendChild(paragraph2);
	const restartQuiz = document.createElement("button");
	restartQuiz.innerText = "Restart Quiz";
	restartQuiz.classList.add("btn");
	restartQuiz.classList.add("btn-outline-info");
	restartQuiz.classList.add("mx-auto");
	restartQuiz.classList.add("w-100");
	restartQuiz.classList.add("my-2");
	const row = document.querySelector("#row");
	row.appendChild(resultPage);
	row.appendChild(restartQuiz);
	restartQuiz.addEventListener("click", (e) => {
		row.removeChild(resultPage);
		row.removeChild(restartQuiz);
		questionDiv.classList.remove("hide");
		answerDiv.classList.remove("hide");
		nextBtn.classList.remove("hide");
		resultArray = [];
		currentQuestionIndex = 0;
		document.querySelector("#progress-bar").style.width = "0%";

		completeStatus.innerHTML = "0% complete";
		startGame(e);
	});
}

function setStatus(element, correct) {
	// function for setting status of buttons
	clearStatus(element);
	if (correct == "true") {
		element.classList.add("bg-success");
		element.classList.add("text-white");
	} else {
		element.classList.add("bg-danger");
		element.classList.add("text-white");
	}
}

function clearStatus(element) {
	element.classList.remove("bg-successs");
	element.classList.remove("bg-danger");
	element.classList.add("text-white");
}

//add click event to next btn
nextBtn.addEventListener("click", setNextQuestion);

function setNextQuestion() {
	reset();

	// update progress bar
	displayResult = false;
	currentQuestionIndex++;

	let displayStatus = Math.round(
		(currentQuestionIndex / shuffledQuestions.length) * 100
	);

	completeStatus.innerHTML = displayStatus + "% complete";

	document.querySelector("#progress-bar").style.width =
		String(displayStatus) + "%";

	// to change inner text of nextBtn at final question
	if (currentQuestionIndex === shuffledQuestions.length - 1) {
		nextBtn.innerText = "Submit";
	} else {
		nextBtn.innerHTML = "Next<i class='fas fa-arrow-right ml-1'></i>";
	}

	if (currentQuestionIndex > shuffledQuestions.length - 1) {
		questionDiv.classList.add("hide");
		answerDiv.classList.add("hide");
		nextBtn.classList.add("hide");
		currentQuestionIndex = shuffledQuestions.length - 1;
		displayResult = true;
		showResult();
	} else {
		displayQuestion(shuffledQuestions, currentQuestionIndex);
	}
}

function timer() {
	// timer for the quiz
	let time = 180;

	var timer = setInterval(() => {
		let minutes = Math.floor(time / 60);
		let seconds = time % 60;
		if (time <= 0) {
			clearInterval(timer);
			result();
			showResult();
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		if (displayResult) {
			clearInterval(timer);
		}

		document.querySelector("#countdown").innerHTML = minutes + ":" + seconds;
		time--;
	}, 1000);
}

function reset() {
	// to remove the previous question
	while (answerDiv.firstChild) {
		answerDiv.removeChild(answerDiv.firstChild);
	}
}
