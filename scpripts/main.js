const mesBr = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const cores = document.querySelectorAll('.checkmark')

let display = {}
var primeiroDia
var agora = new Date()


var globais = {
  mes : agora.getMonth(),
  ano : agora.getFullYear(),
  hoje : agora.getDate(),
  dias : document.querySelector('#dias'),
  contDias : document.querySelector('div#calendario'),
  contano : document.querySelector('div#displayAno'),
  contmes : document.querySelector('div#displayMes'),
  divsDia : dias.getElementsByTagName('div'),
  botao_ante : document.querySelector('#btn_prev'),
  botao_prox : document.querySelector('#btn_prox'),
  btn_mes : document.querySelector('span#mes'),
  btn_ano : document.querySelector('span#ano')
}

const disCalendario = {
  colocar(mes, ano) {
    document.querySelector('span#mes').innerHTML = mesBr[mes]
    document.querySelector('span#ano').innerHTML = ano

    let ultimoDia = new Date(ano, mes + 1, 0).getDate()
    primeiroDia = new Date(ano, mes, 1).getDay() -1

    for(i = -primeiroDia, index = 0; i < (42-primeiroDia); i++, index++){
      let dt = new Date(ano, mes, i)
      var diaCalendario = globais.divsDia[index]
      diaCalendario.classList.remove('outroMes')
      diaCalendario.innerHTML = dt.getDate()

      if(i < 1){
        diaCalendario.classList.add('outroMes')
      }
      if(i > ultimoDia){
        diaCalendario.classList.add('outroMes')
      }
    }
  },
  clickProx(){
    globais.mes++
    if(globais.mes > 11){
      globais.mes = 0
      globais.ano++
    }
    display.colocar(globais.mes, globais.ano)
  },
  clickAnte(){
    globais.mes--
    if(globais.mes < 0){
      globais.mes = 11
      globais.ano--
    }
    display.colocar(globais.mes, globais.ano)
  },
  clickMes() {
    globais.contDias.style.display = 'none'
    globais.contmes.style.display = 'grid'
    globais.btn_mes.innerHTML = 'Meses'
    mudarTela(disMes)
    display.colocar()
  },
  clickAno() {
    globais.contDias.style.display = 'none'
    globais.contano.style.display = 'grid'
    globais.btn_ano.innerHTML = 'Anos'
    globais.btn_mes.innerHTML = ''
    mudarTela(disAno)
    display.colocar()
  }
}

const disMes = {
  colocar() {
    var divsMes = globais.contmes.getElementsByTagName('div')
    for(i = 0; i < 12; i++){
      divsMes[i].innerHTML = mesBr[i]
    }
  },
  clickProx(){
    globais.ano++
    globais.btn_ano.innerHTML = globais.ano
  },
  clickAnte(){
    globais.ano--
    globais.btn_ano.innerHTML = globais.ano
  },
  clickMes(){
    globais.contDias.style.display = 'block'
    globais.contmes.style.display = 'none'
    globais.btn_ano.innerHTML = globais.ano
    globais.btn_mes.innerHTML = mesBr[globais.mes]
    mudarTela(disCalendario)
    display.colocar(globais.mes, globais.ano) 
  }
}

const disAno = {
  colocar() {
    var divsAno = globais.contano.getElementsByTagName('div')
    for(i = 0; i < 12; i++){
      divsAno[i].innerHTML = anoD
      anoD++
    }
  },
  clickProx(){
    var divsAno = contano.getElementsByTagName('div')
    for(i = 0; i < 12; i++){
      divsAno[i].innerHTML = anoD
      anoD++
    }
  },
  clickAnte(){
    anoD -= 24
    var divsAno = contano.getElementsByTagName('div')
    for(i = 0; i < 12; i++){
      divsAno[i].innerHTML = anoD
      anoD++
    }
  },
  clickAno(){
    globais.contDias.style.display = 'block'
    globais.contano.style.display = 'none'
    globais.btn_ano.innerHTML = globais.ano
    globais.btn_mes.innerHTML = mesBr[globais.mes]
    mudarTela(disCalendario)
    display.colocar(globais.mes, globais.ano)
  }
}

mudarTela(disCalendario)

display.colocar(globais.mes, globais.ano)
let anoD = globais.ano


function mudarTela(novaTela){
  display = novaTela
}

const funCor = {
  mudarCorHoje(cor){
    var color = window.getComputedStyle(cor)
    var mesA = agora.getMonth() 
    var divHoje = globais.divsDia[globais.hoje + primeiroDia]
    
  
    if(globais.mes != mesA){
      divHoje.style.backgroundColor = 'white'
      divHoje.style.color = 'black'
      divHoje.style.opacity = '1'
    }else{
      if(cor.style.opacity == '0.5') {
      divHoje.style.backgroundColor = 'white'
      divHoje.style.color = 'black'
      } else {
        divHoje.style.backgroundColor = color.backgroundColor
        divHoje.style.opacity = '0.7'
          if (
            divHoje.style.backgroundColor == 'rgb(85, 255, 0)' ||
            divHoje.style.backgroundColor == 'rgb(225, 255, 0)' ||
            divHoje.style.backgroundColor == 'rgb(255, 136, 0)'
            ) {
            divHoje.style.color = 'black'
          }else {
            divHoje.style.color = 'white'
          }
      }
    }
  },
  spanClick(cor) {
    if(cor.style.opacity == '1'){
      cor.style.opacity = '0.5'
    } else{
      cores.forEach(cor => cor.style.opacity = '0.5')
      cor.style.opacity = '1'
    }
  },
  spanEnter(cor) {

    if(cor.style.opacity == '0.5'){
      cor.style.opacity = '0.7'
    }
  },
  spanOut(cor) {
    if(cor.style.opacity === '0.7'){
      cor.style.opacity = '0.5'
    }
  }
}

cores.forEach(cor => cor.style.opacity = '0.5')

cores.forEach(cor => cor.addEventListener ('click', () => { 

  funCor.spanClick(cor)
  funCor.mudarCorHoje(cor)
}))

cores.forEach(cor => cor.addEventListener('mouseenter', () => {

  funCor.spanEnter(cor)
}))

cores.forEach(cor => cor.addEventListener('mouseout', () => {

  funCor.spanOut(cor)
}))

globais.botao_prox.addEventListener('click', () => {
  display.clickProx()
})

globais.botao_ante.addEventListener('click', () => {
  display.clickAnte()
})

globais.btn_mes.addEventListener('click', () => {
  display.clickMes()
}) 

globais.btn_ano.addEventListener('click', () => {
  display.clickAno()
}) 
