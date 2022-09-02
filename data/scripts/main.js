let quizzes;
let promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promise.then(
    function(res){
        quizzes = res;
        res.data.forEach( (quizz) =>{
            document.querySelector(".baseListaQuizz").innerHTML += `
                <div class="quizzThumbnail" data-id="${quizz.id}" onclick="openQuizz(this)">
                    <p class="quizzTitulo">${quizz.title}</p>
                    <img src="${quizz.image}" alt="quizz">
                </div>`
        })
    }
)


// informações básicas do quizz (julia) 

let textoTitulo = '';
let textoURL = '';
let textoQdPerguntas;
let textoNiveis;
let tituloVerificado = false;
let urlVerificado = false;
let qdPerguntasVerificado = false;
let niveisVerificado = false;

const perguntas = []; 
const niveis = [];


function iniciarCriarQuizz(){
    alternarTelas(8)
    primeiraParteCriacaoQuizz();
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
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}