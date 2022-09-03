localStorage.setItem('quizz', JSON.stringify({
  quizz1:11719,
  quizz2:11718,
  quizz3:11717,
  quizz4:11716
}))
let ulListaQuizzes = document.querySelector('.baseCriarQuizz');

const requisicao = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
let allQuizzes = '';

requisicao.then((quizzes) => {
  allQuizzes = quizzes.data
  let itensLS = localStorage.getItem('quizz')
  let valoresLS = Object.values(JSON.parse(itensLS))

  let myQuizzes = allQuizzes.filter((quizz) => {
    if(valoresLS.includes(quizz.id)){
      return true;
    }
  })

  myQuizzes.forEach((item) => {
    ulListaQuizzes.innerHTML += `
    <ul>
        <li>
          <div class="quizzThumbnail" data-id="${item.id}">
              <p class="quizzTitulo">${item.title}</p>
              <img src="${item.image}" alt="quizz">
          </div>
        </li>
    </ul>
  `
  })
})
