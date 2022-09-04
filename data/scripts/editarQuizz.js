function importarQuizzEditor(id){
    let promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);

    promise.then(
        (quizz)=>{
            criacaoPerguntasDoQuizz(quizz.data.questions.length)
            criarNiveis(quizz.data.levels.length)
        }
    );
}