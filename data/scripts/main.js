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
}
