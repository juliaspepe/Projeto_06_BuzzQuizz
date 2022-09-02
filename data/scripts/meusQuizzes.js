localStorage.setItem('quizz', JSON.stringify({
  quizz1:11159,
  quizz2:11158,
  quizz3:11157,
  quizz4:11156
}))
let ulListaQuizzes = document.querySelector('.listaDeQuizz');

const requisicao = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

let allQuizzes = '';

requisicao.then((quizzes) => {
  allQuizzes = quizzes.data
  console.log(allQuizzes)

  let itensLS = localStorage.getItem('quizz')
  let valoresLS = Object.values(JSON.parse(itensLS))

  let myQuizzes = allQuizzes.filter((quizz) => {
    if(valoresLS.includes(quizz.id)){
      return true;
    }
  })

  myQuizzes.forEach((item) => {
    ulListaQuizzes.innerHTML += `
        <li>
          <div class="quizzThumbnail" data-id="${item.id}">
              <p class="quizzTitulo">${item.title}</p>
              <img src="${item.image}" alt="quizz">
          </div>
        </li>
  `
  })

  


  console.log(myQuizzes)
})
