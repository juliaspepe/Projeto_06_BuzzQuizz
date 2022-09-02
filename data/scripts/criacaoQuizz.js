let objetoRespostas = {};
// Tela 8
function primeiraParteCriacaoQuizz() {
    document.querySelector(".tela8").innerHTML =

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
    if (textoTitulo.length > 20 && textoTitulo.length < 65) {
        tituloVerificado = true;
    } else {
        deuErro();
    }
}

function verificarURL() {
    textoURL = document.querySelector('.URL').value;
    if (new URL(textoURL)) {
        urlVerificado = true;
    } else {
        deuErro();
    }
}

function verificarQdPerguntas() {
    textoQdPerguntas = Number(document.querySelector('.qdPerguntas').value);
    if (textoQdPerguntas >= 3) {
        qdPerguntasVerificado = true;
    } else {
        deuErro();
    }
}

function verificarNiveis() {
    textoNiveis = Number(document.querySelector('.niveis').value);
    if (textoNiveis >= 2) {
        niveisVerificado = true;
    } else {
        deuErro();
    }
}

function deuErro() {
    alert('Favor preencher os dados corretamente');
}

function criarPerguntas() {
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
    console.log(objetoRespostas);

    if (tituloVerificado === true && urlVerificado === true && qdPerguntasVerificado === true && niveisVerificado === true) {
        alternarTelas(9);
        criacaoPerguntasDoQuizz(textoQdPerguntas);
    }
}

// Tela 9 
function expandirEscolha(e) {
    document.querySelectorAll(".perguntasManager li").forEach(every => {
        every.classList.remove("expanded")
    })
    e.parentNode.parentNode.classList.add("expanded");
};

function recolherDadosPerguntas(){
let canNextPage = true;
document.querySelectorAll(".perguntasManager li").forEach( every =>{
    let infos = {
        title: "", color: "", answer: [

        ]
    }
    let insertInfo = function(index, input, isCorrect){
        infos.answer[index] = {}
        infos.answer[index].text = input.value;
        infos.answer[index].isCorrectAnswer = isCorrect;
    }
    every.querySelectorAll("input").forEach( inputs =>{
        if(inputs.value === "" && canNextPage){ 
            alert("Os campos devem estar todos preenchidos.");
            canNextPage = false;
        }
        if(inputs.placeholder == "Texto da pergunta"){
            if(inputs.value.length >= 20){
                infos.title = inputs.value;
            }else if (canNextPage){
                alert("Texto da pergunta deve possuir no mínimo 20 caracteres.");
                canNextPage = false;
            }
        } else if (inputs.placeholder == "Cor de fundo da pergunta"){
            infos.color = inputs.value;
        } else if (inputs.placeholder == "Resposta Correta"){
            insertInfo(0, inputs, true);
        } else if (inputs.placeholder == "URL da imagem 1"){
            infos.answer[0].image = inputs.value;
        } else if (inputs.placeholder == "Resposta incorreta 1"){
            insertInfo(1, inputs, false);
        } else if (inputs.placeholder == "URL da imagem 2"){
            infos.answer[1].image = inputs.value;
        } else if (inputs.placeholder == "Resposta incorreta 2"){
            insertInfo(2, inputs, false);
        } else if (inputs.placeholder == "URL da imagem 3"){
            infos.answer[2].image = inputs.value;
        } else if (inputs.placeholder == "Resposta incorreta 3"){
            insertInfo(3, inputs, false);
        } else if (inputs.placeholder == "URL da imagem 4"){
            infos.answer[3].image = inputs.value;
        }
    } )
    perguntas.push(infos);
})
if(canNextPage){ criarEscolhas() }
}

function criacaoPerguntasDoQuizz(qtdePerguntas) {
    let perguntasManager = document.querySelector(".perguntasManager");
    perguntasManager.innerHTML = "";

    for (let index = 0; index < qtdePerguntas; index++) {
        let atalhoLi = `
        <li class>
            <div> <span>Pergunta ${index + 1}</span><img onClick="expandirEscolha(this)" src="Vector.png"> </div>
            <input type="text" placeholder="Texto da pergunta" />
            <input type="color" placeholder="Cor de fundo da pergunta" />
            <p>Resposta Correta</p>
            <input type="text" placeholder="Resposta Correta">
            <input type=""url placeholder="URL da imagem"/>

            <p>Resposta Incorreta</p>
            <input type="text" placeholder="Resposta incorreta 1">
            <input type=""url placeholder="URL da imagem"/>
            <input type="text" placeholder="Resposta incorreta 2">
            <input type=""url placeholder="URL da imagem"/>
            <input type="text" placeholder="Resposta incorreta 3">
            <input type=""url placeholder="URL da imagem"/>
        </li>`;
        perguntasManager.innerHTML += atalhoLi;
    }

    perguntasManager.innerHTML += `<button onclick="criarEscolhas()">Prosseguir pra níveis</button>`;
}
function criarEscolhas() {
    // verificar se todos os campos ja estão clicados

    alternarTelas(10);
    criarNiveis(textoNiveis);
}

// Tela 10

const ulNiveis = document.querySelector('.ul-niveis');

function criarNiveis(lvl) {
    for (let i = 2; i <= lvl; i++) {
        ulNiveis.innerHTML += `
        <li class="li-nivel">
            <div class="li-nivel-label"><span>Nível ${i}</span><img class="" src="Vector.png"  alt="" onclick="abreOpcaoNivel(this)" id="${i}">
            </div>
            <div class="li-nivel-input">
                <input class="input-nivel titulo-nivel disable" type="text" placeholder="Título do nível" name="titulo-nivel" id="titulo-nivel">
                <input class="input-nivel disable" type="text" placeholder="% de acerto mínima" name="porcentagem-nivel" id="porcentagem-nivel">
                <input class="input-nivel disable" type="text" placeholder="URL da imagem do nível name"URL-imagem">
                <input class="input-nivel disable" type="text" placeholder="Descrição do nível" name"descricao-nivel" id="descricao-nivel">
            </div>
        </li>
    `
    }
}

function abreOpcaoNivel(itemClicado) {
    const liSelecionado = document.getElementById('selecionada');
    if (liSelecionado) {
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

function guardarNiveis() {
    const titulosNivel = document.querySelectorAll('.li-nivel-input')
    let contador = 1;
    Array.from(titulosNivel).forEach((item) => {
        const objetoNivel = {
            title: '',
            minValue: '',
            image: '',
            text: ''
        };
        if (item.children[0].value.length < 10) {
            alert(`Titulo ${contador} precisa ter mais de 10 caracteres`)
        }
        if (Number(item.children[1].value) < 0 || (item.children[1].value) > 100) {
            alert('Preencha porcentagem apenas com números entre 0 - 100 por favor!')
        }

        if (!new URL(item.children[2].value)) {
            alert('Digite uma URL válida por favor!')
        }

        if (item.children[3].value.length < 30) {
            alert('A descrição precisa ter no mínimo 30 caracteres')
        }
        objetoNivel.title = item.children[0].value
        objetoNivel.minValue = item.children[1].value
        objetoNivel.image = item.children[2].value
        objetoNivel.text = item.children[3].value
        niveis.push(objetoNivel)
        contador++

        console.log(niveis);
    })

    const porcentagemOk = niveis.filter(verificaPorcentagemMinima)
    if (porcentagemOk.length == 0) {
        alert('É necessário que algum nível tenha % de acerto mínima igual a 0, por favor, preencha corretamente!')
    }
}

function verificaPorcentagemMinima(objeto) {
    if (objeto.minValue == 0) {
        return true;
    }
}

const buttonFinalizarQuizz = document.querySelector('.button-finalizar-quizz')
buttonFinalizarQuizz.addEventListener('click', sucessoQuizz)



// tela 11
function sucessoQuizz() {
    alternarTelas(11);
    salvarQuizz();

    document.querySelector(".tela11").innerHTML =

    `<h1>Seu quizz está pronto!</h1>
    <img class="imgQuizz" src="${textoURL}"/>
    <p class="tituloDoQuizz">${textoTitulo}</p>
    <button class="botaoAcessar" onclick="acessarQuizz()">Acessar Quizz</button>
    <button class="botaoHome" onclick="home()">Voltar para home</button>`
}

function acessarQuizz() {
    alert('acesso ao quizz ok');
}

function home() {
    alert('acesso a home ok');
}

// enviar quizz para servidor 
function salvarQuizz() {
    let quizzPronto = {
        title: objetoRespostas.title,
        image: objetoRespostas.image,
        questions: perguntas,
        levels: niveis
    }
    
    let enviarQuizz = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzPronto);
    enviarQuizz.then(taCerto);
    enviarQuizz.catch(temErro);
}

function taCerto(certo){
    alert ('ta certo');
}

function temErro(erro){
alert ('ta errado');
}
