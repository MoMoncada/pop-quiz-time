const startButton = document.getElementById("start-button")
var nextButton = document.getElementById("next-button")
var timer = document.querySelector("#countdown");
var introText = document.getElementById("quiz-intro")
var qContainerElement = document.getElementById("q-container")
var qElement = document.getElementById("question")
var ansOptionsElement = document.getElementById("answer-options")
var qScore = document.getElementById("quiz-score");

var secLeft = 50, score = 0;
var qIndex,timeInterval, userData = JSON.parse(localStorage.getItem('scores')) || []; 




//----- Array for Q&A's -----//
var questions = [

    {
        question: "How do you add a comment in a JavaScript?",
        answers: [
            {text:"<!--This is a comment-->", correct: false},
            {text: " -> This is a comment <-", correct: false},
            {text: "/* This is a comment */", correct: true},
            {text: " 'This is a comment' ", correct: false}
        ]
    
    },

    {
        question: "Javascript is an ______ language?",
        answers: [
            {text:"Object-Oriented", correct: true},
            {text: "Object-Based", correct: false},
            {text: "Procedural", correct: false},
            {text: "None of the above", correct: false}
        ]
    },

    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            {text:"<jsing>", correct: false},
            {text: "<jshere>", correct: false},
            {text: "<link>", correct: false},
            {text: "<script>", correct: true}
        ]
    
    },

    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        answers: [
            {text:"document.write()", correct: false},
            {text: "console.log()", correct: false},
            {text: "window.alert()", correct: false},
            {text: "All of the above", correct: true}

        ]
    
    },

    {
        question: "How do you create a function in JavaScript?",
        answers: [
            {text:"make.myfunction()", correct: false},
            {text: "function myFunction()", correct: true},
            {text: "function = myFunction()", correct: false},
            {text: "All of the above", correct: false}
        ]
    
    }

   

   
]


// ----- The quiz will start after clicking the Start Button -----//
startButton.addEventListener("click", startQuiz)


// ----- The following question shows up when we click on 'next' -----
nextButton.addEventListener("click", () => {
    nextQuestion()
})


// ----- First click on 'start' will hide the button and intro and fetch the first question ---- //
function startQuiz() {
    startButton.classList.add("hide")
    introText.classList.add("hide")
    qContainerElement.classList.remove("hide")
    qScore.classList.add("hide");
    qIndex = 0
    score = 0;
    nextQuestion()
    startCountdown ()

}


// ----- End the quiz when we have looped through the array of Q's or the timer gets to '0' ----- //

function stopQuiz() {
    
    
    qContainerElement.classList.add("hide");
    startButton.innerText = 'Restart'
    qScore.classList.remove("hide");
    
    clearInterval(timeInterval);
    document.getElementById("score").innerHTML = score;
    
}

// ---- this function will save the user information, receive as a parameters the initials and score of the user ---- //
function saveScore(initials){
    userData.push({
        name: initials,
        score: score
    })
    
    localStorage.setItem('scores', JSON.stringify(userData));
    debugger
    introText.classList.remove("hide");
    startButton.classList.remove('hide');
    qScore.classList.add("hide");
    countdown.textContent = "Timer"
    secLeft = 50;
}

function gethighScores(){
    
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    return scores.sort((a, b) => a.score - b.score);
    
}

function generateList(){
    let items = gethighScores();


    for (let i = 0; i < items.length; i++) {
        var resultsDetails = `${items[i].name}` + " - " + `${items[i].score}` + " points";
       
        listItem = document.createElement("li");
        document.querySelector("#myItemList").appendChild(listItem);
        listItem.innerText = [i+1] + ". " + resultsDetails;
    }   


   
}

function nextQuestion() {
    resetStatus ()
    showQuestion(questions[qIndex]) //

}

// ----- This function will generate each question after clicking 'start'/'next' ----- //
function showQuestion(question) {
    qElement.innerText = question.question


    question.answers.forEach(answer => {

        const newButton = document.createElement('button')
        newButton.innerText = answer.text
        newButton.classList.add('button')

        
        if (answer.correct) {
            newButton.dataset.correct = answer.correct

        }

        newButton.addEventListener('click', selectAns)
        ansOptionsElement.appendChild(newButton)


    })

}


  

function selectAns(e) {
    var selectedOption = e.target
    var correct =  selectedOption.dataset.correct

    quizAnsStatus (document.body, correct)

// ----- Condition to add score/ remove time ----- //
    if(correct){
        score+=20;
    }else{
        secLeft-=10;
    }

// ----- We fill up the 'button containers' with the next array of answers ----- //
    Array.from(ansOptionsElement.children).forEach(newButton => {
        quizAnsStatus(newButton, newButton.dataset.correct)
    })


    qIndex ++;
    if (questions.length >= qIndex +1) { 
        nextButton.classList.remove('hide')
    } else {
        stopQuiz();
    }
    
    
 }


function resetStatus() {

nextButton.classList.add('hide')

while (ansOptionsElement.firstChild) {
    ansOptionsElement.removeChild (ansOptionsElement.firstChild)
}

}

// ----- Colour code for answer (correct/incorrect) ----- //
function quizAnsStatus (element, correct) {
    clearAnsStatus (element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong') 
    
    }

}


function clearAnsStatus(element) {
element.classList.remove('correct')

}


// ---- Timer Countdown ---- //

  function startCountdown() {

    timeInterval = setInterval(function() {
        if (secLeft > 1) {
            countdown.textContent = secLeft + "s";
            secLeft--;
        
        } else {
            countdown.textContent = "Oops!";
            stopQuiz();
            clearInterval(timeInterval);
             
        }
    }, 1000);
}





