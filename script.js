fetch('questions.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(questions => {
    console.log(questions); // Afficher les questions pour vérification
    // Utilisez les données de questions comme vous le souhaitez
    console.log("hhhhh" + questions[0]);
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const questionelement = document.getElementById("question");
const answerbutton = document.getElementById("answer buttons");
const nextbutton = document.getElementById("next-btn");
const returnbutton = document.getElementById("return-btn");
const backbutton = document.getElementById("back");
let currentquestionindex = 0 ;
let timeValue =  23;
let que_count = 0;
let que_numb = 1;
let score = 0;
let counter;
let counterLine;
let widthValue = 0;
var indexofbutton ;
let userAnswers = new Array(questions.length).fill(null);
function startQuiz (){
	currentquestionindex = 0 ;
	score=0;
	lol.style.display = "";
	nextbutton.innerHTML= "Next";
	returnbutton.innerHTML="Return"
	showquestion();
}

function showquestion(){
	resetstate();
	let i =0;
	let currentquestion=questions[currentquestionindex];
	let questionNo = currentquestionindex + 1 ;
	questionelement.innerHTML = questionNo + "." + currentquestion.question;
	currentquestion.options.forEach(options => {
    const button = document.createElement("button");
	button.innerHTML=options;
	button.classList.add("btn");
	answerbutton.appendChild(button);
	if(options)
		button.dataset.correct = i;
	button.addEventListener("click",selectanswer);
	i=i+1;
	});
	starttimer(timeValue);
	starttimeliner(widthValue);
	if(currentquestionindex<questions.length && currentquestionindex > 0){
		returnbutton.style.display = "block";
	}else{
		returnbutton.style.display = "none";
	}
	console.log("the score is so good =" + score);
	
}


function starttimer (time){
	counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = answerbutton.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(answerbutton.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    answerbutton.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    answerbutton.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
			Array.from(answerbutton.children).forEach(button => {
button.disabled = true ;
});
            

nextbutton.style.display = "block";  
        }
    }
}

function starttimeliner(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time >839){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function resetstate(){
nextbutton.style.display = "none";
while(answerbutton.firstChild){
	answerbutton.removeChild(answerbutton.firstChild);
}
}

function selectanswer (e) {
clearInterval(counter); //clear counter
clearInterval(counterLine); //clear counterLine
const selectedbtn = e.target;
userAnswers[currentquestionindex] = selectedbtn.dataset.correct;
console.log("the user answer " + userAnswers[currentquestionindex]);
if(selectedbtn.dataset.correct == questions[currentquestionindex].answer){
	selectedbtn.classList.add("correct");
	score=score+1;
}else{
	selectedbtn.classList.add("incorrect");
}
Array.from(answerbutton.children).forEach(button => {
    if(button.dataset.correct == questions[currentquestionindex].answer){
        button.classList.add("correct");
    }
button.disabled = true ;
});
nextbutton.style.display = "block";
}

nextbutton.addEventListener("click",()=>{
if(currentquestionindex < questions.length){
clearInterval(counter); //clear counter
clearInterval(counterLine); //clear counterLine	
	handlenextbutton();
}else{
	clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
	startQuiz();
}
});



returnbutton.addEventListener("click",()=>{
if(currentquestionindex<questions.length && currentquestionindex > 0 ){
clearInterval(counter); //clear counter
clearInterval(counterLine);
handlereturnbutton();
}
});

backbutton.addEventListener("click",()=>{
window.location.href = "index.html";
});


function showscore(){
resetstate();
questionelement.innerHTML = `you Scored ${score} out of ${questions.length}`
nextbutton.innerHTML="Play Again";
nextbutton.style.display = "block";
backbutton.style.display = "block";
returnbutton.style.display="none";
lol.style.display="none";
console.log("arrivee ici")	;
}

function handlereturnbutton (){
currentquestionindex--;
indexofbutton = userAnswers[currentquestionindex];
console.log( "2-the index of the choice = "+ indexofbutton + " and the current question index answer " +questions[currentquestionindex].answer+"the user answer array "+ userAnswers[currentquestionindex] );
if(indexofbutton == questions[currentquestionindex].answer){
	score--;
}
showquestion();
}

function handlenextbutton () {
currentquestionindex++;
if(currentquestionindex<questions.length){
	showquestion();
}else{
	showscore();
	
}
}




startQuiz();
  })
  
  .catch(error => {
    console.error('There was a problem fetching the data:', error);
  });

