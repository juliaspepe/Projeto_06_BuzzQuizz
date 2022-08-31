let promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promise.then(
    function(res){
        res.data.forEach( (quizz) =>{
            document.querySelector(".baseListaQuizz").innerHTML += `
        <div class="quizzThumbnail" data-id="${quizz.id}">
            <p class="quizzTitulo">${quizz.title}</p>
            <img src="${quizz.image}" alt="quizz">
        </div>`
        })
    }
)
function iniciarCriarQuizz(){
    document.querySelector(".tela1").classList.add("disable");
    primeiraParteCriacaoQuizz();
}

function primeiraParteCriacaoQuizz() {
    document.querySelector(".passoUmCriacaoQuizz").innerHTML = 

    `<h1>Comece pelo começo</h1>

    <div class="inputsPassoUm">
    <input type="text" placeholder="Título do seu quizz" class="titulo" />
    <input type="text" placeholder="URL da imagem do seu quizz" class="URL" />
    <input type="text" placeholder="Quantidade de perguntas do quizz" class="qdPerguntas" />
    <input type="text" placeholder="Quantidade de níveis do quizz" class="niveis" />
    </div>
    
    <button onclick="criarPerguntas()">Prosseguir pra criar perguntas</button>`
}
