
let ulListaQuizzes = document.querySelector('.listaDeQuizz');

const API = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";


function getQuizzDataStorage(){
	if(localStorage.getItem('quizz') === ''){
		localStorage.setItem('quizz', JSON.stringify([]));
	}
	let dataStg = JSON.parse(localStorage.getItem("quizz"));
	return dataStg;
}

function addQuizzDataStorage(quizzID, key) {
	let data = getQuizzDataStorage();
	data.push( [quizzID, key] );
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
	let quizzMemoryDataStorage = getQuizzDataStorage(); 
	if(quizzMemoryDataStorage.length !== 0){
		document.querySelector(".baseCriarQuizz").classList.add("have");
		quizzMemoryDataStorage.forEach(a=>{

			let requisicao = axios.get(`${API}/${a[0]}`);
			requisicao.then((quizzes) => {
				console.log(quizzes)
					ulListaQuizzes.innerHTML += `
					<li>
						<div class="quizzThumbnail" data-id="${a[0]}" data-key="${a[1]}">
							<div class="edicoesQuizz">
								<ion-icon name="create-outline" onclick="iniciarCriarQuizz({mode: 'edition', id:'${a[0]}', key:'${a[1]}'})"></ion-icon>
								<ion-icon name="trash-outline" onclick="deletarQuizz(${a[0]}, '${a[1]}')"></ion-icon>
							</div>
							<p class="quizzTitulo">${quizzes.data.title}</p>
							<img src="${quizzes.data.image}" alt="quizz">
						</div>
					</li>
				  `
				  ulListaQuizzes.querySelectorAll('.quizzThumbnail').forEach(thumbnail =>{
						thumbnail.addEventListener('click', function(e){
							e.stopPropagation();
							openQuizz(e.target);
						});
				  })
			});

		})

	}
}