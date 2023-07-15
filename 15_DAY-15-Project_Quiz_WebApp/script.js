const questions = [
    {
        question: "Which type of JavaScript language is ___",
        answers: [
            {text: "Object-Oriented", correct: false},
            {text: "Object-Based", correct: true},
            {text: "Assembly-language", correct: false},
            {text: "High-level", correct: false}
        ]
    },
    {
        question: "The 'function' and 'var' are known as:",
        answers: [
            {text: "Keywords", correct: false},
            {text: "Data types", correct: false},
            {text: "Declaration statements", correct: true},
            {text: "Prototypes", correct: false}
        ]
    },
    {
        question: "Which of the following number object function returns the value of the number?",
        answers: [
            {text: "toString()", correct: false},
            {text: "valueOf()", correct: true},
            {text: "toLocaleString()", correct: false},
            {text: "toPrecision()", correct: false}
        ]
    },
    {
        question: "When interpreter encounters an empty statements, what it will do:",
        answers: [
            {text: "Shows a warning", correct: false},
            {text: "Prompts to complete the statement", correct: false},
            {text: "Throws an error", correct: false},
            {text: "Throws an error", correct: true}
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionsIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionsIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionsIndex];
    let questionNo = currentQuestionsIndex + 1;
    questionElement.innerHTML = questionNo + ". " +  currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button =  document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct =  answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn =  e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionsIndex++;
    if(currentQuestionsIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionsIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
