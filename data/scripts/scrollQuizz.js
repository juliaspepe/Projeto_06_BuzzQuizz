function scrollarProxima(li) {
    const proximoElemento = Number(li.className.replace('respostaScroll','')) + 1;
    console.log(proximoElemento)
    const elementoScroll = document.querySelector(`.respostaScroll${proximoElemento}`)
    if(elementoScroll){
      setTimeout(() => {
        elementoScroll.scrollIntoView({behavior: 'smooth'})
      }, 2000)
    }
}