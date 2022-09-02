function openQuizz(e){
    let id = e.dataset.id;
    let promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);

    promise.then(
        (quizz)=>{
            alternarTelas(3);
            console.log(quizz)
            document.querySelector(".headerDoQuizz").innerHTML = quizz.data.title;

            let listQuizz = document.querySelector(".listQuizz")
            listQuizz.innerHTML = "";

            quizz.data.questions.forEach(answer => {
                let perguntasHTML = "";

                    answer.answers.forEach(every =>{
                        perguntasHTML += `<div class="ButtonAnswer" data-is="${every.isCorrectAnswer}"><img src="${every.image}" /><p>${every.text}</p></div>`
                    })
                listQuizz.innerHTML += `
                    <li>
                        <div style="background-color: ${answer.color}" class="QuizzTitle">${answer.title}</div>
                        <div class="QuizzAnswers">
                            ${ perguntasHTML }
                        </div>
                    </li>
                `;
            });
            
        }
    );
}