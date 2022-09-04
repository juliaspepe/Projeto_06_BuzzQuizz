let quizzes;
let textoTitulo = '';
let textoURL = '';
let textoQdPerguntas;
let textoNiveis;
let tituloVerificado = false;
let urlVerificado = false;
let qdPerguntasVerificado = false;
let niveisVerificado = false;
let questionsShuffled = [];

let perguntas = []; 
let niveis = [];

let bonusStatus = {
    mode: "creation", // creation / edition
    id: 0,
    key: "",
    title: "",
    image: ""
} 

updateQuizzList();
updateMyQuizzList();

function iniciarCriarQuizz(mode){
    alternarTelas(8)
    primeiraParteCriacaoQuizz(mode);
}
function alternarTelas(tela){
    document.querySelectorAll(".container > div").forEach( tela =>{
        tela.classList.add("hidden");
    } )

    document.querySelector(`.container > .tela${tela}`).classList.remove("hidden");
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    questionsShuffled = array;
    return questionsShuffled;
}

function fixDoubleQuizzClicked(e, element){
    return (e.target.className === element.className )? true: false;
}