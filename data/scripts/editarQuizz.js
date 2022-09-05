function importarQuizzEditor(id){
    let promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);

    promise.then(
        (response)=>{
            let quizz = response.data;
            criacaoPerguntasDoQuizz(quizz.questions.length);
            criarNiveis(quizz.levels.length);

        bonusStatus['title'] = quizz.title;
        bonusStatus['image'] = quizz.image;

            document.querySelectorAll('.perguntasManager li').forEach((list, listID)=>{
                list.querySelectorAll('input').forEach((input, inputID) =>{
                    if(input.name == "texto-pergunta"){
                       input.value = quizz.questions[listID].title
                    } else if (input.name == "cor-pergunta"){
                        input.value = quizz.questions[listID].color  
                    } else if (input.name == "respostaCorreta-pergunta" && quizz.questions[listID].answers[0]){
                        input.value = quizz.questions[listID].answers[0].text
                    } else if (input.name == "respostaIncorreta1-pergunta" && quizz.questions[listID].answers[1]){
                        input.value = quizz.questions[listID].answers[1].text  
                    } else if (input.name == "respostaIncorreta2-pergunta" && quizz.questions[listID].answers[2]){
                        input.value = quizz.questions[listID].answers[2].text  
                    } else if (input.name == "respostaIncorreta3-pergunta" && quizz.questions[listID].answers[3]){
                        input.value = quizz.questions[listID].answers[3].text 
                    } else if (input.name == "url1-pergunta" && quizz.questions[listID].answers[0]){ 
                        input.value = quizz.questions[listID].answers[0].image
                    } else if (input.name == "url2-pergunta" && quizz.questions[listID].answers[1]){
                        input.value = quizz.questions[listID].answers[1].image 
                    } else if (input.name == "url3-pergunta" && quizz.questions[listID].answers[2]){
                        input.value = quizz.questions[listID].answers[2].image 
                    } else if (input.name == "url4-pergunta" && quizz.questions[listID].answers[3]){
                        input.value = quizz.questions[listID].answers[3].image 
                    }
                })
            })
            document.querySelectorAll('.ul-niveis li').forEach((list, listID)=>{
                list.querySelectorAll('input').forEach((input, inputID) =>{
                    if(input.name == "titulo-nivel"){
                        input.value = quizz.levels[listID].title
                    } else if (input.name == "porcentagem-nivel"){
                        input.value = quizz.levels[listID].minValue
                    } else if (input.name == "url-nivel"){
                        input.value = quizz.levels[listID].image
                    } else if (input.name == "descricao-nivel"){
                        input.value = quizz.levels[listID].text
                    }
                })
            })
        }
    );
}
function editarQuizz(id, key) {
    let quizzPronto = {
        title: bonusStatus.title,
        image: bonusStatus.image,
        questions: perguntas,
        levels: niveis
    }

    console.log(quizzPronto);
    
    let enviarQuizz = axios.put(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`, quizzPronto, {'headers': {"Secret-Key": key}});
    enviarQuizz.then( retorno =>{
        console.log(retorno)
    })
    .catch( erro =>{
        console.error(erro);
    })
}
function deletarQuizz(id, key) {
    let enviarQuizz = axios.delete(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`, {'headers': {"Secret-Key": key}});
    enviarQuizz.then( retorno =>{
        console.log(retorno)
        localStorage.setItem('quizz', JSON.stringify( getQuizzDataStorage().filter( a => a[0] != id) ));
        window.reload();
    })
    .catch( erro =>{
        console.error(erro);
    })
}
