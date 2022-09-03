let quizzGame = {
    qtdePerguntas: 0,
    perguntasMarcadas: 0,
    perguntasCorretas: 0,
    data: {}
}
function reiniciarQuizz(){
    quizzGame.qtdePerguntas = 0;
    quizzGame.perguntasMarcadas = 0;
    quizzGame.perguntasCorretas = 0;
    
    openQuizz("", quizzGame.data.id)
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
}
function getResultQuizz(){
    let listQuizz = document.querySelector(".listQuizz");
    let currentLevel = Math.round((quizzGame.perguntasCorretas*100)/quizzGame.qtdePerguntas);
    let getLevel = function(info){
        let best = "";
        quizzGame.data.levels.forEach(levels=>{
            if(currentLevel >= Number(levels.minValue)){
                if(info === "title"){
                    best = levels.title;
                }else if(info === "text"){
                    best = levels.text;
                }else if(info === "image"){
                    best = levels.image;
                }
            }
        })
        return best;
    }
    listQuizz.innerHTML += `<li>
            <div style="background-color: #ec362d" class="QuizzTitle"><p>${currentLevel} de acerto: ${ getLevel("title") }</p></div>
            <div class="QuizzResults">
                <img src="${ getLevel("image") }" />
                <p>${ getLevel("text") }</p>
            </div>
        </li>
        
        <div class="menu">
            <button class="buzzQuizz" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
            <button class="Retorno" onclick="alternarTelas(1)">Voltar pra home</button>
        <div>
        `;
}
function selectAnswer(e){
    if(e.classList.contains("isCorrectAnswer") || e.classList.contains("isWrongAnswer")){
        return false;
    }else{
        quizzGame.perguntasMarcadas++;
        e.parentNode.querySelectorAll("div").forEach( every =>{ 
            every.classList.add("noSelected");
            if(eval(every.dataset.is)){
                every.classList.add("isCorrectAnswer");
            }else{
                every.classList.add("isWrongAnswer");
            }
        })
        e.classList.remove("noSelected");
        
        if(e.classList.contains("isCorrectAnswer")){ quizzGame.perguntasCorretas++ }
    }

    if(quizzGame.qtdePerguntas === quizzGame.perguntasMarcadas){
        getResultQuizz();
    }
}
function openQuizz(e, directID=undefined){
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
    let promise;
    if(directID){
        promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${directID}`);
    }else{
        let id = e.dataset.id;
        promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    }

    promise.then(
        (quizz)=>{
            alternarTelas(3);
            quizzGame.data = quizz.data;
            document.querySelector(".textoDoQuizz").innerHTML = quizz.data.title;
            document.querySelector(".headerDoQuizz").innerHTML = `<img class=imgHeader src="${quizz.data.image}"/>`;

            let listQuizz = document.querySelector(".listQuizz")
            listQuizz.innerHTML = "";

            quizz.data.questions.forEach(answer => {
                let perguntasHTML = "";
                quizzGame.qtdePerguntas++;
                const arrtoshf = answer.answers;
               const arrshuffled = shuffleArray(arrtoshf);
                    arrshuffled.forEach(every =>{
                        perguntasHTML += `<div onclick="selectAnswer(this)" class="ButtonAnswer" data-is="${every.isCorrectAnswer}"><img src="${every.image}" /><p>${every.text}</p></div>`
                    })
                listQuizz.innerHTML += `
                    <li>
                        <div style="background-color: ${answer.color}" class="QuizzTitle"><p>${answer.title}</p></div>
                        <div class="QuizzAnswers">
                            ${ perguntasHTML }
                        </div>
                    </li>
                `;
            });
            //
        }
    );
}