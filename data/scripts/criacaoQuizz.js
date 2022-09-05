let objetoRespostas = {};
// Tela 8

function loadingCriarQuizz() {
    let tirarLoading = document.querySelector('.carregandoCriacaoQuizz').classList.add('hidden');
    let aparecerHeader = document.querySelector('.tela8-container').classList.remove('hidden');
}

function primeiraParteCriacaoQuizz(param) {
    setInterval(loadingCriarQuizz, 2000);
    document.querySelector(".tela8").innerHTML =

        `<div class="tela8-container hidden">
    <h1>Comece pelo começo</h1>
    <div class="inputsPassoUm">
    <label for="titulo-passoum">O Título deve possuir enre 20 e 65 caracteres.</label>
    <input id="titulo-passoum" type="text" placeholder="Título do seu quizz" class="titulo" />

    <label for="url-passoum">O URL é inválido.</label>
    <input id="url-passoum" type="url" placeholder="URL da imagem do seu quizz" class="URL" />

    <label for="perguntas-passoum">É permitido no minimo 3 perguntas.</label>
    <input id="perguntas-passoum" type="text" placeholder="Quantidade de perguntas do quizz" class="qdPerguntas" />

    <label for="niveis-passoum">É permitido no minimo 2 niveis.</label>
    <input id="niveis-passoum" type="text" placeholder="Quantidade de níveis do quizz" class="niveis" />

    </div>
    <button onclick="criarPerguntas()">Prosseguir pra criar perguntas</button>
    </div>
    <div class="carregandoCriacaoQuizz">
    <div class="loadingio-spinner-spinner-547wu04bgh7">
        <div class="ldio-9z6lrpsoe6">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <p class="textoCarregando">Carregando</p>
</div>
    `

    if (param.mode === "creation") {
        bonusStatus.mode = "creation";

    } else if (param.mode === "edition") {
        bonusStatus.mode = "edition"
        bonusStatus['id'] = param.id;
        bonusStatus['key'] = param.key;
        alternarTelas(9);
        importarQuizzEditor(bonusStatus.id);
    }
}

function verificarTitulo() {
    textoTitulo = document.querySelector('#titulo-passoum');
    if (textoTitulo.value.length > 20 && textoTitulo.value.length < 65) {
        tituloVerificado = true;
        textoTitulo.style.backgroundColor = "transparent";
        textoTitulo.labels[0].classList.remove("show");
    } else {
        textoTitulo.style.backgroundColor = "#FFE9E9";
        textoTitulo.labels[0].classList.add("show");
    }
}

function adicionarURL(url){
    textoURL = url;
    urlVerificado = true;
}
function verificarURL(url) {
    try{
        if(new URL(url)) { return true }
    } catch(err) {

        return false
        console.error(err)
    }
}

function verificarQdPerguntas() {
    textoQdPerguntas = document.querySelector('#perguntas-passoum');
    if (Number(textoQdPerguntas.value) >= 3) {
        qdPerguntasVerificado = true;
        textoQdPerguntas.style.backgroundColor = "transparent";
        textoQdPerguntas.labels[0].classList.remove("show");
    } else {
        textoQdPerguntas.style.backgroundColor = "#FFE9E9";
        textoQdPerguntas.labels[0].classList.add("show");
    }
}

function verificarNiveis() {
    textoNiveis = document.querySelector('#niveis-passoum');
    if (Number(textoNiveis.value) >= 2) {
        niveisVerificado = true;
        textoNiveis.style.backgroundColor = "transparent";
        textoNiveis.labels[0].classList.remove("show");
    } else {
        textoNiveis.style.backgroundColor = "#FFE9E9";
        textoNiveis.labels[0].classList.add("show");
    }
}


function criarPerguntas() {
    let link = document.querySelector('#url-passoum');

    verificarTitulo();
    verificarQdPerguntas();
    verificarNiveis();

    if(verificarURL(link.value)){
        adicionarURL(link.value);
        link.style.backgroundColor = "transparent";
        link.labels[0].classList.remove("show");
    } else {
        link.style.backgroundColor = "#FFE9E9";
        link.labels[0].classList.add("show");
        return
    }

    objetoRespostas = {
        title: textoTitulo.value,
        image: link.value,
        qtd: Number(textoQdPerguntas.value),
        level: Number(textoNiveis.value)
    }

    if (tituloVerificado === true && urlVerificado === true && qdPerguntasVerificado === true && niveisVerificado === true) {
        alternarTelas(9);
        criacaoPerguntasDoQuizz(Number(textoQdPerguntas.value));
    }

}















// Tela 9 
function expandirEscolha(e) {
    document.querySelectorAll(".perguntasManager li").forEach(every => {
        every.classList.remove("expanded")
    })
    e.parentNode.parentNode.classList.add("expanded");
};
function systemExpandirEscolha(e) {
    document.querySelectorAll(".perguntasManager li").forEach(every => {
        every.classList.remove("expanded")
    })
    e.classList.add("expanded");
}
function systemInvalidInputEscolha(e) {
    document.querySelectorAll(".perguntasManager li input, .ul-niveis li.expanded input").forEach(every => {
        every.labels[0].classList.remove('show');
        every.style.border = "1px solid #D1D1D1";
        every.style.backgroundColor = "transparent";
    })
    e.labels[0].classList.add('show');
    e.style.backgroundColor = "#FFE9E9";
    e.style.border = "2px solid crimson";
}
function recolherDadosPerguntas() {
    let canNextPage = true;
    document.querySelectorAll(".perguntasManager li").forEach(every => {
        let infos = {
            title: "", color: "", answers: [
            ]
        }
        let insertInfo = function (nameInput, input, isCorrect) {
            let urlInput = every.querySelector(`input[id="${nameInput}"]`).value
            infos.answers.push({
                text: input.value,
                image: urlInput,
                isCorrectAnswer: isCorrect
            })
        }
        every.querySelectorAll("input").forEach(inputs => {
            if (canNextPage) {
                if (inputs.value === "" && inputs.dataset.noneed !== "true") {
                    canNextPage = false;
                    systemExpandirEscolha(every);
                    inputs.scrollIntoView({ block: "center", behavior: 'smooth' });
                    systemInvalidInputEscolha(inputs);
                    inputs.labels[0].classList.add('show');
                    inputs.style.backgroundColor = "#FFE9E9";
                }
                else if (inputs.dataset.noneed !== "true" && inputs.type === "url" && !verificarURL(inputs.value)) {
                    canNextPage = false;
                    systemExpandirEscolha(every);
                    inputs.scrollIntoView({ block: "center", behavior: 'smooth' });
                    inputs.value = "";
                    systemInvalidInputEscolha(inputs);
                    inputs.labels[0].classList.add('show');
                    inputs.style.backgroundColor = "#FFE9E9";
                }

                if (inputs.name == "texto-pergunta") {
                    if (inputs.value.length >= 20) {
                        infos.title = inputs.value;
                        inputs.style.backgroundColor = "transparent";
                        inputs.labels[0].classList.remove('show');
                    } else if (canNextPage) {
                        canNextPage = false;
                        systemExpandirEscolha(every);
                        inputs.scrollIntoView({ block: "center", behavior: 'smooth' });
                        systemInvalidInputEscolha(inputs);
                        inputs.labels[0].classList.add('show');
                        inputs.style.backgroundColor = "#FFE9E9";
                    }
                } else if (inputs.name == "cor-pergunta") {
                    infos.color = inputs.value;
                    inputs.style.backgroundColor = "transparent";
                    inputs.labels[0].classList.remove('show');
                } else if (inputs.name == "respostaCorreta-pergunta" && inputs.value != "") {
                    insertInfo(`url1-pergunta${every.dataset.id}`, inputs, true);
                    inputs.style.backgroundColor = "transparent";
                    inputs.labels[0].classList.remove('show');
                } else if (inputs.name == "respostaIncorreta1-pergunta" && inputs.value != "") {
                    insertInfo(`url2-pergunta${every.dataset.id}`, inputs, false);
                    inputs.style.backgroundColor = "transparent";
                    inputs.labels[0].classList.remove('show');
                } else if (inputs.name == "respostaIncorreta2-pergunta" && inputs.value != "") {
                    insertInfo(`url3-pergunta${every.dataset.id}`, inputs, false);
                    inputs.style.backgroundColor = "transparent";
                    inputs.labels[0].classList.remove('show');
                } else if (inputs.name == "respostaIncorreta3-pergunta" && inputs.value != "") {
                    insertInfo(`url4-pergunta${every.dataset.id}`, inputs, false);
                    inputs.style.backgroundColor = "transparent";
                    inputs.labels[0].classList.remove('show');
                }
            }
        })
        perguntas.push(infos);
    })
    if (canNextPage) { criarEscolhas() }
    else { perguntas = [] }
}
function criarEscolhas() {
    if (bonusStatus.mode === "creation") {
        alternarTelas(10);
        criarNiveis(Number(textoNiveis.value));
    } else if (bonusStatus.mode === "edition") {
        alternarTelas(10);
    }
}
function criacaoPerguntasDoQuizz(qtdePerguntas) {
    let perguntasManager = document.querySelector(".perguntasManager");
    perguntasManager.innerHTML = "";

    for (let index = 0; index < qtdePerguntas; index++) {
        let atalhoLi = `
        <li data-identifier="question-form" class data-id="${index + 1}">
            <div class="numero-pergunta"> <span>Pergunta ${index + 1}</span><img data-identifier="expand" onClick="expandirEscolha(this)" src="Vector.png"/> </div>
            <div class="pergunta-input">
                <label for="texto-pergunta${index + 1}">Texto deve possuir no mínimo 20 caracteres</label>
                <input id="texto-pergunta${index + 1}" name="texto-pergunta" type="text" placeholder="Texto da pergunta" />

                <label for="cor-pergunta${index + 1}">Cor invalida? erro-fatal - selecione outra cor</label>
                <input id="cor-pergunta${index + 1}" name="cor-pergunta" type="color" placeholder="Cor de fundo da pergunta" />
            </div>
            <p>Resposta Correta</p>
                <label for="respostaCorreta-pergunta${index + 1}">Campo não foi preenchido.</label>
                <input id="respostaCorreta-pergunta${index + 1}" name="respostaCorreta-pergunta" type="text" placeholder="Resposta Correta">

                <label for="url1-pergunta${index + 1}">URL inválida.</label>
                <input id="url1-pergunta${index + 1}" name="url1-pergunta" type="url" placeholder="URL da imagem 1"/>
            <p>Resposta Incorreta</p>
            <label for="respostaIncorreta1-pergunta${index + 1}">Campo não foi preenchido.</label>
            <input id="respostaIncorreta1-pergunta${index + 1}" name="respostaIncorreta1-pergunta" type="text" placeholder="Resposta incorreta 1">

            <label for="url2-pergunta${index + 1}">URL inválida.</label>
            <input id="url2-pergunta${index + 1}" name="url2-pergunta" type="url" placeholder="URL da imagem 2"/>

            <label for="respostaIncorreta2-pergunta${index + 1}">Campo não foi preenchido.</label>
            <input data-noNeed="true" id="respostaIncorreta2-pergunta${index + 1}" name="respostaIncorreta2-pergunta" type="text" placeholder="Resposta incorreta 2">

            <label for="url3-pergunta${index + 1}">URL inválida.</label>
            <input data-noNeed="true" id="url3-pergunta${index + 1}" name="url3-pergunta" type="url" placeholder="URL da imagem 3"/>

            <label for="respostaIncorreta3-pergunta${index + 1}">Campo não foi preenchido.</label>
            <input data-noNeed="true" id="respostaIncorreta3-pergunta${index + 1}" name="respostaIncorreta3-pergunta" type="text" placeholder="Resposta incorreta 3">

            <label for="url4-pergunta${index + 1}">URL inválida.</label>
            <input data-noNeed="true" id="url4-pergunta${index + 1}" name="url4-pergunta" type="url" placeholder="URL da imagem 4"/>
        </li>`;
        perguntasManager.innerHTML += atalhoLi;
    }

    perguntasManager.innerHTML += `<button onclick="recolherDadosPerguntas()">Prosseguir pra níveis</button>`;
}















// Tela 10

const ulNiveis = document.querySelector('.ul-niveis');

function criarNiveis(lvl) {
    ulNiveis.innerHTML = "";
    for (let i = 1; i <= lvl; i++) {
        ulNiveis.innerHTML += `
        <li data-identifier="level" class="li-nivel">
            <div class="li-nivel-label"><span>Nível ${i}</span><img data-identifier="expand" class="" src="Vector.png"  alt="" onclick="abreOpcaoNivel(this)" id="${i}">
            </div>
            <div class="li-nivel-input">
                <label for="titulo-nivel${i}">Texto do nível deve possuir no mínimo 10 caracteres.</label>
                <input class="input-nivel titulo-nivel disable" type="text" placeholder="Título do nível" name="titulo-nivel" id="titulo-nivel${i}">
    
                <label for="porcentagem-nivel${i}">Só permitido valores entre 0 a 100.</label>
                <input class="input-nivel disable" type="number" placeholder="% de acerto mínima" name="porcentagem-nivel" id="porcentagem-nivel${i}">

                <label for="url-nivel${i}">URL da imagem está invalido.</label>
                <input class="input-nivel disable" type="url" placeholder="URL da imagem do nível" name="url-nivel" id="url-nivel${i}">

                <label for="descricao-nivel${i}">Descrição do nível deve possuir no mínimo 30 caracteres.</label>
                <input class="input-nivel disable" type="text" placeholder="Descrição do nível" name="descricao-nivel" id="descricao-nivel${i}">
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

function systemExpandirNivel(e) {
    document.querySelectorAll(".ul-niveis li").forEach(every => {
        every.id = "";
    })
    e.id = "selecionada";
}
function systemInvalidInputNivel(e) {
    document.querySelectorAll(".ul-niveis li input, .ul-niveis li#selecionada input").forEach(every => {
        every.labels[0].classList.remove('show');
        every.style.border = "1px solid #D1D1D1";
        every.style.backgroundColor = "transparent";
    })
    e.labels[0].classList.add('show');
    e.style.backgroundColor = "#FFE9E9";
    e.style.border = "2px solid crimson";
}
function guardarNiveis() {
    let canNextPage = true;
    document.querySelectorAll(".ul-niveis li").forEach(every => {
        let infos = { title: "", image: "", text: "", minValue: 0 }

        every.querySelectorAll("input").forEach(inputs => {
            if (canNextPage) {
                if (inputs.value === "") {
                    canNextPage = false;
                    systemExpandirNivel(every);
                    inputs.scrollIntoView({ block: "center", behavior: 'smooth' });
                    systemInvalidInputNivel(inputs);
                }

                if (inputs.name == "titulo-nivel") {
                    if (inputs.value.length >= 10) {
                        infos.title = inputs.value;
                        inputs.style.backgroundColor = "transparent";
                        inputs.labels[0].classList.remove('show');
                    } else if (canNextPage) {
                        canNextPage = false;
                        systemExpandirNivel(every);
                        inputs.scrollIntoView({ block: "center", behavior: 'smooth' });
                        systemInvalidInputNivel(inputs);
                        inputs.labels[0].classList.add('show');
                        inputs.style.backgroundColor = "#FFE9E9";
                    }
                } else if (inputs.name == "porcentagem-nivel") {
                    if (inputs.value >= 0 && inputs.value <= 100) {
                        infos.minValue = Number(inputs.value);
                        inputs.style.backgroundColor = "transparent";
                        inputs.labels[0].classList.remove('show');
                    } else if (canNextPage) {
                        canNextPage = false;
                        systemExpandirNivel(every);
                        inputs.scrollIntoView({ block: "center", behavior: 'smooth' });
                        systemInvalidInputNivel(inputs);
                        inputs.labels[0].classList.add('show');
                        inputs.style.backgroundColor = "#FFE9E9";
                    }
                } else if (inputs.name == "url-nivel") {
                    if (inputs.type === "url" && verificarURL(inputs.value)) {
                        infos.image = inputs.value;
                        inputs.style.backgroundColor = "transparent";
                        inputs.labels[0].classList.remove('show');
                    } else if (canNextPage) {
                        canNextPage = false;
                        systemExpandirNivel(every);
                        inputs.scrollIntoView({ block: "center", behavior: 'smooth' });
                        inputs.value = "";
                        systemInvalidInputNivel(inputs);
                        inputs.labels[0].classList.add('show');
                        inputs.style.backgroundColor = "#FFE9E9";
                    }
                } else if (inputs.name == "descricao-nivel") {
                    if (inputs.value.length >= 30) {
                        infos.text = inputs.value;
                        inputs.style.backgroundColor = "transparent";
                        inputs.labels[0].classList.remove('show');
                    } else if (canNextPage) {
                        canNextPage = false;
                        systemExpandirNivel(every);
                        inputs.scrollIntoView({ block: "center", behavior: 'smooth' });
                        systemInvalidInputNivel(inputs);
                        inputs.labels[0].classList.add('show');
                        inputs.style.backgroundColor = "#FFE9E9";
                    }
                }
            }
        })
        niveis.push(infos);
    })
    if (canNextPage) { sucessoQuizz() }
    else { niveis = [] }
}

function verificaPorcentagemMinima(objeto) {
    if (objeto.minValue == 0) {
        return true;
    }
}

const buttonFinalizarQuizz = document.querySelector('.button-finalizar-quizz')
buttonFinalizarQuizz.addEventListener('click', guardarNiveis)

// tela 11
function sucessoQuizz() {
    if (bonusStatus.mode == "creation") {
        salvarQuizz();
        alternarTelas(11);

        document.querySelector(".tela11").innerHTML =

            `<h1>Seu quizz está pronto!</h1>
        <div class="tumbQuizzCriado">
            <img class="imgQuizz" src="${textoURL}"/>
            <p class="tituloDoQuizz">${textoTitulo.value}</p>
        </div>
        <button class="botaoAcessar">Acessar Quizz</button>
        <button class="botaoHome" onclick="home()">Voltar para home</button>`
    }
    else if (bonusStatus.mode == "edition") {
        editarQuizz(bonusStatus.id, bonusStatus.key);
        alternarTelas(1);
    }
}


function home() {
    alternarTelas(1);
    updateQuizzList();
    updateMyQuizzList();
}

function salvarQuizz() {
    let quizzPronto = {
        title: objetoRespostas.title,
        image: objetoRespostas.image,
        questions: perguntas,
        levels: niveis
    }

    let enviarQuizz = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzPronto);
    enviarQuizz.then(retorno => {
        addQuizzDataStorage(retorno.data.id, retorno.data.key);
        document.querySelector('.tela11 .botaoAcessar').addEventListener('click', () => { openQuizz("", retorno.data.id) });
    })
        .catch(erro => {
            console.error(erro);
        })
}

