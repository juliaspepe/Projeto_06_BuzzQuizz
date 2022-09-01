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

// informações básicas do quizz (julia) 

let textoTitulo = '';
let textoURL = '';
let textoQdPerguntas;
let textoNiveis;
let tituloVerificado = false;
let urlVerificado = false;
let qdPerguntasVerificado = false;
let niveisVerificado = false;
let objetoRespostas = {};

function primeiraParteCriacaoQuizz() {
    document.querySelector(".passoUmCriacaoQuizz").innerHTML = 

    `<h1>Comece pelo começo</h1>
    <div class="inputsPassoUm">
    <input type="text" placeholder="Título do seu quizz" class="titulo" />
    <input type="url" placeholder="URL da imagem do seu quizz" class="URL" />
    <input type="text" placeholder="Quantidade de perguntas do quizz" class="qdPerguntas" />
    <input type="text" placeholder="Quantidade de níveis do quizz" class="niveis" />
    </div>
    <button onclick="criarPerguntas()">Prosseguir pra criar perguntas</button>`
}

function verificarTitulo() {
    textoTitulo = document.querySelector('.titulo').value;
    if (textoTitulo.length > 20 && textoTitulo.length < 65){
        tituloVerificado = true;
    } else {
        alert ('Título no tamanho incorreto. Favor inserir um título que tenha no mínimo 20 caracteres e no máximo 65.');
    }
}

function verificarURL(){
    textoURL = document.querySelector('.URL').value;
    if (textoURL !== ''){ // comparação faltando
        urlVerificado = true;
    } else {
        alert ('Imagem no formato incorreto');
    }
}

function verificarQdPerguntas(){
    textoQdPerguntas = document.querySelector('.qdPerguntas').value;
    if (textoQdPerguntas >= 3){
        qdPerguntasVerificado = true;
    } else {
        alert ('Número mínimo de perguntas: 3. Favor colocar um novo número');
    }
}

function verificarNiveis(){
    textoNiveis = document.querySelector('.niveis').value;
    if (textoNiveis >= 2){
        niveisVerificado = true;
    } else {
        alert ('Número mínimo de níveis: 2. Favor colocar um novo número');
    }
}

function criarPerguntas(){
    verificarTitulo();
    verificarURL();
    verificarQdPerguntas();
    verificarNiveis();

    objetoRespostas = {
        title: textoTitulo,
        image: textoURL,
        qtd: textoQdPerguntas,
        level: textoNiveis
    }

    if (tituloVerificado === true && urlVerificado === true && qdPerguntasVerificado === true &&  niveisVerificado === true){
     alert('deu certo'); // chamar a função do desktop 9
    }
}

// sucesso do quizz (julia)

function sucessoQuizz(){
    document.querySelector(".sucessoDoQuizz").innerHTML = 

    `<h1>Seu quizz está pronto!</h1>
    <img class="imgQuizz" src="${textoURL}"/>
    <p class="tituloDoQuizz">${textoTitulo}</p>
    <button class="botaoAcessar" onclick="acessarQuizz()">Acessar Quizz</button>
    <button class="botaoHome" onclick="home()">Voltar para home</button>`
}

function acessarQuizz(){
    alert ('acesso ao quizz ok');
}

function home(){
    alert('acesso a home ok');
}

// Tela 10

const ulNiveis = document.querySelector('.ul-niveis');


function criarNiveis(lvl){
    for(let i = 2; i <= lvl; i++){
    ulNiveis.innerHTML += `
        <li class="li-nivel">
            <div class="li-nivel-label"><span>Nível ${i}</span><img class="" src="Vector.png"  alt="" onclick="abreOpcaoNivel(this)" id="${i}">
            </div>
            <div class="li-nivel-input">
                <input class="input-nivel disable" type="text" placeholder="Título do nível" name="titulo-nivel">
                <input class="input-nivel disable" type="text" placeholder="% de acerto mínima" name="porcentagem-nivel">
                <input class="input-nivel disable" type="text" placeholder="URL da imagem do nível" name="URL-imagem">
                <input class="input-nivel disable" type="text" placeholder="Descrição do nível" name="descricao-nivel">
            </div>
        </li>
    `
}
}

function abreOpcaoNivel(itemClicado){
    const liSelecionado = document.getElementById('selecionada');
    if(liSelecionado){
        liSelecionado.id = '';
        Array.from(liSelecionado.children[1].children).forEach((input) => {
        input.classList.add('disable')
    })
    }
    itemClicado.parentNode.parentNode.id = 'selecionada';
    const inputs = Array.from(itemClicado.parentNode.parentNode.children[1].children);
    inputs.forEach((input) => {
        input.classList.remove('disable')
    })

}

criarNiveis(3)