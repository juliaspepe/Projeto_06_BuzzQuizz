let objetoRespostas = {};
// Tela 8
function primeiraParteCriacaoQuizz(param) {
    document.querySelector(".tela8").innerHTML =
        
    `<h1>Comece pelo começo</h1>
    <div class="inputsPassoUm">
    <input type="text" placeholder="Título do seu quizz" class="titulo" />
    <input type="url" placeholder="URL da imagem do seu quizz" class="URL" />
    <input type="text" placeholder="Quantidade de perguntas do quizz" class="qdPerguntas" />
    <input type="text" placeholder="Quantidade de níveis do quizz" class="niveis" />
    </div>
    <button onclick="criarPerguntas()">Prosseguir pra criar perguntas</button>`

    if(param.mode === "creation"){
        bonusStatus.mode = "creation";

    }else if(param.mode === "edition"){
        bonusStatus.mode = "edition"
        bonusStatus['id'] = param.id;
        bonusStatus['key'] = param.key;
        alternarTelas(9);
        importarQuizzEditor(bonusStatus.id);
    }
}

function verificarTitulo() {
    textoTitulo = document.querySelector('.inputsPassoUm .titulo').value;
    if (textoTitulo.length > 20 && textoTitulo.length < 65) {
        tituloVerificado = true;
    } else {
        deuErro();
    }
}

function adicionarURL(){
    textoURL = document.querySelector('.inputsPassoUm .URL').value;
    urlVerificado = true;
}
function verificarURL(url) {
    textoURL = url
    try{
        if(new URL(textoURL)) { return true }
    } catch {
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
    verificarQdPerguntas();
    verificarNiveis();
    if(verificarURL(document.querySelector('.inputsPassoUm .URL').value)){
        adicionarURL();
    }

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
function systemExpandirEscolha(e){
    document.querySelectorAll(".perguntasManager li").forEach(every => {
        every.classList.remove("expanded")
    })
    e.classList.add("expanded");
}
function systemInvalidInputEscolha(e){
    document.querySelectorAll(".perguntasManager li input, .ul-niveis li input").forEach(every => {
        every.style.border = "1px solid #D1D1D1";
    })
    e.style.border = "2px solid crimson";
}
function recolherDadosPerguntas(){
    let canNextPage = true;
    document.querySelectorAll(".perguntasManager li").forEach( every =>{
        let infos = {
            title: "", color: "", answers: [
            ]
        }
        let insertInfo = function(nameInput, input, isCorrect){
            let urlInput = every.querySelector(`input[name="${nameInput}"]`).value
            infos.answers.push({
                text: input.value,
                image: urlInput,
                isCorrectAnswer: isCorrect
            })
        }
        every.querySelectorAll("input").forEach( inputs =>{
            if(canNextPage){
                if(inputs.value === "" && inputs.dataset.noneed !== "true"){ 
                    canNextPage = false;
                    alert("Os campos devem estar todos preenchidos corretamente.");
                    systemExpandirEscolha(every);
                    inputs.scrollIntoView({block: "center", behavior: 'smooth'});
                    systemInvalidInputEscolha(inputs);
                }
                else if(inputs.dataset.noneed !== "true" && inputs.type === "url" && !verificarURL(inputs.value)){
                    canNextPage = false;
                    alert("O link de uma resposta está inválido.");
                    systemExpandirEscolha(every);
                    inputs.scrollIntoView({block: "center", behavior: 'smooth'});
                    inputs.value = "";
                    systemInvalidInputEscolha(inputs);
                }

                if(inputs.name == "texto-pergunta"){
                    if(inputs.value.length >= 20){
                        infos.title = inputs.value;
                    }else if (canNextPage){
                        canNextPage = false;
                        alert("Texto da pergunta deve possuir no mínimo 20 caracteres.");
                        systemExpandirEscolha(every);
                        inputs.scrollIntoView({block: "center", behavior: 'smooth'});
                        systemInvalidInputEscolha(inputs);
                    }
                } else if (inputs.name == "cor-pergunta"){
                    infos.color = inputs.value;
                } else if (inputs.name == "respostaCorreta-pergunta" && inputs.value != ""){
                    insertInfo("url1-pergunta", inputs, true);
                } else if (inputs.name == "respostaIncorreta1-pergunta" && inputs.value != ""){
                    insertInfo("url2-pergunta", inputs, false);
                } else if (inputs.name == "respostaIncorreta2-pergunta" && inputs.value != ""){
                    insertInfo("url3-pergunta", inputs, false); 
                } else if (inputs.name == "respostaIncorreta3-pergunta" && inputs.value != ""){
                    insertInfo("url4-pergunta", inputs, false);
                }
            }
        } )
        perguntas.push(infos);
    })
    if(canNextPage){ criarEscolhas() }
    else{ perguntas = [] }
}
function criarEscolhas() {
    if(bonusStatus.mode === "creation"){
        alternarTelas(10);
        criarNiveis(textoNiveis);
    }else if(bonusStatus.mode === "edition"){
        alternarTelas(10);
    }
}
function criacaoPerguntasDoQuizz(qtdePerguntas) {
    let perguntasManager = document.querySelector(".perguntasManager");
    perguntasManager.innerHTML = "";

    for (let index = 0; index < qtdePerguntas; index++) {
        let atalhoLi = `
        <li class>
            <div class="numero-pergunta"> <span>Pergunta ${index+1}</span><img onClick="expandirEscolha(this)" src="../../Vector.png"/> </div>
            <div class="pergunta-input">
                <input name="texto-pergunta" type="text" placeholder="Texto da pergunta" />
                <input name="cor-pergunta" type="color" placeholder="Cor de fundo da pergunta" />
            </div>
            <p>Resposta Correta</p>
                <input name="respostaCorreta-pergunta" type="text" placeholder="Resposta Correta">
                <input name="url1-pergunta" type="url" placeholder="URL da imagem 1"/>
            <p>Resposta Incorreta</p>
            <input name="respostaIncorreta1-pergunta" type="text" placeholder="Resposta incorreta 1">
            <input name="url2-pergunta" type="url" placeholder="URL da imagem 2"/>
            <input data-noNeed="true" name="respostaIncorreta2-pergunta" type="text" placeholder="Resposta incorreta 2">
            <input data-noNeed="true" name="url3-pergunta" type="url" placeholder="URL da imagem 3"/>
            <input data-noNeed="true" name="respostaIncorreta3-pergunta" type="text" placeholder="Resposta incorreta 3">
            <input data-noNeed="true" name="url4-pergunta" type="url" placeholder="URL da imagem 4"/>
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
        <li class="li-nivel">
            <div class="li-nivel-label"><span>Nível ${i}</span><img class="" src="Vector.png"  alt="" onclick="abreOpcaoNivel(this)" id="${i}">
            </div>
            <div class="li-nivel-input">
                <input class="input-nivel titulo-nivel disable" type="text" placeholder="Título do nível" name="titulo-nivel" id="titulo-nivel">
                <input class="input-nivel disable" type="number" placeholder="% de acerto mínima" name="porcentagem-nivel" id="porcentagem-nivel">
                <input class="input-nivel disable" type="url" placeholder="URL da imagem do nível" name="url-nivel">
                <input class="input-nivel disable" type="text" placeholder="Descrição do nível" name="descricao-nivel" id="descricao-nivel">
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

function systemExpandirNivel(e){
    document.querySelectorAll(".ul-niveis li").forEach(every => {
        every.id = "";
    })
    e.id = "selecionada";
}
function systemInvalidInputNivel(e){
    document.querySelectorAll(".ul-niveis li input, .ul-niveis li input").forEach(every => {
        every.style.border = "1px solid #D1D1D1";
    })
    e.style.border = "2px solid crimson";
}
function guardarNiveis(){
    let canNextPage = true;
    document.querySelectorAll(".ul-niveis li").forEach( every =>{
        let infos = { title: "", image: "", text: "", minValue: 0 }

        every.querySelectorAll("input").forEach( inputs =>{
            if(canNextPage){
                if(inputs.value === ""){ 
                    canNextPage = false;
                    alert("Os campos devem estar todos preenchidos corretamente.");
                    systemExpandirNivel(every);
                    inputs.scrollIntoView({block: "center", behavior: 'smooth'});
                    systemInvalidInputNivel(inputs);
                }

                if(inputs.name == "titulo-nivel"){
                    if(inputs.value.length >= 10){
                        infos.title = inputs.value;
                    }else if (canNextPage){
                        canNextPage = false;
                        alert("Texto do nível deve possuir no mínimo 10 caracteres.");
                        systemExpandirNivel(every);
                        inputs.scrollIntoView({block: "center", behavior: 'smooth'});
                        systemInvalidInputNivel(inputs);
                    }
                } else if (inputs.name == "porcentagem-nivel"){
                    if(inputs.value >= 0 && inputs.value <= 100 ){
                        infos.minValue = Number(inputs.value);
                    }else if (canNextPage){
                        canNextPage = false;
                        alert("Só permitido valores entre 0 a 100.");
                        systemExpandirNivel(every);
                        inputs.scrollIntoView({block: "center", behavior: 'smooth'});
                        systemInvalidInputNivel(inputs);
                    }
                } else if (inputs.name == "url-nivel"){
                    if(inputs.type === "url" && verificarURL(inputs.value)){
                        infos.image = inputs.value;
                    }else if (canNextPage){
                        canNextPage = false;
                        alert("URL da imagem está invalido.");
                        systemExpandirNivel(every);
                        inputs.scrollIntoView({block: "center", behavior: 'smooth'});
                        inputs.value = "";
                        systemInvalidInputNivel(inputs);
                    }
                } else if (inputs.name == "descricao-nivel"){
                    if(inputs.value.length >= 30){
                        infos.text = inputs.value;
                    }else if (canNextPage){
                        canNextPage = false;
                        alert("Descrição do nível deve possuir no mínimo 30 caracteres.");
                        systemExpandirNivel(every);
                        inputs.scrollIntoView({block: "center", behavior: 'smooth'});
                        systemInvalidInputNivel(inputs);
                    }
                } 
            }
        } )
        niveis.push(infos);
    })
    if(canNextPage){ sucessoQuizz() }
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
    if(bonusStatus.mode == "creation"){
        salvarQuizz();
        alternarTelas(11);
    
        document.querySelector(".tela11").innerHTML =
    
        `<h1>Seu quizz está pronto!</h1>
        <div class="tumbQuizzCriado">
            <img class="imgQuizz" src="${textoURL}"/>
            <p class="tituloDoQuizz">${textoTitulo}</p>
        </div>
        <button class="botaoAcessar">Acessar Quizz</button>
        <button class="botaoHome" onclick="home()">Voltar para home</button>`
    }
    else if(bonusStatus.mode == "edition"){
        editarQuizz(bonusStatus.id, bonusStatus.key);
        alternarTelas(1);
    }
}


function home() {
    alternarTelas(1);
}

function salvarQuizz() {
    let quizzPronto = {
        title: objetoRespostas.title,
        image: objetoRespostas.image,
        questions: perguntas,
        levels: niveis
    }

    console.log(quizzPronto);
    
    let enviarQuizz = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzPronto);
    enviarQuizz.then( retorno =>{
        addQuizzDataStorage(retorno.data.id, retorno.data.key);
        document.querySelector('.tela11 .botaoAcessar').addEventListener('click', ()=>{ openQuizz("", retorno.data.id) });
    })
    .catch( erro =>{
        console.error(erro);
    })
}

