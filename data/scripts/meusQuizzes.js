
let ulListaQuizzes = document.querySelector('.listaDeQuizz');

// const requisicao = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
// let allQuizzes = '';

// requisicao.then((quizzes) => {
//   allQuizzes = quizzes.data
//   let itensLS = localStorage.getItem('quizz')
//   let valoresLS = Object.values(JSON.parse(itensLS))

// let ulListaQuizzes = document.querySelector('.listaDeQuizz');

const API = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";


function getQuizzDataStorage(){
	let dataStg = JSON.parse( localStorage.getItem("quizz"));

	let corrector = (typeof dataStg[0] === 'number') ? dataStg: JSON.stringify( new Array() );
	return corrector;
}

function addQuizzDataStorage(quizzID) {
	let data = getQuizzDataStorage();
	data.push( quizzID );
	localStorage.setItem('quizz', JSON.stringify( data ));

	return data;
}
function updateQuizzList() {
	let promise = axios.get(API);
	promise.then(
		function(res){
			quizzes = res;
			res.data.forEach( (quizz) =>{
				document.querySelector(".baseListaQuizz").innerHTML += `
					<div class="quizzThumbnail" data-id="${quizz.id}" onclick="openQuizz(this)">
						<p class="quizzTitulo">${quizz.title}</p>
						<img src="${quizz.image}" alt="quizz">
					</div>`
			})
		}
	)
}
function updateMyQuizzList(){
	let quizzMemoryDataStorage = getQuizzDataStorage()
	if(quizzMemoryDataStorage.length !== 0){
		document.querySelector(".baseCriarQuizz").classList.add("have");
		quizzMemoryDataStorage.forEach(a=>{

			let requisicao = axios.get(`${API}/${a}`);
			requisicao.then((quizzes) => {
				console.log(quizzes)
					ulListaQuizzes.innerHTML += `
					<li>
						<div class="quizzThumbnail" data-id="${quizzes.data.id}"  onclick="openQuizz(this)">
							<div class="edicoesQuizz">
								<ion-icon name="create-outline"></ion-icon>
								<ion-icon name="trash-outline"></ion-icon>
							</div>
							<p class="quizzTitulo">${quizzes.data.title}</p>
							<img src="${quizzes.data.image}" alt="quizz">
						</div>
					</li>
				  `
			});

		})

	}
}
// myQuizzes.forEach((item) => {
//     ulListaQuizzes.innerHTML += `
//     <ul>
//         <li>
//           <div class="quizzThumbnail" data-id="${item.id}">
//               <p class="quizzTitulo">${item.title}</p>
//               <img src="${item.image}" alt="quizz">
//           </div>
//         </li>
//     </ul>
//   `
//   })
// })