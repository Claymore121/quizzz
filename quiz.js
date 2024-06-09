const questions = [
    {
    question:"¿¿cual es la edad de sherk??",
    answers:[
        {   text:"23", correct: false},
        {   text:"nadie sabe", correct:false},
        {   text:"2", correct:false},
        {   text:"la edad del universo", correct:true}
        
    ]
    },
    {
        question:"¿¿de que color es mi calzon??",
        answers:[
            {   text:"rojo", correct: false},
            {   text:"nadie sabe", correct:false},
            {   text:"no traes", correct:true},
            {   text:"negro", correct:false} 
            
        ],
        check:true
    },
    {
        question:"¿capital de mexico ?",
        answers:[
            {   text:"Cuidad de Mexico", correct: true},
            {   text:"Caracas", correct:false},
            {   text:"mexico", correct:false},
            {   text:"Culiacan", correct:false}
            
        ],
        check:true
    },
    {
        question:"¿¿cual es el numero atomico del uranio 235??",
        answers:[
            {   text:"mango", correct: false},
            {   text:"92", correct:true},
            {   text:"3.1416265", correct:false},
            {   text:"235", correct:false}
            
        ],
        check:true
    },
    {
        question:"Ahórrate el sermón, Obi-Wan. Conozco todas las mentiras de los jedi. No tengo miedo al Lado Oscuro como tú. ¡He traído la paz, la libertad, la justicia… y la seguridad a mi nuevo Imperio!..",
        answers:[
            {   text:"¿Tu nuevo Imperio?", correct: true},
            {   text:"No me obligues a matartee", correct:false},
            {   text:"Anakin, yo le debo lealtad a la República, ¡a la Democracia!", correct:false},
            {   text:"Si no estas conmigo, eres mi enemigo", correct:false}
            
        ],
        check:true
    },
    {
        question:"mejor dark souls??",
        answers:[
            {   text:"DS 1", correct: false},
            {   text:"Dark Souls 3", correct:false},
            {   text:"Dark Souls 2", correct:false},
            {   text:"Elden Ring", correct:true}
            
        ],
        check:true
    },
    {
        question:"Doce señoras <br> todas con medias y sin zapatos <br> ¿de que hablamos?",
        answers:[
            {   text:"Las horas", correct: true},
            {   text:"Tu ptm", correct:true},
            {   text:"las monjas", correct:false},
            {   text:"asilo", correct:false}
            
        ],
        check:true
    },
    {
        question:"No existe un lazo entre tú y yooo <br>"+
                    "No hubo promesaas <br>"+
                    "Ni juramentooos <br>"+
                    "Nada de nada<br>"+
                    "Tú, la misma de ayer<br>"+
                    "La incondicional<br>"+
                    "La que no espera nada<br>",
        answers:[
            {   text:"La incondicional", correct: false},
            {   text:"La que no espera nada", correct:false},
            {   text:"Tú, la misma de ayer", correct: true},
            {   text:"si no quieres no", correct:false}
            
        ],
        check:true
    },
]


const questionElement = document.getElementById("question");
const answersBtns = document.getElementById("answer_buttons");
const nextBtn = document.getElementById("next_btn");
const questionsRandom = randomQuestion(questions);

let questionIndex = 0;
let score = 0;
let lastNumber=null;


// function numberRandom(){
//     let number;
//     do{
//         number = Math.floor(Math.random()*questions.length);
//     }while(number === lastNumber);

//     lastNumber= number;
//     return number;
// }

//fisher-yates
function randomQuestion(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function startQuiz(){
    questionIndex= 0;
    score =0;
    nextBtn.innerHTML= "next";
    shosQuestion();

}

function resetState(){
    nextBtn.style.display="none";
    while(answersBtns.firstChild){
        answersBtns.removeChild(answersBtns.firstChild);
    }

}


function shosQuestion(){
    resetState();
    let currentQuestion = questionsRandom[questionIndex];
    let questionNo = questionIndex +1;

    questionElement.innerHTML= questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersBtns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    })
}



function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answersBtns.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextBtn.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML= "tu puntuaje "+ score+ " de "+ questions.length + " !"; 
    nextBtn.innerHTML="juega de nuevo";
    nextBtn.style.display="block";
    if(score != questions.length){
        answersBtns.innerHTML= "<div class='looser'></div> "
    }else{
        answersBtns.innerHTML= "<div class='winer'></div> "
    }
}

function handleNextButton(){
    questionIndex++;
    if(questionIndex < questions.length){
        shosQuestion();
    }else{
        showScore();
    }
};



nextBtn.addEventListener("click", ()=>{
    if(questionIndex< questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();