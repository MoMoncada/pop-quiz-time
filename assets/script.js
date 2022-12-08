// le quiero quitar el shuffle al orden de las preguntas para que salgan en el orden del array 
// function para que el quiz termine al acabar las preguntas o si se acaba el tiempo
// ponerle score a las preguntas correctas y que se muestren en pantalla
// guardar los scores y poner un input con iniciales que se guarde
//ponele los colores que querras xD si lo ves ofensivo, trat'e con todo mi ser de no usar azul y negro 


const startButton = document.getElementById("start-button")
var nextButton = document.getElementById("next-button")
var timer = document.querySelector("#countdown");
var introText = document.getElementById("quiz-intro")
var qContainerElement = document.getElementById("q-container")
var qElement = document.getElementById("question")
var ansOptionsElement = document.getElementById("answer-options")
var qScore = document.getElementById("quiz-score");

var secLeft = 30, score = 0;
var qIndex,timeInterval, userData = [] //




//----- Array for Q&A's -----//
var questions = [
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
        question: "Does Chip like lettuce?",
        answers: [
            {text:"Yes", correct: false},
            {text: "Sometimes", correct: false},
            {text: "More than meat", correct: false},
            {text: "Hates it", correct: true}
        ]
    
    },

    {
        question: "Does Jay steal my snacks?",
        answers: [
            {text:"Yes", correct: true},
            {text: "YES", correct: true},
            {text: "YEEEEESSS", correct: true},
            {text: "And he never replaces them", correct: true}
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
        question: "Does Chip like lettuce?",
        answers: [
            {text:"Yes", correct: false},
            {text: "Sometimes", correct: false},
            {text: "More than meat", correct: false},
            {text: "Hates it", correct: true}
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

/* 
    this function will be triggered when the timer reaches 0 or the quiz is completed 
*/
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
    introText.classList.remove("hide");
    startButton.classList.remove('hide');
    qScore.classList.add("hide");
    countdown.textContent = "Timer"
    secLeft = 30;
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

    
    // condition to add score or remove time
    if(correct){
        score+=20;
    }else{
        secLeft-=5;
    }

    Array.from(ansOptionsElement.children).forEach(newButton => {
        quizAnsStatus(newButton, newButton.dataset.correct)
    })

    // qindex counter added
    qIndex ++;
    if (questions.length > qIndex + 1) { //
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




